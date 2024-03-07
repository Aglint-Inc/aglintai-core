import React from 'react';

import Outlook from '@/src/components/Auth.tsx/Outlook';

const Page = () => {
  return (
    <>
      <Outlook />
    </>
  );
};

Page.getLayout = (page) => {
  return <>{page}</>;
};

export default Page;
