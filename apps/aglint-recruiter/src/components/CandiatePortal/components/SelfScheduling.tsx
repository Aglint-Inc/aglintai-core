import React from 'react';

import { Button } from '../../shadcn/ui/button';
import { Card, CardContent, CardHeader } from '../../shadcn/ui/card';

function SelfScheduling() {
  return (
    <div>
      <Card>
        <CardHeader>
          <h2 className='font-semibold'>
            Self scheduling request for Coding Round
          </h2>
          <p className='text-sm text-gray-600 mb-4'>Requested on Aug 22</p>
        </CardHeader>
        <CardContent>
          <h5 className='mb-2'>
            Please schedule your next interview coding round using the link
            below
          </h5>

          <Button className='w-full'>Self Schedule Now</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default SelfScheduling;
