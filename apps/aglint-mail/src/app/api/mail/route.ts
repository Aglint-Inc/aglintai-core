import { NextResponse } from 'next/server';
export default async function POST(req: Request) {
  // const req_body = await req.json();

  // const supabaseAdmin = getSupabaseServer();

  try {
    //
    return NextResponse.json({});
  } catch (e: any) {
    console.error(e);

    return NextResponse.json(
      {
        error: `${e.name}:  ${e.message}`,
      },
      {
        status: 500,
      },
    );
  }
}
