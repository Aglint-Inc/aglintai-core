import { createClient } from '@vercel/kv';

export const getSlotsCache = () => {
  const cache = createClient({
    url: process.env.SLOTS_CACHE_REST_API_URL,
    token: process.env.SLOTS_CACHE_REST_API_TOKEN,
  });
  return cache;
};
