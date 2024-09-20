import { geolocation } from '@vercel/edge';
import { type NextRequest, NextResponse } from 'next/server';

const headers = {
  'Access-Control-Allow-Origin': '*', // Allow requests from any origin
  'Access-Control-Allow-Methods': 'GET', // Allow only GET requests
  'Access-Control-Allow-Headers': 'Content-Type', // Allow only Content-Type header
};

export function GET(request: NextRequest) {
  const geo = geolocation(request);
  if (geo.country) return NextResponse.json(geo, { headers });
  else
    return NextResponse.json(
      { error: 'Failed to getting the user location' },
      { status: 500 },
    );
}
