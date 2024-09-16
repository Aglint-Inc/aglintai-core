import { useApplication } from '@/context/ApplicationContext';
import { ScoreTag } from '@/job/components/Common/ResumeScoreNew/ScoreTag';

export const Badge = () => {
  const {
    meta: { data, status },
  } = useApplication();

  if (status === 'pending') return null;
  if (data?.processing_status !== 'success' || data?.resume_score === undefined)
    return null;

  return <ScoreTag score={data.resume_score} />;
};
