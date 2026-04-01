import { addMinutes, createOtp, generateOtp, handleOptions, isLocalRequest, json, nowIso, otpTtlMinutes, upsertLead } from '../../_lib/api';

type PagesEnv = {
  DB: {
    prepare: (query: string) => {
      bind: (...values: unknown[]) => {
        run: () => Promise<unknown>;
      };
    };
  };
  OTP_TTL_MINUTES?: string;
};

type RequestContext = { request: Request; env: PagesEnv };

export const onRequestOptions = async () => handleOptions();

export const onRequestPost = async ({ request, env }: RequestContext) => {
  const body = (await request.json().catch(() => null)) as
    | { name?: string; email?: string; phone?: string; businessType?: string }
    | null;

  const name = String(body?.name || '').trim();
  const email = String(body?.email || '').trim().toLowerCase();
  const phone = String(body?.phone || '').trim();
  const businessType = String(body?.businessType || '').trim();

  if (!name || !email || !phone || !businessType) {
    return json({ ok: false, message: 'Missing required fields.' }, { status: 400 });
  }

  const createdAt = nowIso();
  await upsertLead(env, { name, email, phone, businessType }, createdAt);

  const code = generateOtp();
  const expiresAt = addMinutes(new Date(), otpTtlMinutes(env));
  await createOtp(env, email, code, expiresAt, createdAt);

  const payload: Record<string, unknown> = {
    ok: true,
    message: 'Verification code generated.',
    expiresAt,
  };

  if (isLocalRequest(request)) {
    payload.devOtp = code;
  }

  return json(payload);
};
