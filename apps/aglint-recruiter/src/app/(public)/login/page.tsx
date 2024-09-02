import { type Metadata } from 'next';
import React from 'react';

import LoginForm from '@/src/components/Auth/LoginForm';
import Footer from '@/src/components/Common/Footer';

export const metadata: Metadata = {
  title: 'Login | Aglint AI',
  description: 'AI for People Products',
};

export default function SignInPage() {
  return (
    <div className='min-h-screen flex flex-col justify-between bg-neutral-100'>
      <div className='flex-1 flex justify-center items-center'>
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
}
