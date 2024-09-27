import { Progress } from '@components/ui/progress';

import UISectionCard from '@/components/Common/UISectionCard';

export const Performance = () => {
  const performances = [
    {
      title: 'Candidate Satisfaction',
      percentage: 40,
    },
    {
      title: 'Hiring Manager Satisfaction',
      percentage: 70,
    },
    {
      title: 'Candidate Satisfaction',
      percentage: 50,
    },
  ];
  return (
    <UISectionCard title='Performance Metrics'>
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
    </UISectionCard>
  );
};
