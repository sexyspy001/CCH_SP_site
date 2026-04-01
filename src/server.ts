import 'dotenv/config';
import express from 'express';
import Database from 'better-sqlite3';
import { randomBytes } from 'node:crypto';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = dirname(__dirname);
const dataDir = join(rootDir, '.data');

if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

const db = new Database(join(dataDir, 'click-commerce-hub.db'));
const app = express();
const port = Number(process.env.API_PORT || 3011);
const otpTtlMinutes = Number(process.env.OTP_TTL_MINUTES || 10);
const sessionTtlDays = Number(process.env.SESSION_TTL_DAYS || 30);

app.use(express.json({ limit: '2mb' }));

app.use((_, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL,
    business_type TEXT NOT NULL,
    verified_at TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS otp_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    code TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    verified_at TEXT,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS access_sessions (
    token TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    created_at TEXT NOT NULL,
    expires_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS usage_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    tool TEXT NOT NULL,
    mode TEXT,
    meta_json TEXT,
    created_at TEXT NOT NULL
  );
`);

const upsertLead = db.prepare(`
  INSERT INTO leads (name, email, phone, business_type, created_at, updated_at)
  VALUES (@name, @email, @phone, @business_type, @created_at, @updated_at)
  ON CONFLICT(email) DO UPDATE SET
    name = excluded.name,
    phone = excluded.phone,
    business_type = excluded.business_type,
    updated_at = excluded.updated_at
`);

const insertOtp = db.prepare(`
  INSERT INTO otp_requests (email, code, expires_at, created_at)
  VALUES (@email, @code, @expires_at, @created_at)
`);

const findValidOtp = db.prepare(`
  SELECT id, email, code, expires_at
  FROM otp_requests
  WHERE email = ? AND verified_at IS NULL
  ORDER BY created_at DESC
  LIMIT 1
`);

const markOtpVerified = db.prepare(`
  UPDATE otp_requests SET verified_at = ? WHERE id = ?
`);

const markLeadVerified = db.prepare(`
  UPDATE leads SET verified_at = ?, updated_at = ? WHERE email = ?
`);

const insertSession = db.prepare(`
  INSERT INTO access_sessions (token, email, created_at, expires_at)
  VALUES (@token, @email, @created_at, @expires_at)
`);

const findSession = db.prepare(`
  SELECT s.token, s.email, s.expires_at, l.name, l.phone, l.business_type
  FROM access_sessions s
  JOIN leads l ON l.email = s.email
  WHERE s.token = ?
  LIMIT 1
`);

const logUsage = db.prepare(`
  INSERT INTO usage_events (email, tool, mode, meta_json, created_at)
  VALUES (@email, @tool, @mode, @meta_json, @created_at)
`);

const findLeadByEmail = db.prepare(`
  SELECT email, name, phone, business_type, verified_at
  FROM leads
  WHERE email = ?
  LIMIT 1
`);

function nowIso() {
  return new Date().toISOString();
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60_000);
}

function addDays(date: Date, days: number) {
  return new Date(date.getTime() + days * 86_400_000);
}

function generateOtp() {
  return `${Math.floor(100000 + Math.random() * 900000)}`;
}

function generateToken() {
  return randomBytes(24).toString('hex');
}

function getTokenFromRequest(req: express.Request) {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  if (typeof req.query.token === 'string') {
    return req.query.token;
  }
  return null;
}

app.get('/api/health', (_, res) => {
  res.json({ ok: true });
});

app.post('/api/auth/request-otp', (req, res) => {
  const { name, email, phone, businessType } = req.body ?? {};

  if (!name || !email || !phone || !businessType) {
    return res.status(400).json({ ok: false, message: 'Missing required fields.' });
  }

  const createdAt = nowIso();
  upsertLead.run({
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    phone: String(phone).trim(),
    business_type: String(businessType).trim(),
    created_at: createdAt,
    updated_at: createdAt,
  });

  const code = generateOtp();
  const expiresAt = addMinutes(new Date(), otpTtlMinutes).toISOString();
  insertOtp.run({ email: String(email).trim().toLowerCase(), code, expires_at: expiresAt, created_at: createdAt });

  console.log(`[Click Commerce Hub OTP] ${String(email).trim().toLowerCase()} -> ${code}`);

  return res.json({
    ok: true,
    message: 'Verification code generated.',
    expiresAt,
    devOtp: process.env.NODE_ENV === 'production' ? undefined : code,
  });
});

app.post('/api/auth/verify-otp', (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase();
  const code = String(req.body?.otp || '').trim();

  if (!email || !code) {
    return res.status(400).json({ ok: false, message: 'Email and OTP are required.' });
  }

  const otpRow = findValidOtp.get(email) as { id: number; email: string; code: string; expires_at: string } | undefined;
  if (!otpRow) {
    return res.status(404).json({ ok: false, message: 'No active verification request found.' });
  }

  if (new Date(otpRow.expires_at).getTime() < Date.now()) {
    return res.status(410).json({ ok: false, message: 'Verification code expired.' });
  }

  if (otpRow.code !== code) {
    return res.status(401).json({ ok: false, message: 'Invalid verification code.' });
  }

  const verifiedAt = nowIso();
  markOtpVerified.run(verifiedAt, otpRow.id);
  markLeadVerified.run(verifiedAt, verifiedAt, email);

  const token = generateToken();
  insertSession.run({
    token,
    email,
    created_at: verifiedAt,
    expires_at: addDays(new Date(), sessionTtlDays).toISOString(),
  });

  const lead = findLeadByEmail.get(email);
  return res.json({ ok: true, token, lead });
});

app.get('/api/auth/session', (req, res) => {
  const token = getTokenFromRequest(req);
  if (!token) {
    return res.status(401).json({ ok: false, message: 'Missing session token.' });
  }

  const session = findSession.get(token) as { token: string; email: string; expires_at: string; name: string; phone: string; business_type: string } | undefined;
  if (!session) {
    return res.status(404).json({ ok: false, message: 'Session not found.' });
  }

  if (new Date(session.expires_at).getTime() < Date.now()) {
    return res.status(401).json({ ok: false, message: 'Session expired.' });
  }

  return res.json({
    ok: true,
    lead: {
      email: session.email,
      name: session.name,
      phone: session.phone,
      businessType: session.business_type,
    },
  });
});

app.post('/api/leads/utility-usage', (req, res) => {
  const token = getTokenFromRequest(req);
  let email: string | null = null;

  if (token) {
    const session = findSession.get(token) as { email: string; expires_at: string } | undefined;
    if (session && new Date(session.expires_at).getTime() > Date.now()) {
      email = session.email;
    }
  }

  logUsage.run({
    email,
    tool: String(req.body?.tool || 'utility-studio'),
    mode: req.body?.mode ? String(req.body.mode) : null,
    meta_json: JSON.stringify(req.body?.meta || {}),
    created_at: nowIso(),
  });

  return res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`Click Commerce Hub API running on http://127.0.0.1:${port}`);
});


