import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import React from 'react';

export default function AverageTenure() {
  return (
    <Card className='mx-auto w-full max-w-sm'>
      <CardHeader>
        <CardTitle className='text-md font-semibold'>Average Tenure</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col items-center'>
        <div className='mb-2 text-6xl font-bold'>1.9</div>
        <div className='mb-4 text-2xl font-semibold'>Years</div>
        <p className='text-center text-muted-foreground'>
          Average time before switching companies.
        </p>
      </CardContent>
    </Card>
  );
}
