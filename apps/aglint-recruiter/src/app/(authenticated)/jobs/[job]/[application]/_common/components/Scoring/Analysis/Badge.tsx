import { ScoreTag } from '@/job/components/Common/ResumeScoreNew/ScoreTag';

import { useApplicationMeta } from '../../../hooks/useApplicationMeta';

export const Badge = () => {
  const { data, status } = useApplicationMeta();

  if (status === 'pending') return null;
  if (data?.processing_status !== 'success' || data?.resume_score === undefined)
    return null;

  return <ScoreTag score={Number(data?.resume_score)} />;
};
