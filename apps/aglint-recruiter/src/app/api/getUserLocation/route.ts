import { geolocation } from '@vercel/edge';
import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
  const geo = geolocation(request);
  if (geo.country) return NextResponse.json(geo);
  else
    return NextResponse.json(
      { error: 'Failed to getting the user location' },
      { status: 500 },
    );
}
