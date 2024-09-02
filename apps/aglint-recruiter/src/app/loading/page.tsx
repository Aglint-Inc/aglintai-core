'use client';

import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useToast } from '@/components/hooks/use-toast';

import { handleAuthFlow } from './authActions';

export default function LoadingPage() {
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const performAuthFlow = async () => {
      try {
        const redirectUrl = await handleAuthFlow(router, toast);
        if (redirectUrl) {
          router.push(redirectUrl);
        }
      } catch (error) {
        console.error('Auth flow error:', error);
      }
    };

    performAuthFlow();
  }, [router, toast]);

  return (
    <div className='h-screen flex items-center justify-center'>
      <Loader2 className='h-12 w-12 animate-spin text-primary' />
    </div>
  );
}
