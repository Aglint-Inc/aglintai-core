import React from 'react';

import Outlook from '@/src/components/Auth.tsx/Outlook';

const Page = () => {
  return (
    <>
      <Outlook />
    </>
  );
};

Page.publicProvider = (page) => {
  return <>{page}</>;
};

export default Page;
