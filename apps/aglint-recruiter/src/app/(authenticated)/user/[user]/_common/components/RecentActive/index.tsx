import { FileText } from 'lucide-react';

import { SectionCard } from '@/authenticated/components/SectionCard';

export const RecentActivity = ({ interviewer }) => {
  return (
    <SectionCard title='Recent Activity'>
      <ul className='space-y-4'>
        {interviewer.recentActivity.map((activity) => (
          <List
            key={activity.action}
            action={activity.action}
            details={activity.details}
            timestamp={activity.timestamp}
          />
        ))}
      </ul>
    </SectionCard>
  );
};

const List = ({ action, details, timestamp }) => {
  return (
    <li className='flex items-start space-x-3'>
      <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100'>
        <FileText className='h-5 w-5 text-gray-500' />
      </div>
      <div>
        <p className='text-sm font-medium text-gray-900'>{action}</p>
        <p className='text-sm text-gray-500'>{details}</p>
        <p className='mt-1 text-xs text-gray-400'>{timestamp}</p>
      </div>
    </li>
  );
};
