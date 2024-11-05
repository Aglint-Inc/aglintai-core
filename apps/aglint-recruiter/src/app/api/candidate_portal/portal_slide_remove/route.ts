import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { createPrivateClient } from '@/server/db';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { imageUrl }: { imageUrl: string } = await req.json();
  const { recruiter_id, permissions } = await authorize();

  if (!permissions.find((p) => p === 'company_settings_module'))
    throw new Error('Permission denied!');

  const cookieStore = await cookies();
  const db = await createPrivateClient(cookieStore);

  // delete cover image if old present -------------------
  const { data } = await db
    .from('recruiter_preferences')
    .select('company_images')
    .eq('recruiter_id', recruiter_id)
    .single();

  const oldImages = data?.company_images || [];

  if (imageUrl) {
    const path = extractPath(imageUrl);
    await db.storage.from('company-images').remove([path]);
  }
  const company_images = oldImages.filter((image) => imageUrl !== image);

  // update db ---------------
  await db
    .from('recruiter_preferences')
    .update({ company_images })
    .eq('recruiter_id', recruiter_id);

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
  const pathMatch = url.match(/\/company-images\/(.*?)(?:\?|$)/);
  if (pathMatch) {
    // Remove spaces from the extracted path
    return pathMatch[1].replace(/\s+/g, '');
  }
  return '';
}

const authorize = async () => {
  const cookieStore = await cookies();
  const db = await createPrivateClient(cookieStore);

  let user_id: string | null = null;

  if (process.env.NODE_ENV === 'development')
    user_id = (await db.auth.getSession())?.data?.session?.user?.id ?? null;
  else user_id = (await db.auth.getUser()).data.user?.id ?? null;

  if (!user_id) throw new Error('User unauthenticated');

  const { data } = await db
    .from('recruiter_relation')
    .select(
      'recruiter_id,recruiter(primary_admin), roles!inner(name, role_permissions!inner(permissions!inner(name, is_enable)))',
    )
    .eq('user_id', user_id)
    .single()
    .throwOnError();

  if (!data || !data?.roles?.role_permissions)
    throw new Error('User unauthenticated');

  const {
    recruiter_id,
    roles: { name: role, role_permissions },
  } = data;
  const permissions = role_permissions.reduce(
    (acc, { permissions: { is_enable, name } }) => {
      if (is_enable) acc.push(name);
      return acc;
    },
    [] as (typeof role_permissions)[number]['permissions']['name'][],
  );

  return {
    user_id,
    recruiter_id,
    permissions,
    role,
  };
};
