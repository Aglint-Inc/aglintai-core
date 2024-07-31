'use client';
import Seo from '@components/Common/Seo';
import ForgotPasswordComponent from '@components/ForgotPassword';
import React from 'react';

export default function ForgotPasswordPage() {
  return (
    <div>
      <Seo
        title='Forgot Password | Aglint AI'
        description='AI for People Products'
      />
      <ForgotPasswordComponent />
    </div>
  );
}
