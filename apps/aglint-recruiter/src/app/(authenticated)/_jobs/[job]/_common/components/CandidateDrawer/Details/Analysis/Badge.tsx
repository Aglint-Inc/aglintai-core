import { Badge as UIBadge } from '@components/ui/badge';

import { useApplication } from '@/context/ApplicationContext';

export const Badge = () => {
  const {
    meta: { data, status },
  } = useApplication();

  if (status === 'pending') return null;
  if (data?.processing_status !== 'success' || data?.resume_score === undefined)
    return null;

  const tier = getScoreTier(data.resume_score); // You may need to implement getScoreTier

  return (
    <UIBadge
      variant={
        tier.toLowerCase() as
          | 'default'
          | 'destructive'
          | 'secondary'
          | 'outline'
      }
    >
      {`Score: ${data.resume_score}`}
    </UIBadge>
  );
};

// Helper function to determine the tier based on the score
const getScoreTier = (score: number) => {
  if (score >= 80) return 'High';
  if (score >= 50) return 'Medium';
  return 'Low';
};
