import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { createPrivateClient } from '@/server/db';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { recruiter_id, permissions } = await authorize();

  if (!permissions.find((p) => p === 'company_settings_module'))
    throw new Error('Permission denied!');

  const cookieStore = await cookies();
  const db = await createPrivateClient(cookieStore);

  const formData = await req.formData();

  // upload new images ----------------
  const slideImages = formData.getAll('slideImages') as File[];
  const recruiterName = formData.get('recruiterName') as string;
  const newImages: string[] = [];
  for (const image of slideImages) {
    const fileName = `${recruiterName}-image-${Date.now()}`.replace(/\s+/g, '');

    const { data, error } = await db.storage
      .from('company-images')
      .upload(fileName, image);

    if (error) {
      throw new Error(error.message);
    }

    if (data?.path) {
      const img = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/company-images/${data?.path}?t=${new Date().toISOString()}`;
      newImages.push(img);
    }
  }

  // update db ---------------
  const { data } = await db
    .from('recruiter_preferences')
    .select('company_images')
    .eq('recruiter_id', recruiter_id)
    .single();

  const oldImages = data?.company_images || [];
  const newWithOldImages = [...oldImages, ...newImages];
  await db
    .from('recruiter_preferences')
    .update({ company_images: newWithOldImages })
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
