import { useParams } from 'next/navigation';
import { useMemo } from 'react';

export const useCurrentJob = () => {
  const params = useParams();
  const job_id = useMemo(() => params.job as string, [params.job]);
  if (!job_id)
    throw new Error(
      'useCurrentJob cannot be used in a page without "[job]" in the path',
    );
  return { job_id };
};
