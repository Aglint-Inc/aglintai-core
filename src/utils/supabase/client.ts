'use client';

import { createBrowserClient } from '@supabase/ssr';

import { CustomDatabase } from '@/src/types/customSchema';
export const supabase = createBrowserClient<CustomDatabase>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);
