import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@components/ui/input-otp';
import Image from 'next/image';
import { type PropsWithChildren } from 'react';

export const FormLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex min-h-screen w-full items-center justify-center bg-gray-100 p-4'>
      <div className='w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg'>
        <div className='relative flex h-40 w-full items-center justify-center bg-cyan-50'>
          <Image
            src='https://aglintai-seed-data.vercel.app/logo/discord.jpg'
            alt='Company Logo'
            width={120}
            height={120}
            className='w-30 h-30'
          />
        </div>
        <div className='p-8'>
          <h1 className='mb-2 text-center text-2xl font-bold'>
            Check your email for a code
          </h1>
          <p className='mb-6 text-center text-gray-600'>
            Please insert below the verification code that was sent to
            <br />
            bri****@aglint.ai
          </p>
          <div className='flex justify-center'>
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
