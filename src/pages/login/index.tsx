import React from 'react';

import Login from '@/src/components/Login';
import { SignupProvider } from '@/src/context/SingupContext/SignupContext';

function SignInPage() {
  return (
    <>
      <SignupProvider>
        <Login />
      </SignupProvider>
    </>
  );
}

export default SignInPage;

SignInPage.getLayout = (page) => {
  return <>{page}</>;
};
