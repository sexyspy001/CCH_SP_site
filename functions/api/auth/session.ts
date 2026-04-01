import { findSession, getBearerToken, handleOptions, json } from '../../_lib/api';

type PagesEnv = {
  DB: {
    prepare: (query: string) => {
      bind: (...values: unknown[]) => {
        first: <T = Record<string, unknown>>() => Promise<T | null>;
      };
    };
  };
};

type RequestContext = { request: Request; env: PagesEnv };

export const onRequestOptions = async () => handleOptions();

export const onRequestGet = async ({ request, env }: RequestContext) => {
  const token = getBearerToken(request);
  if (!token) {
    return json({ ok: false, message: 'Missing session token.' }, { status: 401 });
  }

  const session = await findSession(env, token);
  if (!session) {
    return json({ ok: false, message: 'Session not found.' }, { status: 404 });
  }

  if (new Date(session.expires_at).getTime() < Date.now()) {
    return json({ ok: false, message: 'Session expired.' }, { status: 401 });
  }

  return json({
    ok: true,
    lead: {
      email: session.email,
      name: session.name,
      phone: session.phone,
      businessType: session.business_type,
    },
  });
};
