import { Skeleton } from '@components/ui/skeleton';

import { useApplicationDetails } from '../../../hooks/useApplicationDetails';
import { AnalysisItem } from './Common/AnalysisItem';
import { AnalysisSkeleton } from './Common/AnalysisSkeleton';
import { Loader } from './Common/Loader';
export const Education = () => {
  const { status } = useApplicationDetails();
  if (status === 'pending')
    return (
      <Loader count={1}>
        <AnalysisSkeleton slotSkeleton={<Skeleton className='h-10 w-full' />} />
      </Loader>
    );
  return <AnalysisItem type='education' />;
};
