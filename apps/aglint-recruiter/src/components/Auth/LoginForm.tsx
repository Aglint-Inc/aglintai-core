'use client';

import { Alert, AlertDescription } from '@components/ui/alert';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Eye, EyeOff, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { supabase } from '@/utils/supabase/client';

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    setAuthError(null);
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        setAuthError(error.message);
      } else {
        const response = await fetch('/auth/redirect', {
          method: 'GET',
          redirect: 'follow',
        });

        if (response.redirected) {
          await router.push(response.url);
        } else if (!response.ok) {
          await router.push('/login');
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        setAuthError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const oauthHandler = async (provider: 'google') => {
    setAuthError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_HOST_NAME}/auth/callback`,
        },
      });
      if (error) {
        setAuthError(error.message);
      }
    } catch (err) {
      if (err instanceof Error) {
        setAuthError(err.message);
      }
    }
  };

  const searchParams = useSearchParams()!;
  const resetRequested = searchParams.get('resetRequested');

  return (
    <Card className='w-[400px] border-border'>
      <CardHeader>
        <h2 className='text-center text-2xl font-bold'>Login</h2>
      </CardHeader>
      <CardContent>
        {resetRequested && (
          <Alert className='mb-4'>
            <AlertDescription>
              Password reset email sent. Please check your inbox.
            </AlertDescription>
          </Alert>
        )}
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
                  message: 'Invalid email format',
                },
              })}
            />
            {errors.email && (
              <p className='text-sm text-destructive'>{errors.email.message}</p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <div className='relative'>
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is required',
                })}
              />

              <Button
                className='absolute right-2 top-1/2 -translate-y-1/2 p-1'
                onClick={() => setShowPassword(!showPassword)}
                type='button'
                variant='ghost'
                size='sm'
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </div>
            {errors.password && (
              <p className='text-sm text-destructive'>
                {errors.password.message}
              </p>
            )}
          </div>
          {authError && <p className='text-sm text-destructive'>{authError}</p>}
          <Button className='w-full' type='submit' disabled={isLoading}>
            {isLoading && <Loader className='mr-2 h-4 w-4 animate-spin' />}
            Login
          </Button>
        </form>
      </CardContent>
      <CardFooter className='flex flex-col space-y-4'>
        {process.env.NODE_ENV === 'development' && (
          <Button
            variant='outline'
            className='w-full'
            onClick={() => oauthHandler('google')}
          >
            Sign in with Google
          </Button>
        )}
        <div className='text-center text-sm'>
          <a href='/forgot-password' className='text-blue-500 hover:underline'>
            Forgot password?
          </a>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <div className='text-center text-sm'>
            Don&apos;t have an account?{' '}
            <a href='/signup' className='text-blue-500 hover:underline'>
              Sign up
            </a>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
