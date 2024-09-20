import { type Metadata } from 'next';
import React from 'react';

import LoginForm from '@/components/Auth/LoginForm';
import Footer from '@/components/Common/Footer';

export const metadata: Metadata = {
  title: 'Login | Aglint AI',
  description: 'AI for People Products',
};

export default function SignInPage() {
  return (
    <div className='flex min-h-screen flex-col justify-between'>
      <div className='flex flex-1 items-center justify-center'>
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
}
