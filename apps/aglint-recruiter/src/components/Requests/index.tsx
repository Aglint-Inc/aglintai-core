import { getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { useEffect, useState } from 'react';

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
  const [tabs, setTabs] = useState([
    { title: 'Requests', isTabActive: true, pathName: '/requests' },
    { title: 'Dashboard', isTabActive: false, pathName: '/dashboard' },
    { title: 'Metrics', isTabActive: false, pathName: '/metrics' },
  ]);

  const {
    requests: { status, data: requestList },
  } = useRequests();
  const { setQueryParams, queryParams } = useRouterPro();
  useEffect(() => {
    if (!queryParams?.tab) {
      setQueryParams({ tab: 'Requests' });
    }
  }, [queryParams?.tab]);
  const showEmptyPage = status === 'success' && !requestList.length;
  return (
    <RequestAgent
      textName={getFullName(recruiterUser.first_name, '')}
      textTopStatus={`Your top priorities as of ${dayjsLocal().add(-1, 'day').format('MMM D, YYYY')}`}
      slotTabs={
        <>
          {!showEmptyPage &&
            tabs.map(({ title, isTabActive }, i) => {
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
                      setQueryParams({ tab: title });
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
      slotFilter={!showEmptyPage && <FilterAndSorting />}
      slotRequestOption={<StatsCards />}
      slotRequestSection={
        <ShowCode>
          <ShowCode.When isTrue={showEmptyPage}>
            <>
              <RequestAgentEmpty />
            </>
          </ShowCode.When>
          <ShowCode.When isTrue={queryParams.tab === 'Requests'}>
            <>
              <Section priority='urgent' />
              <Section priority='standard' />
            </>
          </ShowCode.When>
          <ShowCode.When isTrue={queryParams.tab === 'Dashboard'}>
            <>Dashboard</>
          </ShowCode.When>
          <ShowCode.When isTrue={queryParams.tab === 'Metrics'}>
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
