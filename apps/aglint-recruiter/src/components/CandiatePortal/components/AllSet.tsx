import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import Link from 'next/link';
import React from 'react';

import { useCandidatePortal } from '@/candidate/authenticated/hooks';

function AllSet() {
  const { application_id } = useCandidatePortal();
  return (
    <div>
      <Card className='bg-background/80 backdrop-blur-sm shadow-sm border border-border'>
        <CardHeader className='p-0 pt-4 pl-4 pb-4'>
          <div className='flex items-center gap-2'>
            <h2 className='text-lg font-semibold'>You are all set 🎉 </h2>
          </div>

          <div className='flex gap-2 items-center'>
            <div className='text-sm '>
              You&apos;re all set for the recruitment process! You&apos;ll
              receive all the details right here in the portal. Please make sure
              your profile is up-to-date and keep an eye out for updates.
            </div>
          </div>
        </CardHeader>
        <CardContent className='p-0 pl-4 pr-4 pb-4'>
          <Link href={`/candidate/${application_id}/profile`}>
            <Button variant='outline' className='w-full'>
              View my profile
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default AllSet;
