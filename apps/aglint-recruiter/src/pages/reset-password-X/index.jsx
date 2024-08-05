import Seo from '@components/Common/Seo';
import ResetPasswordComponent from '@components/ResetPassword';
import React from 'react';

export default function ResetPasswordPage() {
  return (
    <div>
      <Seo
        title='Reset Password | Aglint AI'
        description='AI for People Products'
      />
      <ResetPasswordComponent />
    </div>
  );
}

ResetPasswordPage.publicProvider = (page) => {
  return <>{page}</>;
};
