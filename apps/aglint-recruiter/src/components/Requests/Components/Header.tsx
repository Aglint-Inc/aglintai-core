import { getFullName } from '@aglint/shared-utils';
import { Progress } from '@components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { Columns, LayoutList } from 'lucide-react';

import { CreateRequestWidget } from '../_common/components/createRequestWidget';
import RequestListFilter from '../_common/components/RequestListFilter';
import { formatRequestHeadingText } from '../_common/utils/formatRequestHeadingText';

function Header({
  recruiterUser,
  requestCount,
  open_request,
  completed_percentage,
  view,
  setView,
}: {
  recruiterUser: any;
  requestCount: any;
  open_request: number;
  completed_percentage: number;
  view: 'list' | 'kanban';
  // eslint-disable-next-line no-unused-vars
  setView: (value: 'list' | 'kanban') => void;
}) {
  return (
    <div className='container mx-auto mt-4 px-6'>
      <div className='flex items-end justify-between'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-lg font-semibold'>
            👋 Hey,{' '}
            {getFullName(recruiterUser.first_name, recruiterUser.last_name)}!
          </h1>
          <p className='text-sm text-muted-foreground'>
            {formatRequestHeadingText(
              requestCount?.card.urgent_request ?? 0,
              requestCount?.card.standard_request ?? 0,
              'today',
            )}
          </p>
        </div>
        <div className='flex flex-col gap-1'>
          <h3 className='text-sm font-semibold text-muted-foreground'>
            {open_request + 1} Open Requests ({completed_percentage}% complete)
          </h3>
          <Progress value={completed_percentage} className='w-full' />
        </div>
      </div>
      <div className='mt-4 flex items-center justify-end gap-2'>
        <RequestListFilter />
        <CreateRequestWidget />
        <Tabs
          value={view}
          onValueChange={(value) => setView(value as 'list' | 'kanban')}
        >
          <TabsList className='h-8'>
            <TabsTrigger value='list'>
              <LayoutList className='h-4 w-4' />
            </TabsTrigger>
            <TabsTrigger value='kanban'>
              <Columns className='h-4 w-4' />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}

export default Header;
