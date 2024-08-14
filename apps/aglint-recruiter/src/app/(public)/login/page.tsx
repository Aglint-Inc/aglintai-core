'use client';
import React from 'react';

import { SeoPro } from '@/src/components/Common/SeoPro';
import Login from '@/src/components/Login';

// export const metadata = generateMetadata({
//   params: { title: 'Aglint|Login' },
// });

function SignInPage() {
  return (
    <>
      <SeoPro title='Login | Aglint AI' description='AI for People Products' />
      <Login />
    </>
  );
}

export default SignInPage;
