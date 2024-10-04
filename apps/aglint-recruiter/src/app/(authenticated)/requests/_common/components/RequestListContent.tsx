import { Skeleton } from '@components/ui/skeleton';
import { type REQUEST_SESSIONS_DEFAULT_DATA } from '@requests/constant';
import { useState } from 'react';

import KanbanSection from './ui/KanbanSection';
import ListSection from './ui/ListSection';
import ScrollableSection from './ui/ScrollableSection';

function RequestListContent({
  view,
  defaults,
  isFetched,
}: {
  view: 'list' | 'kanban';
  defaults: typeof REQUEST_SESSIONS_DEFAULT_DATA;
  isFetched: boolean;
}) {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const urgentRequests = defaults.find(
    ({ sectionName }) => sectionName === 'urgent_request',
  );
  const completedRequests = defaults.find(
    ({ sectionName }) => sectionName === 'completed_request',
  );
  const otherSections = defaults.filter(
    ({ sectionName }) =>
      sectionName !== 'urgent_request' && sectionName !== 'completed_request',
  );

  return (
    <div className='mt-8 space-y-6'>
      {/******** Urgent sections ******* */}
      {urgentRequests && urgentRequests.requests.length > 0 && (
        <ScrollableSection section={urgentRequests} isFetched={isFetched} />
      )}

      <div className='container-lg mx-auto w-full px-4'>
        <div
          className={`${view === 'kanban' ? 'grid grid-cols-4' : 'space-y-4'}`}
        >
          {otherSections.map(({ requests, sectionName }) => (
            <div
              key={sectionName}
              className={view === 'kanban' ? 'w-full flex-shrink-0' : ''}
            >
              {isFetched ? (
                view === 'list' ? (
                  <ListSection
                    collapseScheduleRequestSections={Boolean(
                      urgentRequests && !!urgentRequests.requests.length,
                    )}
                    sectionName={sectionName}
                    requests={requests}
                    expandedSections={expandedSections}
                    setExpandedSections={setExpandedSections}
                  />
                ) : (
                  <KanbanSection
                    sectionName={sectionName}
                    requests={requests}
                  />
                )
              ) : (
                <>
                  <Skeleton className='mb-2 h-6 w-40' />
                  <Skeleton className='mb-4 h-[200px] w-full' />
                  <Skeleton className='mb-4 h-[200px] w-full' />
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/******** Completed sections ******* */}
      {completedRequests && completedRequests.requests.length > 0 && (
        <ScrollableSection section={completedRequests} isFetched={isFetched} />
      )}
    </div>
  );
}

export default RequestListContent;
