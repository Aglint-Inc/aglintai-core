import { type Metadata } from 'next';
import React from 'react';

import ForgotPasswordForm from '@/components/Auth/ForgotPasswordForm';
import Footer from '@/components/Common/Footer';

export const metadata: Metadata = {
  title: 'Forgot Password | Aglint AI',
  description: 'AI for People Products',
};

export default function ForgotPasswordPage() {
  return (
    <div className='flex min-h-screen flex-col justify-between'>
      <div className='flex flex-1 items-center justify-center'>
        <ForgotPasswordForm />
      </div>
      <Footer />
    </div>
  );
}
