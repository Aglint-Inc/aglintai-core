'use client';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import { TriangleAlert } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { useCandidatePortal } from '@/app/(public)/candidate/(authenticated)/[application_id]/_common/hooks';

function IncompleteProfile() {
  const { application_id } = useCandidatePortal();
  return (
    <div>
      <Card className='bg-background/80 backdrop-blur-sm shadow-sm border border-border'>
        <CardHeader className='p-0 pt-4 pl-4 pb-4'>
          <div className='flex items-center gap-2'>
            <TriangleAlert className='text-yellow-600' strokeWidth={1.5} />
            <h2 className='font-semibold'>Your profile is incomplete</h2>
          </div>

          <div className='flex gap-2 items-center'>
            <div className='text-sm '>
              Your profile is missing fields linkedin url and phone number. To
              ensure a smooth recruitment process, please update these fields at
              your earliest convenience.
            </div>
          </div>
        </CardHeader>
        <CardContent className='p-0 pl-4 pr-4 pb-4'>
          <Link href={`/candidate/${application_id}/profile?dialog=edit`}>
            <Button className='w-full'>Update profile</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default IncompleteProfile;
