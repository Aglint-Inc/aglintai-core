import { type Metadata } from 'next';
import React from 'react';

import ResetPasswordComponent from '@/components/Auth/ResetPasswordForm';
import Footer from '@/components/Common/Footer';

export const metadata: Metadata = {
  title: 'Reset Password | Aglint AI',
  description: 'AI for People Products',
};

export default function ResetPasswordPage() {
  return (
    <div className='flex min-h-screen flex-col justify-between'>
      <div className='flex flex-1 items-center justify-center'>
        <ResetPasswordComponent />
      </div>
      <Footer />
    </div>
  );
}
