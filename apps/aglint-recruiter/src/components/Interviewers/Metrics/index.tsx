import { DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { ButtonFilter } from '@/devlink2/ButtonFilter';
import { InterviewerMetricList } from '@/devlink3/InterviewerMetricList';
import { InterviewerMetrics } from '@/devlink3/InterviewerMetrics';

import Loader from '../../Common/Loader';
import { useLeaderBoard } from '../Hook';
import { LeaderAnalyticsFilterType } from '../types';

function Metrics() {
  const [leaderboardType, setLeaderboardType] =
    useState<LeaderAnalyticsFilterType['type']>('all_time');
  const [jobs, setJobs] = useState<DatabaseTable['public_jobs']['id'][]>([]);

  const [departments, setDepartments] = useState<
    DatabaseTable['departments']['id'][]
  >([]);

  useEffect(() => {
    setLeaderboardType('all_time');
    setJobs([]);
    setDepartments([]);
  }, []);

  const { data, isLoading } = useLeaderBoard({
    departments,
    jobs,
    type: leaderboardType,
  });

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
        slotFilter={
          <>
            <ButtonFilter />
          </>
        }
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
