import { useJob } from '@/job/hooks';

export const InterviewPlan = () => {
  const {
    interviewPlans: { data, status },
    job: { interview_plan_warning_ignore },
  } = useJob();
  if (status !== 'success') return <></>;
  if (interview_plan_warning_ignore) return <></>;
  if (!data || data.length === 0) return <>Interview plan not set</>;
};
