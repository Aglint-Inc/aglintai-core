import React from 'react';
import { Metadata } from 'next';
import ForgotPasswordForm from '@/src/components/Auth/ForgotPasswordForm';
import Footer from '@/src/components/Common/Footer';

export const metadata: Metadata = {
  title: 'Forgot Password | Aglint AI',
  description: 'AI for People Products',
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-neutral-100">
      <div className="flex-1 flex justify-center items-center">
        <ForgotPasswordForm />
      </div>
      <Footer />
    </div>
  );
}
