import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import React from 'react';

export default function AverageExperience() {
  return (
    <Card className='mx-auto w-full max-w-sm'>
      <CardHeader>
        <CardTitle className='text-md font-semibold'>
          Average Experience
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col items-center'>
        <div className='mb-2 text-6xl font-bold'>10.4</div>
        <div className='mb-4 text-2xl font-semibold'>Years</div>
        <p className='text-center text-muted-foreground'>
          Average of total full time experience of the candidates
        </p>
      </CardContent>
    </Card>
  );
}
