import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  if (req.method === 'POST') {
    return new NextResponse(
      JSON.stringify({
        data: 'success',
        error: null,
      }),
      { status: 200 },
    );
  } else {
    return new NextResponse(
      JSON.stringify({
        data: null,
        error: 'Invalid request method',
      }),
      { status: 400 },
    );
  }
}
