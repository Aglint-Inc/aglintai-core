import { Skeleton } from '@components/ui/skeleton';

import { useApplicationDetails } from '../../../hooks/useApplicationDetails';

export const Overview = () => {
  const { data, status } = useApplicationDetails();

  if (status === 'pending') {
    return (
      <div className='space-y-2'>
        <Skeleton className='h-3 w-full' />
        <Skeleton className='h-3 w-3/5' />
      </div>
    );
  }

  if (!data?.resume_json?.overview) return null;

  return <p className='text-sm text-gray-800'>{data.resume_json.overview}</p>;
};
