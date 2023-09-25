import Seo from '@components/Common/Seo';
import ForgotPasswordComponent from '@components/ForgotPassword';
import React from 'react';

export default function ForgotPasswordPage() {
  return (
    <div>
      <Seo
        title='Aglint | Forgot Password'
        description='AI Powered Talent Development Platform.'
      />
      <ForgotPasswordComponent />
    </div>
  );
}

ForgotPasswordPage.getLayout = (page) => {
  return <>{page}</>;
};
