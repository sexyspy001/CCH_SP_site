import { findSession, getBearerToken, handleOptions, json, logUsage, nowIso } from '../../_lib/api';

type PagesEnv = {
  DB: {
    prepare: (query: string) => {
      bind: (...values: unknown[]) => {
        first: <T = Record<string, unknown>>() => Promise<T | null>;
        run: () => Promise<unknown>;
      };
    };
  };
};

type RequestContext = { request: Request; env: PagesEnv };

export const onRequestOptions = async () => handleOptions();

export const onRequestPost = async ({ request, env }: RequestContext) => {
  const body = (await request.json().catch(() => null)) as
    | { tool?: string; mode?: string; meta?: Record<string, unknown> }
    | null;

  const token = getBearerToken(request);
  let email: string | null = null;

  if (token) {
    const session = await findSession(env, token);
    if (session && new Date(session.expires_at).getTime() > Date.now()) {
      email = session.email;
    }
  }

  await logUsage(env, {
    email,
    tool: String(body?.tool || 'utility-studio'),
    mode: body?.mode ? String(body.mode) : null,
    meta: body?.meta || {},
    createdAt: nowIso(),
  });

  return json({ ok: true });
};
