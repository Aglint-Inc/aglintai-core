import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { ExternalLinkIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';

export default function NextInterviewBlock() {
  return (
    <Card className='mb-4 border border-border bg-background/80 shadow-sm backdrop-blur-sm'>
      <CardHeader>
        <CardTitle className='text-lg font-semibold'>
          Your next interview
        </CardTitle>
        <p className='text-sm text-gray-500'>Mon, Aug 21</p>
      </CardHeader>
      <CardContent>
        <div className='mb-4 rounded-md bg-gray-100 p-4'>
          <div className='mb-2 flex items-center'>
            <div className='mr-3 rounded bg-gray-300 p-2 font-semibold text-gray-600'>
              Aug
              <br />
              21
            </div>
            <div>
              <p className='font-semibold'>9:00am - 9:45am PT</p>
              <p className='text-sm text-gray-600'>Recruiter initial call</p>
            </div>
          </div>
          <div className='mb-3 flex items-center text-sm text-gray-600'>
            <UserIcon className='mr-2 h-4 w-4' />
            <span>Jane M</span>
            <ExternalLinkIcon className='ml-2 h-4 w-4' />
          </div>
          <Button variant='outline' className='w-full'>
            Join meeting
          </Button>
        </div>
        <Link href='#' className='text-sm text-blue-600'>
          See all 3 upcoming interviews
        </Link>
      </CardContent>
    </Card>
  );
}
