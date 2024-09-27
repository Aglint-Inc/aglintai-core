'use client';

import { type PropsWithChildren, Suspense, useState } from 'react';

import { PublicProviders } from '@/context/Providers';
import { api } from '@/trpc/client';

const Layout = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <PublicProviders>
      <Suspense fallback={<div>Loading...</div>}>
        <A />
        <B />
      </Suspense>
    </PublicProviders>
  );
};

export default Layout;

// const A = () => {
//   useTenant();
//   return <>AAA</>;
// };

// const B = () => {
//   useFlags();
//   return <>BBB</>;
// };

const A = () => {
  api.example.fooBar.foo.useSuspenseQuery({
    fooId: '321',
  });
  return <>AAA</>;
};

const B = () => {
  api.example.fooBar.bar.useSuspenseQuery({
    fooId: '123',
  });
  return <>BBB</>;
};
