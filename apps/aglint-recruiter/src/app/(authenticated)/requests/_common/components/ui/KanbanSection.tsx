import { EmptyState } from '@components/empty-state';
import { Badge } from '@components/ui/badge';
import { Archive } from 'lucide-react';

import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import { RequestCard } from '../RequestCard';

function KanbanSection({
  sectionName,
  requests,
}: {
  sectionName: string;
  requests: any[];
}) {
  return (
    <>
      <div className='text-md bg-muted p-2 font-semibold'>
        {capitalizeFirstLetter(sectionName)}
        <Badge variant='outline' className='ml-2'>
          {requests.length}
        </Badge>
      </div>
      {requests.length > 0 ? (
        <div className='flex h-full flex-col gap-4 p-2'>
          {requests.map((props, i) => (
            <RequestCard
              key={props.id ?? i}
              {...{ ...props, isExpanded: false }}
              mode='column-view'
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Archive}
          description={`No ${capitalizeFirstLetter(sectionName)}`}
        />
      )}
    </>
  );
}
export default KanbanSection;
