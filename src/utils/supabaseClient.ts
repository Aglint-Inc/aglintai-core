'use client';

import { createBrowserClient } from '@supabase/ssr';
// @ts-ignore
import { Database } from '@types/schema';
export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);
