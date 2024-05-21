import React from 'react';

import Seo from '@/src/components/Common/Seo';
import Login from '@/src/components/Login';

function SignInPage() {
  return (
    <>
      <Seo title={`Login | Aglint AI`} description='AI for People Products' />
      <Login />
    </>
  );
}

export default SignInPage;

SignInPage.publicProvider = (page) => {
  return <>{page}</>;
};
