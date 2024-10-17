import { Card, CardContent } from '@components/ui/card';
import React from 'react';

function GreetingCandidate({ sentence }: { sentence: string }) {
  return (
    <Card className='mt-2 border border-border bg-background/80 shadow-sm backdrop-blur-sm'>
      <CardContent className='p-4'>
        <p className='text-sm'>{sentence}</p>
      </CardContent>
    </Card>
  );
}

export default GreetingCandidate;
