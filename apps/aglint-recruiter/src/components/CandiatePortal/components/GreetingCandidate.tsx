import React from 'react';

import { Card, CardContent } from '@/components/ui/card';

function GreetingCandidate({ sentence }: { sentence: string }) {
  return (
    <Card className='mt-2 bg-background/80 backdrop-blur-sm shadow-sm border border-border'>
      <CardContent className='p-4'>
        <p className='text-sm'>{sentence}</p>
      </CardContent>
    </Card>
  );
}

export default GreetingCandidate;
