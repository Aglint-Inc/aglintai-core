import Seo from '@components/Common/Seo';
import ForgotPasswordComponent from '@components/ForgotPassword';
import React from 'react';

export default function ForgotPasswordPage() {
  return (
    <div>
      <Seo
        title='Aglint | Forgot Password'
        description='Find Your Ideal Candidate with AI-Powered Matching!'
      />
      <ForgotPasswordComponent />
    </div>
  );
}

ForgotPasswordPage.getLayout = (page) => {
  return <>{page}</>;
};
