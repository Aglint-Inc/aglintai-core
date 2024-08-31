import Image from 'next/image';
import { PropsWithChildren} from 'react';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../../shadcn/ui/input-otp';


export const FormLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='w-full min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden'>
        <div className='relative h-40 w-full bg-cyan-50 flex items-center justify-center'>
          <Image
            src='https://aglintai-seed-data.vercel.app/logo/discord.jpg'
            alt='Company Logo'
            width={120}
            height={120}
            className='w-30 h-30'
          />
        </div>
        <div className='p-8'>
          <h1 className='text-2xl font-bold text-center mb-2'>
            Check your email for a code
          </h1>
          <p className='text-gray-600 text-center mb-6'>
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
