import { AnalysisSkeleton } from '@/devlink/AnalysisSkeleton';
import { Skeleton } from '@/devlink2/Skeleton';
import { useApplication } from '@/src/context/ApplicationContext';

import { Loader } from '../../common';
import { AnalysisItem } from './common';

const Education = () => {
  const {
    details: { status },
  } = useApplication();
  if (status === 'pending')
    return (
      <Loader count={1}>
        <AnalysisSkeleton slotSkeleton={<Skeleton />} />
      </Loader>
    );
  return <AnalysisItem type='education' />;
};

export { Education };
