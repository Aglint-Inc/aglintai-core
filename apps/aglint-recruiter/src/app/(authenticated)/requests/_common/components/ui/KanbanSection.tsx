import { Badge } from '@components/ui/badge';
import { Archive } from 'lucide-react';

import GlobalEmpty from '@/common/GlobalEmpty';
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
        <div className='flex h-full flex-col gap-4 border border-gray-300 p-2'>
          {requests.map((props, i) => (
            <RequestCard
              key={props.id ?? i}
              {...{ ...props, isExpanded: false }}
              mode='column-view'
            />
          ))}
        </div>
      ) : (
        <GlobalEmpty
          icon={<Archive className='h-4 w-4 text-muted-foreground' />}
          description={`No ${capitalizeFirstLetter(sectionName)}`}
        />
      )}
    </>
  );
}
export default KanbanSection;
