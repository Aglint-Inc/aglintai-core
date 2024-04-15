import Seo from '@components/Common/Seo';
import ResetPasswordComponent from '@components/ResetPassword';
import React from 'react';

export default function ResetPasswordPage() {
  return (
    <div>
      <Seo
        title='Aglint for Employers | Reset Password'
        description='AI for People Products'
      />
      <ResetPasswordComponent />
    </div>
  );
}

ResetPasswordPage.getLayout = (page) => {
  return <>{page}</>;
};
