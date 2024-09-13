import { Card } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';

import { useApplication } from '@/context/ApplicationContext';

const Overview = () => {
  const {
    details: { data, status },
  } = useApplication();

  if (status === 'pending') {
    return (
      <Card className='bg-purple-100 p-4'>
        <div className='space-y-2'>
          <Skeleton className='h-3 w-full' />
          <Skeleton className='h-3 w-3/5' />
        </div>
      </Card>
    );
  }

  if (!data?.resume_json?.overview) return null;

  return (
    <Card className='bg-purple-100 p-4'>
      <p className='text-sm text-gray-800'>{data.resume_json.overview}</p>
    </Card>
  );
};

export { Overview };
