import Seo from '@components/Common/Seo';
import ResetPasswordComponent from '@components/ResetPassword';
import React from 'react';

export default function ResetPasswordPage() {
  return (
    <div>
      <Seo
        title='Aglint | Reset Password'
        description='AI Powered Talent Development Platform.'
      />
      <ResetPasswordComponent />
    </div>
  );
}

ResetPasswordPage.getLayout = (page) => {
  return <>{page}</>;
};
