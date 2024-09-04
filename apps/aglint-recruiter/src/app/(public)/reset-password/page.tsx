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
    <div className='min-h-screen flex flex-col justify-between'>
      <div className='flex-1 flex justify-center items-center'>
        <ResetPasswordComponent />
      </div>
      <Footer />
    </div>
  );
}
