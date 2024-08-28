'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';

function ProfilePage() {
  const { push } = useRouter();
  return (
    <>
      Profile pro page
      <Link href={'/kkk'}>KKK link</Link>
      <ButtonSoft
        onClickButton={{ onClick: () => push('/kkk') }}
        textButton={'KKK button'}
      />
    </>
  );
}

export default ProfilePage;
