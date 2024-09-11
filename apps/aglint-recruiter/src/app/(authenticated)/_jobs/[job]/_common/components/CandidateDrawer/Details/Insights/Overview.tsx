import { Skeleton } from '@components/ui/skeleton';
import { CandidateOverview } from '@devlink/CandidateOverview';
import { Stack } from '@mui/material';

import { useApplication } from '@/context/ApplicationContext';

const Overview = () => {
  const {
    details: { data, status },
  } = useApplication();
  if (status === 'pending')
    return (
      <CandidateOverview
        textOverview={
          <Stack position={'relative'} gap={'4px'} width={'100%'}>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/5" />
          </Stack>
        }
      />
    );
  if (!data?.resume_json?.overview) return <></>;
  return <CandidateOverview textOverview={data.resume_json.overview} />;
};

export { Overview };
