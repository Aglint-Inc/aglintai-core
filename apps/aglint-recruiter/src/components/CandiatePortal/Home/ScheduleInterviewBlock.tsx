import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function ScheduleInterviewBlock() {
  return (
    <Card className='mb-4'>
      <CardHeader>
        <CardTitle className='text-lg font-semibold'>
          Please schedule your next interview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-gray-500 mb-4'>Requested on Aug 22</p>
        <Button className='w-full'>Schedule</Button>
      </CardContent>
    </Card>
  );
}
