import React from 'react';
import { Metadata } from 'next';
import SignUpForm from '@/src/components/Auth/SignUpForm';
import Footer from '@/src/components/Common/Footer';

export const metadata: Metadata = {
  title: 'Sign Up | Aglint AI',
  description: 'AI for People Products',
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-neutral-100">
      <div className="flex-1 flex justify-center items-center">
        <SignUpForm />
      </div>
      <Footer />
    </div>
  );
}
