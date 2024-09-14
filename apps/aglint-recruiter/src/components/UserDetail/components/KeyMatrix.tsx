import { dayjsLocal } from '@aglint/shared-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';

export const KeyMatrics = ({
  totalHour,
  completedCount,
  declineCount,
  upcomingCount,
}) => {
  const completedHour = dayjsLocal.duration(totalHour, 'minutes').asHours();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
          <div className='text-center'>
            <div className='text-xl font-bold text-green-600'>
              {completedHour}
            </div>
            <div className='text-sm text-gray-500'>Interview Hours</div>
          </div>
          <div className='text-center'>
            <div className='text-xl font-bold text-green-600'>
              {completedCount}
            </div>
            <div className='text-sm text-gray-500'>Interviews Completed</div>
          </div>
          <div className='text-center'>
            <div className='text-xl font-bold text-yellow-600'>
              {upcomingCount}
            </div>
            <div className='text-sm text-gray-500'>Average Rating</div>
          </div>
          <div className='text-center'>
            <div className='text-xl font-bold text-red-600'>{declineCount}</div>
            <div className='text-sm text-gray-500'>Declines</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
