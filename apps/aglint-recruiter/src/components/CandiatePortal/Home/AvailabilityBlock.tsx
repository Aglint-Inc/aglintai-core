import { PenIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AvailabilityBlock() {
  return (
    <Card className='mb-4 border border-border'>
      <CardHeader>
        <CardTitle className='text-lg font-semibold'>
          Please add your availability for your next round of interview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-gray-500 mb-4'>Requested on Aug 22</p>
        <div className='bg-gray-100 p-3 rounded-md mb-4 flex items-start'>
          <PenIcon className='w-5 h-5 mr-2 mt-0.5 flex-shrink-0' />
          <div>
            <p className='font-semibold'>A note from your recruiter</p>
            <p className='text-sm'>
              Make sure to study Coding Prep content shared with you!
            </p>
          </div>
        </div>
        <Button className='w-full'>Submit availability</Button>
      </CardContent>
    </Card>
  );
}
