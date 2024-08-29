import { Button } from '@components/shadcn/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@components/shadcn/ui/card';
import { ExternalLinkIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';

export default function NextInterviewBlock() {
  return (
    <Card className='mb-4'>
      <CardHeader>
        <CardTitle className='text-lg font-semibold'>
          Your next interview
        </CardTitle>
        <p className='text-sm text-gray-500'>Mon, Aug 21</p>
      </CardHeader>
      <CardContent>
        <div className='bg-gray-100 p-4 rounded-md mb-4'>
          <div className='flex items-center mb-2'>
            <div className='bg-gray-300 text-gray-600 font-semibold p-2 rounded mr-3'>
              Aug
              <br />
              21
            </div>
            <div>
              <p className='font-semibold'>9:00am - 9:45am PT</p>
              <p className='text-sm text-gray-600'>Recruiter initial call</p>
            </div>
          </div>
          <div className='flex items-center text-sm text-gray-600 mb-3'>
            <UserIcon className='w-4 h-4 mr-2' />
            <span>Jane M</span>
            <ExternalLinkIcon className='w-4 h-4 ml-2' />
          </div>
          <Button variant='outline' className='w-full'>
            Join meeting
          </Button>
        </div>
        <Link href='#' className='text-blue-600 text-sm'>
          See all 3 upcoming interviews
        </Link>
      </CardContent>
    </Card>
  );
}
