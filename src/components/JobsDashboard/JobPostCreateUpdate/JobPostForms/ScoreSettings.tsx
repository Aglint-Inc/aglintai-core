import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import ScoreWheel, {
  ScoreWheelParams,
} from '@/src/components/Common/ScoreWheel';
import ScoreWheelControls from '@/src/components/Common/ScoreWheel/controls';
import { useJobs } from '@/src/context/JobsContext';

const ScoreSettings = ({
  defaultWeights,
  jobId,
}: {
  defaultWeights: ScoreWheelParams;
  jobId: string;
}) => {
  const { handleJobUpdate } = useJobs();
  const [weights, setWeights] = useState({ ...defaultWeights });
  useEffect(() => {
    if (
      Object.values(weights).reduce((acc, curr) => {
        acc += curr;
        return acc;
      }, 0) === 100
    ) {
      const timeout = setTimeout(async () => {
        await handleJobUpdate(jobId, { parameter_weights: weights });
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [...Object.values(weights)]);
  return (
    <Stack gap={'50px'} alignItems={'center'} width={'70%'}>
      <Stack alignSelf={'start'}>
        <Stack fontWeight={600}>Resume Score Settings</Stack>
        <Stack color={'#68737D'} width={'500px'}>
          Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.
        </Stack>
      </Stack>
      <Stack
        direction={'row'}
        width={'100%'}
        justifyContent={'space-between'}
        alignItems={'flex-start'}
        gap={'40px'}
      >
        <ScoreWheelControls weights={weights} setWeights={setWeights} />
        <ScoreWheel weights={weights} />
      </Stack>
    </Stack>
  );
};
export default ScoreSettings;
