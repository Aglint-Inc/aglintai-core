'use client';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import { TriangleAlert } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { useCandidatePortal } from 'src/app/(public)/candidate/(authenticated)/[application]/_common/hooks';

function IncompleteProfile() {
  const { application_id } = useCandidatePortal();
  return (
    <div>
      <Card className='border border-border bg-background/80 shadow-sm backdrop-blur-sm'>
        <CardHeader className='p-0 pb-4 pl-4 pt-4'>
          <div className='flex items-center gap-2'>
            <TriangleAlert className='text-yellow-600' strokeWidth={1.5} />
            <h2 className='font-semibold'>Your profile is incomplete</h2>
          </div>

          <div className='flex items-center gap-2'>
            <div className='text-sm'>
              Your profile is missing fields linkedin url and phone number. To
              ensure a smooth recruitment process, please update these fields at
              your earliest convenience.
            </div>
          </div>
        </CardHeader>
        <CardContent className='p-0 pb-4 pl-4 pr-4'>
          <Link href={`/candidate/${application_id}/profile?dialog=edit`}>
            <Button className='w-full'>Update profile</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default IncompleteProfile;
