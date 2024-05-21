'use client';

import { DB } from '@aglint/shared-types';
import { createBrowserClient } from '@supabase/ssr';
export const supabase = createBrowserClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);
