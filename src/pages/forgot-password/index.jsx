import Seo from '@components/Common/Seo';
import ForgotPasswordComponent from '@components/ForgotPassword';
import React from 'react';

export default function ForgotPasswordPage() {
  return (
    <div>
      <Seo
        title='Aglint | Forgot Password'
        description='AI for People Products'
      />
      <ForgotPasswordComponent />
    </div>
  );
}

ForgotPasswordPage.publicProvider = (page) => {
  return <>{page}</>;
};
