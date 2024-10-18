import { FileText } from 'lucide-react';

import UISectionCard from '@/components/Common/UISectionCard';

export const RecentActivity = () => {
  return (
    <UISectionCard title='Recent Activity'>
      <ul className='space-y-4'>
        {[1, 2, 3, 4].map((k) => (
          <List
            key={k}
            action={'action'}
            details={'details'}
            timestamp={'timestamp'}
          />
        ))}
      </ul>
    </UISectionCard>
  );
};

const List = ({
  action,
  details,
  timestamp,
}: {
  action: string;
  details: string;
  timestamp: string;
}) => {
  return (
    <li className='flex items-start space-x-3'>
      <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-muted'>
        <FileText className='h-5 w-5 text-muted-foreground' />
      </div>
      <div>
        <p className='text-sm font-medium text-gray-900'>{action}</p>
        <p className='text-sm text-muted-foreground'>{details}</p>
        <p className='mt-1 text-xs text-gray-400'>{timestamp}</p>
      </div>
    </li>
  );
};
