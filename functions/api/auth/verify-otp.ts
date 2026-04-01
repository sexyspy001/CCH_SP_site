import {
  addDays,
  findLeadByEmail,
  findValidOtp,
  generateToken,
  handleOptions,
  insertSession,
  json,
  markLeadVerified,
  markOtpVerified,
  nowIso,
  sessionTtlDays,
} from '../../_lib/api';

type PagesEnv = {
  DB: {
    prepare: (query: string) => {
      bind: (...values: unknown[]) => {
        first: <T = Record<string, unknown>>() => Promise<T | null>;
        run: () => Promise<unknown>;
      };
    };
  };
  SESSION_TTL_DAYS?: string;
};

type RequestContext = { request: Request; env: PagesEnv };

export const onRequestOptions = async () => handleOptions();

export const onRequestPost = async ({ request, env }: RequestContext) => {
  const body = (await request.json().catch(() => null)) as { email?: string; otp?: string } | null;
  const email = String(body?.email || '').trim().toLowerCase();
  const code = String(body?.otp || '').trim();

  if (!email || !code) {
    return json({ ok: false, message: 'Email and OTP are required.' }, { status: 400 });
  }

  const otpRow = await findValidOtp(env, email);
  if (!otpRow) {
    return json({ ok: false, message: 'No active verification request found.' }, { status: 404 });
  }

  if (new Date(otpRow.expires_at).getTime() < Date.now()) {
    return json({ ok: false, message: 'Verification code expired.' }, { status: 410 });
  }

  if (otpRow.code !== code) {
    return json({ ok: false, message: 'Invalid verification code.' }, { status: 401 });
  }

  const verifiedAt = nowIso();
  await markOtpVerified(env, otpRow.id, verifiedAt);
  await markLeadVerified(env, email, verifiedAt);

  const token = generateToken();
  await insertSession(env, token, email, verifiedAt, addDays(new Date(), sessionTtlDays(env)));

  const lead = await findLeadByEmail(env, email);
  return json({
    ok: true,
    token,
    lead: lead
      ? {
          email: lead.email,
          name: lead.name,
          phone: lead.phone,
          businessType: lead.business_type,
        }
      : null,
  });
};
