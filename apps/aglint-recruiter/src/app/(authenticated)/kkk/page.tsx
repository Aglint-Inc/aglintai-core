'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ButtonSoft } from '@/devlink/ButtonSoft';

const KKK = () => {
  const { push } = useRouter();
  return (
    <>
      KKK page
      <Link href={'/profile-pro'}>Profile pro link</Link>
      <ButtonSoft
        onClickButton={{ onClick: () => push('/profile-pro') }}
        textButton={'Profile pro button'}
      />
    </>
  );
};

export default KKK;
