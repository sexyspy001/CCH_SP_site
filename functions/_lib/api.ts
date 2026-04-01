type EnvLike = {
  OTP_TTL_MINUTES?: string;
  SESSION_TTL_DAYS?: string;
  DB: {
    prepare: (query: string) => {
      bind: (...values: unknown[]) => {
        first?: <T = Record<string, unknown>>() => Promise<T | null>;
        run?: () => Promise<unknown>;
        all?: <T = Record<string, unknown>>() => Promise<{ results: T[] }>;
      };
    };
  };
};

type LeadRow = {
  email: string;
  name: string;
  phone: string;
  business_type: string;
  verified_at?: string | null;
};

type SessionRow = {
  token: string;
  email: string;
  expires_at: string;
  name?: string;
  phone?: string;
  business_type?: string;
};

type OtpRow = {
  id: number;
  email: string;
  code: string;
  expires_at: string;
};

export function json(data: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set('content-type', 'application/json; charset=utf-8');
  headers.set('cache-control', 'no-store');
  headers.set('access-control-allow-origin', '*');
  headers.set('access-control-allow-headers', 'Content-Type, Authorization');
  headers.set('access-control-allow-methods', 'GET, POST, OPTIONS');
  return new Response(JSON.stringify(data), { ...init, headers });
}

export function handleOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'cache-control': 'no-store',
      'access-control-allow-origin': '*',
      'access-control-allow-headers': 'Content-Type, Authorization',
      'access-control-allow-methods': 'GET, POST, OPTIONS',
    },
  });
}

export function nowIso() {
  return new Date().toISOString();
}

export function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60_000).toISOString();
}

export function addDays(date: Date, days: number) {
  return new Date(date.getTime() + days * 86_400_000).toISOString();
}

export function otpTtlMinutes(env: EnvLike) {
  return Number(env.OTP_TTL_MINUTES || 10);
}

export function sessionTtlDays(env: EnvLike) {
  return Number(env.SESSION_TTL_DAYS || 30);
}

export function generateOtp() {
  return `${Math.floor(100000 + Math.random() * 900000)}`;
}

export function generateToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(24));
  return Array.from(bytes, (value) => value.toString(16).padStart(2, '0')).join('');
}

export function isLocalRequest(request: Request) {
  const origin = request.headers.get('origin') || '';
  const host = new URL(request.url).hostname;
  return ['127.0.0.1', 'localhost'].includes(host) || origin.includes('127.0.0.1') || origin.includes('localhost');
}

export function getBearerToken(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }

  const url = new URL(request.url);
  return url.searchParams.get('token');
}

export async function upsertLead(env: EnvLike, lead: { name: string; email: string; phone: string; businessType: string }, timestamp: string) {
  await env.DB.prepare(
    `INSERT INTO leads (name, email, phone, business_type, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT(email) DO UPDATE SET
       name = excluded.name,
       phone = excluded.phone,
       business_type = excluded.business_type,
       updated_at = excluded.updated_at`,
  )
    .bind(lead.name, lead.email, lead.phone, lead.businessType, timestamp, timestamp)
    .run?.();
}

export async function createOtp(env: EnvLike, email: string, code: string, expiresAt: string, timestamp: string) {
  await env.DB.prepare(
    `INSERT INTO otp_requests (email, code, expires_at, created_at)
     VALUES (?, ?, ?, ?)`,
  )
    .bind(email, code, expiresAt, timestamp)
    .run?.();
}

export async function findValidOtp(env: EnvLike, email: string) {
  return env.DB.prepare(
    `SELECT id, email, code, expires_at
     FROM otp_requests
     WHERE email = ? AND verified_at IS NULL
     ORDER BY created_at DESC
     LIMIT 1`,
  )
    .bind(email)
    .first?.<OtpRow>() ?? null;
}

export async function markOtpVerified(env: EnvLike, id: number, verifiedAt: string) {
  await env.DB.prepare(`UPDATE otp_requests SET verified_at = ? WHERE id = ?`).bind(verifiedAt, id).run?.();
}

export async function markLeadVerified(env: EnvLike, email: string, verifiedAt: string) {
  await env.DB.prepare(`UPDATE leads SET verified_at = ?, updated_at = ? WHERE email = ?`).bind(verifiedAt, verifiedAt, email).run?.();
}

export async function insertSession(env: EnvLike, token: string, email: string, createdAt: string, expiresAt: string) {
  await env.DB.prepare(
    `INSERT INTO access_sessions (token, email, created_at, expires_at)
     VALUES (?, ?, ?, ?)`,
  )
    .bind(token, email, createdAt, expiresAt)
    .run?.();
}

export async function findLeadByEmail(env: EnvLike, email: string) {
  return env.DB.prepare(
    `SELECT email, name, phone, business_type, verified_at
     FROM leads
     WHERE email = ?
     LIMIT 1`,
  )
    .bind(email)
    .first?.<LeadRow>() ?? null;
}

export async function findSession(env: EnvLike, token: string) {
  return env.DB.prepare(
    `SELECT s.token, s.email, s.expires_at, l.name, l.phone, l.business_type
     FROM access_sessions s
     JOIN leads l ON l.email = s.email
     WHERE s.token = ?
     LIMIT 1`,
  )
    .bind(token)
    .first?.<SessionRow>() ?? null;
}

export async function logUsage(
  env: EnvLike,
  payload: {
    email: string | null;
    tool: string;
    mode: string | null;
    meta: Record<string, unknown>;
    createdAt: string;
  },
) {
  await env.DB.prepare(
    `INSERT INTO usage_events (email, tool, mode, meta_json, created_at)
     VALUES (?, ?, ?, ?, ?)`,
  )
    .bind(payload.email, payload.tool, payload.mode, JSON.stringify(payload.meta), payload.createdAt)
    .run?.();
}
