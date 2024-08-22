import { Stack } from '@mui/material';

import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { InterviewerMetricList } from '@/devlink3/InterviewerMetricList';
import { InterviewerMetrics } from '@/devlink3/InterviewerMetrics';

import Loader from '../../Common/Loader';
import { useLeaderBoard } from '../Hook';

function Metrics() {
  const { data, isLoading } = useLeaderBoard();

  if (isLoading)
    return (
      <Stack
        height={'100%'}
        width={'100%'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Loader />
      </Stack>
    );

  return (
    <>
      <InterviewerMetrics
        textDescription={`Metrics showing for the date range aug 24-28 for sales department `}
        slotInterviewerMetricsList={
          data?.length > 0 ? (
            data.map((interviewer) => {
              return <InterviewerMetricList key={interviewer.user_id} />;
            })
          ) : (
            <GlobalEmptyState
              iconName={'monitoring'}
              size={9}
              textDesc={'No Data Available'}
            />
          )
        }
      />
    </>
  );
}

export default Metrics;
