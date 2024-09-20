import { type Metadata } from 'next';

import SignUpForm from '@/components/Auth/SignupForm';
import Footer from '@/components/Common/Footer';

export const metadata: Metadata = {
  title: 'Sign Up | Aglint AI',
  description: 'AI for People Products',
};

export default function SignUpPage() {
  return (
    <div className='flex min-h-screen flex-col justify-between'>
      <div className='flex flex-1 items-center justify-center'>
        <SignUpForm />
      </div>
      <Footer />
    </div>
  );
}
