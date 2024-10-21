'use client';

import { Button } from '@components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import ROUTES from '@/utils/routing/routes';
import { supabase } from '@/utils/supabase/client';

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

  const onSubmit = async (data: ForgotPasswordFormInputs) => {
    setIsLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${process.env.NEXT_PUBLIC_HOST_NAME}/reset-password`,
      });

      if (error) throw error;

      // Call your custom email sender
      // await fetch('/api/auth/send-reset-email', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     email: data.email,
      //     resetLink: `${process.env.NEXT_PUBLIC_HOST_NAME}/reset-password`,
      //   }),
      // });

      router.push(ROUTES['/login']() + '?resetRequested=true');
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className='w-[400px] border-border'>
      <CardHeader>
        <h2 className='text-center text-2xl font-bold'>Forgot Password</h2>
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
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email',
                },
              })}
            />
            {errors.email && (
              <p className='text-sm text-destructive'>{errors.email.message}</p>
            )}
          </div>
          <Button className='w-full' type='submit' disabled={isLoading}>
            {isLoading ? (
              <Loader className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              'Reset Password'
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className='flex flex-col space-y-4'>
        <div className='text-center text-sm'>
          Remember your password?{' '}
          <a href='/login' className='text-blue-500 hover:underline'>
            Login
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
