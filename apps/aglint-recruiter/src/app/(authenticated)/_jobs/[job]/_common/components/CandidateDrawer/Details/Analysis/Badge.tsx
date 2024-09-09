import { useApplication } from '@/context/ApplicationContext';
import { ResumeScore } from '@/job/components/Common/ResumeScoreNew';

export const Badge = () => {
  const {
    meta: { data, status },
  } = useApplication();
  if (status === 'pending') return <>Loading score...</>;
  if (data?.processing_status !== 'success') return <></>;
  return (
    <ResumeScore
      resume_processing_state='processed'
      resume_score={data.resume_score}
    />
  );
};
