import { InterviewerMetricList } from '@/devlink3/InterviewerMetricList';
import { InterviewerMetrics } from '@/devlink3/InterviewerMetrics';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
// import { useSchedulingAnalytics } from '@/src/context/SchedulingAnalytics';
import { api } from '@/src/trpc/client';
import { Avatar } from '@mui/material';
import { useEffect } from 'react';

function Metrics() {
  const { recruiter } = useAuthDetails();

  useEffect(() => {
    (async () =>
      await api.scheduling.analytics.leaderboard.mutate({
        recruiter_id: recruiter.id,
      }))().then((data) => {});
  }, []);
  return (
    <>
      <InterviewerMetrics textDescription={'change the text'} />
    </>
  );
}

export default Metrics;
