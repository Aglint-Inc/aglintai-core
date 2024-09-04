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
    <div className='min-h-screen flex flex-col justify-between'>
      <div className='flex-1 flex justify-center items-center'>
        <ForgotPasswordForm />
      </div>
      <Footer />
    </div>
  );
}
