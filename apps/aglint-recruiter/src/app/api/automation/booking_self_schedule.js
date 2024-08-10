import { NextResponse } from 'next/server';

export async function GET() {
  console.log('hello');
  //   const request_id = await req.json();

  //   console.log(request_id);
  try {
    return NextResponse.json(
      { message: 'availability updated' },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      { message: 'error ' + e.message },
      { status: 400 },
    );
  }
}
