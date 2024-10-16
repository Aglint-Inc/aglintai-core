import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import Link from 'next/link';
import React from 'react';

import { useCandidatePortal } from '../../../_common/hooks';

function AllSet() {
  const { application_id } = useCandidatePortal();
  return (
    <div>
      <Card className='border border-border bg-background/80 shadow-sm backdrop-blur-sm'>
        <CardHeader className='p-0 pb-4 pl-4 pt-4'>
          <div className='flex items-center gap-2'>
            <h2 className='text-lg font-semibold'>You are all set 🎉 </h2>
          </div>

          <div className='flex items-center gap-2'>
            <div className='text-sm'>
              You&apos;re all set for the recruitment process! You&apos;ll
              receive all the details right here in the portal. Please make sure
              your profile is up-to-date and keep an eye out for updates.
            </div>
          </div>
        </CardHeader>
        <CardContent className='p-0 pb-4 pl-4 pr-4'>
          <Link href={`/candidate/profile?application_id=${application_id}`}>
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
