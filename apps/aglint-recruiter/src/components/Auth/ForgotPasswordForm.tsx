'use client';

import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useToast } from '@/components/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';

interface ForgotPasswordFormInputs {
  email: string;
}

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>();
  const { toast } = useToast();

  const onSubmit = async (data: ForgotPasswordFormInputs) => {
    setIsLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_HOST_NAME}/reset-password`,
    });

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    } else {
      toast({
        title: 'Success',
        description: 'Password reset email sent. Please check your inbox.',
      });
      router.push(ROUTES['/login']());
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <ForgotPasswordFormSkeleton />;
  }

  return (
    <Card className='w-[400px] border-border'>
      <CardHeader>
        <h2 className='text-2xl font-bold text-center'>Forgot Password</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='m@example.com'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  // eslint-disable-next-line security/detect-unsafe-regex
                  value: /^[\w.+-]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: 'Invalid email',
                },
              })}
            />
            {errors.email && (
              <p className='text-sm text-red-500'>{errors.email.message}</p>
            )}
          </div>
          <Button className='w-full' type='submit' disabled={isLoading}>
            {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Reset Password
          </Button>
        </form>
      </CardContent>
      <CardFooter className='flex flex-col space-y-4'>
        <div className='text-sm text-center'>
          Remember your password?{' '}
          <a href='/login' className='text-blue-500 hover:underline'>
            Login
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}

function ForgotPasswordFormSkeleton() {
  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <Skeleton className='h-8 w-3/4 mx-auto' />
      </CardHeader>
      <CardContent className='space-y-4'>
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
      </CardContent>
      <CardFooter className='flex flex-col space-y-4'>
        <Skeleton className='h-4 w-3/4 mx-auto' />
      </CardFooter>
    </Card>
  );
}
