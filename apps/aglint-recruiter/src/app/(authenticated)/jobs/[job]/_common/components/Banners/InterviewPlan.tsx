import { useJob } from '@/job/hooks';

export const InterviewPlan = () => {
  const {
    interviewPlans: { data, status },
  } = useJob();
  if (status !== 'success') return <></>;
  if (!data || data.length === 0) return <>Interview plan not set</>;
};
