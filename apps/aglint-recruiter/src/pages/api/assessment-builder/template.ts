import { type NextRequest, NextResponse } from 'next/server';

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
