import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { PenIcon } from 'lucide-react';

export function AvailabilityBlock() {
  return (
    <Card className='mb-4 border border-border'>
      <CardHeader>
        <CardTitle className='text-lg font-semibold'>
          Please add your availability for your next round of interview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className='mb-4 text-sm text-gray-500'>Requested on Aug 22</p>
        <div className='mb-4 flex items-start rounded-md bg-gray-100 p-3'>
          <PenIcon className='mr-2 mt-0.5 h-5 w-5 flex-shrink-0' />
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
