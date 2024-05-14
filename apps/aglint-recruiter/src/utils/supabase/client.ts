'use client';

import { CustomDatabase } from '@aglint/shared-types';
import { createBrowserClient } from '@supabase/ssr';
export const supabase = createBrowserClient<CustomDatabase>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);
