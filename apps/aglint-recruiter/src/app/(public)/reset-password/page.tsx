import React from 'react';
import { Metadata } from 'next';
import ResetPasswordComponent from '@/src/components/Auth/ResetPasswordForm';
import Footer from '@/src/components/Common/Footer';

export const metadata: Metadata ={
  title: 'Reset Password | Aglint AI',
  description: 'AI for People Products',
};

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-neutral-100">
      <div className="flex-1 flex justify-center items-center">
        <ResetPasswordComponent />
      </div>
      <Footer />
    </div>
  );
}
