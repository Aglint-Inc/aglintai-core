import { type Metadata } from 'next';

import SignUpForm from '@/components/Auth/SignupForm';
import Footer from '@/components/Common/Footer';

export const metadata: Metadata = {
  title: 'Sign Up | Aglint AI',
  description: 'AI for People Products',
};

export default function SignUpPage() {
  return (
    <div className='min-h-screen flex flex-col justify-between'>
      <div className='flex-1 flex justify-center items-center'>
        <SignUpForm />
      </div>
      <Footer />
    </div>
  );
}
