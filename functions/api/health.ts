import { handleOptions, json } from '../_lib/api';

export const onRequestOptions = async () => handleOptions();

export const onRequestGet = async () => json({ ok: true });
