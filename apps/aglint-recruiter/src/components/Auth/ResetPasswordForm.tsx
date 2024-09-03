'use client';
import { Eye, EyeOff } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { useToast } from '@/components/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouterPro } from '@/src/hooks/useRouterPro';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';

interface ResetFormInputs {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordComponent() {
  const router = useRouterPro();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetFormInputs>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<ResetFormInputs> = async ({
    confirmPassword,
  }) => {
    const { error } = await supabase.auth.updateUser({
      password: confirmPassword,
      data: { is_invite: 'false' },
    });

    if (!error) {
      toast({
        title: 'Success',
        description: 'Password reset successfully.',
      });
      router.push(ROUTES['/loading']());
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  };

  useEffect(() => {
    try {
      const tempObj =
        router.asPath
          .slice(router.asPath.indexOf('#'))
          .replaceAll('=', '":"')
          .replaceAll('&', '","')
          .replaceAll('#', '{"') + '"}';
      const tempCreds = JSON.parse(tempObj);

      if (tempCreds.access_token) {
        supabase.auth.setSession({
          access_token: tempCreds.access_token,
          refresh_token: tempCreds.refresh_token,
        });
      }
    } catch (e) {
      // Handle error
    }
  }, [router]);

  return (
    <Card className='w-[400px] border-border'>
      <CardHeader>
        <h2 className='text-2xl font-bold text-center'>Reset Password</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <div className='relative'>
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter new password'
                {...register('password', {
                  required: 'Password is required',
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      'Password must contain at least 8 characters, including UPPER/lowercase, one number and special characters',
                  },
                })}
              />
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='absolute right-2 top-1/2 -translate-y-1/2'
                onClick={handleClickShowPassword}
              >
                {showPassword ? (
                  <EyeOff className='h-4 w-4' />
                ) : (
                  <Eye className='h-4 w-4' />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className='text-red-500 text-sm'>{errors.password.message}</p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>Confirm Password</Label>
            <Input
              id='confirmPassword'
              type={showPassword ? 'text' : 'password'}
              placeholder='Confirm new password'
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: (value) =>
                  value === watch('password') || 'The passwords do not match.',
              })}
            />
            {errors.confirmPassword && (
              <p className='text-red-500 text-sm'>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <Button type='submit' className='w-full'>
            Reset Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
