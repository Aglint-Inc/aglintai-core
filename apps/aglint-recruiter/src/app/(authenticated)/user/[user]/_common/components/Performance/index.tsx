import { Progress } from '@components/ui/progress';

import { SectionCard } from '@/authenticated/components/SectionCard';

export const Performance = ({ interviewer }) => {
  const performances = [
    {
      title: 'Candidate Satisfaction',
      percentage: interviewer.performanceMetrics.candidateSatisfaction,
    },
    {
      title: 'Hiring Manager Satisfaction',
      percentage: interviewer.performanceMetrics.hiringManagerSatisfaction,
    },
    {
      title: 'Candidate Satisfaction',
      percentage: interviewer.performanceMetrics.decisionAccuracy,
    },
  ];
  return (
    <SectionCard title='Performance Metrics'>
      <div className='space-y-4'>
        {performances.map((performance) => (
          <div key={performance.title}>
            <div className='mb-1 flex justify-between'>
              <span className='text-sm font-medium text-gray-700'>
                {performance.title}
              </span>
              <span className='text-sm font-medium text-gray-700'>
                {performance.percentage}%
              </span>
            </div>
            <Progress value={performance.percentage} className='h-2' />
          </div>
        ))}
      </div>
    </SectionCard>
  );
};
