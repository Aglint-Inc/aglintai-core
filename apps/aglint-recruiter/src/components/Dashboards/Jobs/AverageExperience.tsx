import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@components/shadcn/ui/card';
import React from 'react';

export default function AverageExperience() {
  return (
    <Card className='w-full max-w-sm mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>Average Experience</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col items-center'>
        <div className='text-6xl font-bold mb-2'>10.4</div>
        <div className='text-2xl font-semibold mb-4'>Years</div>
        <p className='text-center text-muted-foreground'>
          Average of total full time experience of the candidates
        </p>
      </CardContent>
    </Card>
  );
}
