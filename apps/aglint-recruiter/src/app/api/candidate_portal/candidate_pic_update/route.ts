import { NextResponse } from 'next/server';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const db = getSupabaseServer();

  const formData = await req.formData();

  const old_pic_url = formData.get('oldimage') as string;

  // delete cover image if old present -------------------
  if (old_pic_url) {
    const path = 'profile/' + extractPath(old_pic_url);
    if (path.length === 0) throw new Error('wrong image');
    await db.storage.from('candidate-files').remove([path]);
  }

  // upload new image ----------------
  const profilePic = formData?.get('profilePic');
  const candidate_id = formData.get('candidate_id') as string;

  let avatar: string | null = null;

  if (profilePic) {
    const { data } = await db.storage
      .from('candidate-files')
      .upload(`profile/${candidate_id + '-' + Date.now()}`, profilePic, {
        cacheControl: '3600',
        upsert: true,
      });

    avatar = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/candidate-files/${data?.path}?t=${new Date().toISOString()}`;
  }

  // update db ---------------

  await db
    .from('candidates')
    .update({ avatar })
    .eq('id', 'af308b18-b730-4532-a7c5-9263a2f665a7');

  try {
    return NextResponse.json(
      {
        message: 'success',
      },
      { status: 200 },
    );
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
function extractPath(url: string) {
  const parts = url.split('candidate-files/profile/');
  if (parts.length > 1) {
    const uuid = parts[1].split('/')[0].split('?')[0];
    return uuid;
  }
  return '';
}
