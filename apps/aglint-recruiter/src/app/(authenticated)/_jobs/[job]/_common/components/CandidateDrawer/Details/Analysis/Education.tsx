import { Skeleton } from '@components/ui/skeleton';

import { useApplication } from '@/context/ApplicationContext';

import { Loader } from '../../Common/Loader';
import { AnalysisItem } from './Common/AnalysisItem';
import { AnalysisSkeleton } from './Common/AnalysisSkeleton';

export const Education = () => {
  const {
    details: { status },
  } = useApplication();
  if (status === 'pending')
    return (
      <Loader count={1}>
        <AnalysisSkeleton slotSkeleton={<Skeleton className='h-10 w-full' />} />
      </Loader>
    );
  return <AnalysisItem type='education' />;
};
