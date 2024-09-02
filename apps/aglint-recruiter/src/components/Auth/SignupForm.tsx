'use client';

import { RecruiterType, RecruiterUserType } from '@aglint/shared-types';
import axios from 'axios';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { ApiBodyParamsSignup } from '@/src/pages/api/signup';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';

import { handleEmail, handlePassword } from './utils';

interface SignUpFormInputs {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

// const validateEmail = (email: string) => {
//   const personalEmailPattern =
//     /^(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/;
//   const enteredDomain = email.split('@')[1];

//   if (personalEmailPattern.test(enteredDomain)) {
//     return 'Please enter a valid company email address';
//   }
//   return true;
// };

export default function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
  } = useForm<SignUpFormInputs>();
  const { toast } = useToast();

  const onSubmit = async (data: SignUpFormInputs) => {
    if (!termsAccepted) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please accept the terms and conditions.',
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error, data: authData } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (error) {
        if (error.message === 'Signup requires a valid password') {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Signup requires a valid password',
          });
        } else if (error.message === 'User already registered') {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'This email is already registered',
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: error.message,
          });
        }
      } else {
        const bodyParams: ApiBodyParamsSignup = {
          email: data.email,
          user_id: authData.user.id,
          first_name: data.first_name,
          last_name: data.last_name,
        };

        const res = (await axios.post('/api/signup', bodyParams)) as {
          data: { recruiter_user: RecruiterUserType; recruiter: RecruiterType };
          status: number;
        };

        if (res.status === 200) {
          toast({
            title: 'Success',
            description:
              'Account created successfully. Please check your email to verify your account.',
          });
          router.push(ROUTES['/loading']());
        } else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Something went wrong. Please try again.',
          });
        }
      }
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: err.message,
      });
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <SignUpFormSkeleton />;
  }

  return (
    <Card className='w-[400px]'>
      <CardHeader>
        <h2 className='text-2xl font-bold text-center'>Sign Up</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='first_name'>First Name</Label>
            <Input
              id='first_name'
              {...register('first_name', {
                required: 'First name is required',
              })}
            />
            {errors.first_name && (
              <p className='text-sm text-red-500'>
                {errors.first_name.message}
              </p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='last_name'>Last Name</Label>
            <Input id='last_name' {...register('last_name')} />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email'>Work Email</Label>
            <Input
              id='email'
              type='email'
              {...register('email', {
                required: 'Email is required',
                validate: (value) =>
                  !handleEmail(value).error || handleEmail(value).msg,
              })}
            />
            {errors.email && (
              <p className='text-sm text-red-500'>{errors.email.message}</p>
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
                  validate: (value) =>
                    !handlePassword(value).error || handlePassword(value).msg,
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
              <p className='text-sm text-red-500'>{errors.password.message}</p>
            )}
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='terms'
              checked={termsAccepted}
              onCheckedChange={(checked) =>
                setTermsAccepted(checked as boolean)
              }
            />
            <label
              htmlFor='terms'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              I accept the terms and conditions
            </label>
          </div>
          <Button
            className='w-full'
            type='submit'
            disabled={isLoading || !termsAccepted}
          >
            {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Sign Up
          </Button>
        </form>
      </CardContent>
      <CardFooter className='flex flex-col space-y-4'>
        <div className='text-sm text-center'>
          Already have an account?{' '}
          <a href='/login' className='text-blue-500 hover:underline'>
            Login
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}

function SignUpFormSkeleton() {
  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <Skeleton className='h-8 w-3/4 mx-auto' />
      </CardHeader>
      <CardContent className='space-y-4'>
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
      </CardContent>
      <CardFooter className='flex flex-col space-y-4'>
        <Skeleton className='h-4 w-3/4 mx-auto' />
      </CardFooter>
    </Card>
  );
}
