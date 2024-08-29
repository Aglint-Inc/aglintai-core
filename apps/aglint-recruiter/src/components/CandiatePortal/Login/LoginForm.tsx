/* eslint-disable security/detect-object-injection */
'use client';

import { Button } from '@components/shadcn/ui/button';
import { Checkbox } from '@components/shadcn/ui/checkbox';
import { Input } from '@components/shadcn/ui/input';
import { Label } from '@components/shadcn/ui/label';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

export default function LoginForm() {
  const [verificationCode, setVerificationCode] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleCodeChange = (index: number, value: string) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Move to next input if value is entered
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = () => {
    // Handle verification logic here
    // console.log('Verifying code:', verificationCode.join(''))
  };

  const handleResendOTP = () => {
    // Handle resend OTP logic here
    // console.log('Resending OTP')
  };

  return (
    <div className='w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='relative h-40 bg-cyan-50'>
        <svg
          className='absolute inset-0 w-full h-full'
          viewBox='0 0 400 160'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M0,80 Q100,20 200,80 T400,80'
            fill='none'
            stroke='#3B82F6'
            strokeWidth='2'
          />
          <circle cx='50' cy='50' r='20' fill='#EC4899' />
          <polygon points='350,30 370,70 330,70' fill='#F59E0B' />
          <rect x='300' y='100' width='30' height='30' fill='#10B981' />
        </svg>
        <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2'>
          <div className='bg-blue-600 rounded-full p-4'>
            <Image
              src='/placeholder.svg?height=40&width=40'
              alt='ModernLoop Logo'
              width={40}
              height={40}
              className='w-10 h-10'
            />
          </div>
        </div>
      </div>
      <div className='p-8 pt-16'>
        <h1 className='text-2xl font-bold text-center mb-2'>
          Check your email for a code
        </h1>
        <p className='text-gray-600 text-center mb-6'>
          Please insert below the verification code that was sent to
          <br />
          bri****@modernloop.xyz
        </p>
        <div className='flex justify-between mb-6'>
          {verificationCode.map((digit, index) => (
            <Input
              key={index}
              id={`code-${index}`}
              type='text'
              inputMode='numeric'
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              className='w-12 h-12 text-center text-2xl'
            />
          ))}
        </div>
        <div className='flex items-center space-x-2 mb-6'>
          <Checkbox
            id='terms'
            checked={agreedToTerms}
            onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
          />
          <Label htmlFor='terms' className='text-sm text-gray-600'>
            I have read and agreed to the ModernLoop{' '}
            <Link
              href='/privacy-policy'
              className='text-blue-600 hover:underline'
            >
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link
              href='/terms-of-service'
              className='text-blue-600 hover:underline'
            >
              Terms of Service
            </Link>
            .
          </Label>
        </div>
        <Button
          className='w-full mb-4'
          onClick={handleVerify}
          disabled={!agreedToTerms || verificationCode.some((digit) => !digit)}
        >
          Verify
        </Button>
        <Button variant='outline' className='w-full' onClick={handleResendOTP}>
          Resend OTP
        </Button>
      </div>
    </div>
  );
}
