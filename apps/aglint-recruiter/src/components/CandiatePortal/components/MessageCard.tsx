import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

const MessageCard = () => {
  return (
    <Card className='mx-auto rounded-lg overflow-hidden border '>
      <CardHeader className='flex items-center px-6 py-4'>
        <div className='flex w-full items-center justify-between'>
          <div className='flex items-center'>
            <Image
              className='block w-10 h-10 rounded-full'
              src=''
              alt='Profile'
            />
            <div className='ml-2'>
              <p className='text-sm font-semibold leading-tight'>Brittany Emmanuel</p>
              <p className='text-sm leading-tight text-gray-600'>
                Hiring Manager
              </p>
            </div>
          </div>
          <div className=' text-sm ml-auto text-center sm:text-right'>
            <p className='text-sm mt-2 text-gray-500'>10 Minutes ago</p>
            {/* <a href='#' className='text-blue-500 hover:underline'> */}
            View in email
            {/* </a> */}
          </div>
        </div>
      </CardHeader>
      <CardContent className='px-6'>
        <h2 className='text-md font-semibold'>
          Availability requested for Coding round II
        </h2>
        <p className='text-sm font-normal mt-2'>
          Hi Ter Stegen,
          <br />
          Please submit your availability for the interview of coding round II
          before 24th August 2024, 05:30 AM PST. Upon your submission we will be
          sending a self scheduling link to confirm the interview.
        </p>
      </CardContent>
      <CardFooter className='px-6 py-4'>
        <Button variant='outline' className='w-full py-2 px-4 rounded border border-gray-300'>
          Submit Availability
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MessageCard;
