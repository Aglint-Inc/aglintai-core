import Image from 'next/image';
import { PropsWithChildren} from 'react';


export const FormLayout = ({ children }: PropsWithChildren) => {
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
        {children}
      </div>
    </div>
  );
};
