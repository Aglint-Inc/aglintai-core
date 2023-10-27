import Seo from '@components/Common/Seo';
import ResetPasswordComponent from '@components/ResetPassword';
import React from 'react';

export default function ResetPasswordPage() {
  return (
    <div>
      <Seo
        title='Aglint for Employers | Reset Password'
        description='We help companies hire the perfect candidates quickly. Our trained models understand company culture and values, finding the right fit. Our automated screening saves time and money.'
      />
      <ResetPasswordComponent />
    </div>
  );
}

ResetPasswordPage.getLayout = (page) => {
  return <>{page}</>;
};
