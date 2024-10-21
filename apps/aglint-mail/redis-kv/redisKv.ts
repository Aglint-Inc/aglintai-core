import { createClient } from '@vercel/kv';

export const getSlotsCache = () => {
  if (
    !process.env.SLOTS_CACHE_REST_API_URL ||
    !process.env.SLOTS_CACHE_REST_API_TOKEN
  ) {
    throw new Error(
      'SLOTS_CACHE_REST_API_URL or SLOTS_CACHE_REST_API_TOKEN is not defined',
    );
  }
  const cache = createClient({
    url: process.env.SLOTS_CACHE_REST_API_URL,
    token: process.env.SLOTS_CACHE_REST_API_TOKEN,
  });
  return cache;
};
