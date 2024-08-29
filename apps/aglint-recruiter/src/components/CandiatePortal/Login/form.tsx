'use client';
import Link from 'next/link';
import { Checkbox } from '@components/shadcn/ui/checkbox';
import { Input } from '@components/shadcn/ui/input';
import { Label } from '@components/shadcn/ui/label';
import { Button } from '@components/shadcn/ui/button';
import { useState } from 'react';

export const Form = () => {
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
    <>
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
    </>
  );
};
