import { Skeleton } from '@components/ui/skeleton';

import { useApplicationDetails } from '../../../hooks/useApplicationDetails';
import { AnalysisItem } from './Common/AnalysisItem';
import { AnalysisSkeleton } from './Common/AnalysisSkeleton';
import { Loader } from './Common/Loader';

export const Skills = () => {
  const { status } = useApplicationDetails();
  if (status === 'pending')
    if (status === 'pending')
      return (
        <Loader count={1}>
          <AnalysisSkeleton slotSkeleton={<Skeleton />} />
        </Loader>
      );
  return <AnalysisItem type='skills' />;
};
