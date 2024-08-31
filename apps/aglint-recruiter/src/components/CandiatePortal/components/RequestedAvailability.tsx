import React from 'react';

import { Button } from '../../shadcn/ui/button';
import { Card, CardContent, CardHeader } from '../../shadcn/ui/card';

function RequestedAvailability() {
  return (
    <div>
      <Card className="bg-background/80 backdrop-blur-sm shadow-sm border border-border">
        <CardHeader>
          <h2 className='font-semibold'>
            Availability Requested for HR Round interview
          </h2>
          <p className='text-sm text-gray-600'>
            Requested on Aug 22, 05:00 PM
          </p>
        </CardHeader>
        <CardContent>
          <div className='bg-gray-100 p-4 rounded-lg mb-4'>
            <h4 className='font-medium mb-2'>A note from your recruiter</h4>
            <p className='text-sm text-gray-600'>
              Make sure to study &quot;Coding Essentials&quot; content shared
              with you in email!, also please submit your availability before
              Aug 30, 05:00 PM.
            </p>
          </div>
          <Button className='w-full' variant='outline'>
            Submit availability
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default RequestedAvailability;
