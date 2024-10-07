import { EmptyState } from '@components/empty-state';
import { Users } from 'lucide-react';
import { memo } from 'react';

export const EmptyList = memo(() => {
  return (
    <EmptyState
      icon={Users}
      header='No candidates found'
      description='There are no candidates available at the moment.'
    />
  );
});
EmptyList.displayName = 'EmptyList';
