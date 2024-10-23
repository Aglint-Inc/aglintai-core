import 'server-only';

import { type Session } from '@supabase/supabase-js';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export async function verifyToken(db: any) {
  const base = db.storageKey;
  const cook = await cookies();
  const tryNext = true;
  let count = 0;
  let jsonData: {
    access_token: string;
    token_type: string;
    expires_in: number;
    expires_at: number;
    refresh_token: string;
    user: { id: string };
  } | null = null;

  let tempData: string[] = [];

  while (tryNext) {
    const temp = cook?.get(`${base}.${count}`)?.value;
    if (!temp) {
      break;
    }
    tempData.push(temp);
    count++;
  }
  tempData = tempData.filter((item) => Boolean(item));
  jsonData = JSON.parse(atob(tempData.join('').replace('base64-', ''))) as {
    access_token: string;
    token_type: string;
    expires_in: number;
    expires_at: number;
    refresh_token: string;
    user: { id: string };
  };

  const json = jsonData as unknown as Session;
  const token = json.access_token;
  await jwtVerify(
    token,
    new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET),
  );

  return json;
}
