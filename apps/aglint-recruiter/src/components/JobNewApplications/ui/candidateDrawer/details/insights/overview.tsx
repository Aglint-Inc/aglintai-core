import { Stack } from '@mui/material';

import { CandidateOverview } from '@/devlink/CandidateOverview';
import { SkeletonTextSmall } from '@/devlink/SkeletonTextSmall';
import { useApplication } from '@/src/context/ApplicationContext';

const Overview = () => {
  const {
    details: { data, status },
  } = useApplication();
  if (status === 'pending')
    return (
      <CandidateOverview
        textOverview={
          <Stack position={'relative'} gap={'4px'} width={'100%'}>
            <SkeletonTextSmall styleWidth={{ style: { width: '100%' } }} />
            <SkeletonTextSmall styleWidth={{ style: { width: '60%' } }} />
          </Stack>
        }
      />
    );
  if (!data?.resume_json?.overview) return <></>;
  return <CandidateOverview textOverview={data.resume_json.overview} />;
};

export { Overview };
