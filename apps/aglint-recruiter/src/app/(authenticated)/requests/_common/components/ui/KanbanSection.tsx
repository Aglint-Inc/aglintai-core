import { Badge } from '@components/ui/badge';

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
      <div className='text-md mb-2 font-semibold'>
        {capitalizeFirstLetter(sectionName)}
        <Badge variant='outline' className='ml-2'>
          {requests.length}
        </Badge>
      </div>
      {requests.length > 0 ? (
        <div className='flex flex-col gap-4'>
          {requests.map((props, i) => (
            <RequestCard
              key={props.id ?? i}
              {...{ ...props, isExpanded: false }}
              mode='column-view'
            />
          ))}
        </div>
      ) : (
        <div className='rounded-md border p-4 text-center text-muted-foreground'>
          No requests in this section
        </div>
      )}
    </>
  );
}
export default KanbanSection;
