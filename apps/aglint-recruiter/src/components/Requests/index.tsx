import { getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { useEffect, useState } from 'react';

import { NoPendingReq } from '@/devlink2/NoPendingReq';
import { RequestAgent } from '@/devlink2/RequestAgent';
import { RequestAgentEmpty } from '@/devlink2/RequestAgentEmpty';
import { RequestAgentTab } from '@/devlink2/RequestAgentTab';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useRequests } from '@/src/context/RequestsContext';
import { useRouterPro } from '@/src/hooks/useRouterPro';

import { ShowCode } from '../Common/ShowCode';
import AgentChats from './AgentChats';
import { AgentIEditorProvider } from './AgentChats/AgentEditorContext';
import FilterAndSorting from './FiltersAndSorting';
import Section from './Section';
import StatsCards from './StatsCards';

const Requests = () => {
  const { recruiterUser } = useAuthDetails();
  const { setQueryParams, queryParams } = useRouterPro();
  const [tabs, setTabs] = useState([
    { title: 'Dashboard', isTabActive: false, pathName: 'dashboard' },
    { title: 'Requests', isTabActive: false, pathName: 'requests' },
  ]);

  const {
    requests: { status, data: requestList },
    filters,
  } = useRequests();
  const isNotApplied =
    !filters.is_new &&
    filters.status.length === 0 &&
    filters.type.length === 0 &&
    !filters.title;
  const showEmptyPage = status === 'success' && !requestList.length;

  const urgentRequests = (requestList ?? []).filter(
    (payload) => payload.priority === 'urgent',
  );
  const standardRequests = (requestList ?? []).filter(
    (payload) => payload.priority === 'standard',
  );

  useEffect(() => {
    if (!queryParams?.tab) {
      setTabs((prev) =>
        prev.map((item) => ({
          ...item,
          isTabActive: item.title === 'Dashboard',
        })),
      );
      setQueryParams({ tab: 'dashboard' });
    }
  }, [queryParams?.tab]);
  return (
    <RequestAgent
      textName={getFullName(recruiterUser.first_name, '')}
      textTopStatus={`Your top priorities as of ${dayjsLocal().add(-1, 'day').format('MMM D, YYYY')}`}
      slotTabs={
        <>
          {(!showEmptyPage || !isNotApplied) &&
            tabs.map(({ title, isTabActive, pathName }, i) => {
              return (
                <RequestAgentTab
                  onClickTab={{
                    onClick: () => {
                      setTabs((prev) =>
                        prev.map((item) => ({
                          ...item,
                          isTabActive: item.title === title,
                        })),
                      );
                      setQueryParams({ tab: pathName });
                    },
                  }}
                  key={i}
                  textTab={title}
                  isTabActive={isTabActive}
                />
              );
            })}
        </>
      }
      slotFilter={(!showEmptyPage || !isNotApplied) && <FilterAndSorting />}
      slotRequestOption={<StatsCards />}
      slotRequestSection={
        <ShowCode>
          <ShowCode.When isTrue={showEmptyPage && isNotApplied}>
            <RequestAgentEmpty />
          </ShowCode.When>
          <ShowCode.When isTrue={queryParams.tab === 'requests'}>
            <ShowCode>
              <ShowCode.When
                isTrue={
                  status === 'success' &&
                  urgentRequests.length === 0 &&
                  standardRequests.length === 0
                }
              >
                <NoPendingReq />
              </ShowCode.When>

              <>
                <Section requests={urgentRequests} priority='urgent' />
                <Section requests={standardRequests} priority='standard' />
              </>
            </ShowCode>
          </ShowCode.When>
          <ShowCode.When isTrue={queryParams.tab === 'dashboard'}>
            <>Dashboard</>
          </ShowCode.When>
          <ShowCode.When isTrue={queryParams.tab === 'metrics'}>
            <>Metrics</>
          </ShowCode.When>
        </ShowCode>
      }
      slotAglintAiChat={
        <AgentIEditorProvider>
          <AgentChats />
        </AgentIEditorProvider>
      }
    />
  );
};

export default Requests;
