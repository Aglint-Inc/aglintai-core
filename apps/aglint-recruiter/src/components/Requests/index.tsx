import { getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { useEffect } from 'react';

import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { NoPendingReq } from '@/devlink2/NoPendingReq';
import { RequestAgent } from '@/devlink2/RequestAgent';
import { RequestAgentEmpty } from '@/devlink2/RequestAgentEmpty';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useRequests } from '@/src/context/RequestsContext';
import { useRouterPro } from '@/src/hooks/useRouterPro';

import { ShowCode } from '../Common/ShowCode';
import AgentChats from './AgentChats';
import { AgentIEditorProvider } from './AgentChats/AgentEditorContext';
import Dashboard from './Dashboard';
import FilterAndSorting from './FiltersAndSorting';
import Section from './Section';
import StatsCards from './StatsCards';

const Requests = () => {
  const { recruiterUser } = useAuthDetails();
  const { setQueryParams, queryParams } = useRouterPro();

  const {
    requests: { status, data: requestList },
    filters,
    setFilters,
    initialFilter,
  } = useRequests();
  const isNotApplied =
    !filters.is_new &&
    filters.status.length === 0 &&
    filters.type.length === 0 &&
    !filters.title &&
    !filters.created_at;

  const showEmptyPage = status === 'success' && !requestList?.length;

  const urgentRequests = (requestList ?? []).filter(
    (payload) => payload.priority === 'urgent',
  );
  const standardRequests = (requestList ?? []).filter(
    (payload) => payload.priority === 'standard',
  );

  useEffect(() => {
    if (!queryParams?.tab) {
      setQueryParams({ tab: 'dashboard' });
    } else if (queryParams.tab !== 'requests') {
      setFilters(structuredClone(initialFilter));
    }
  }, [queryParams?.tab]);
  return (
    <RequestAgent
      isFilterVisible={queryParams.tab === 'requests'}
      textName={getFullName(recruiterUser.first_name, '')}
      textTopStatus={`Your top priorities as of ${dayjsLocal().add(-1, 'day').format('MMM D, YYYY')}`}
      slotTabs={
        queryParams.tab === 'requests' ? (
          <ButtonSoft
            size={1}
            color={'neutral'}
            isLeftIcon={true}
            iconName={'arrow_back'}
            textButton='Dashboard'
            onClickButton={{
              onClick: () => setQueryParams({ tab: 'dashboard', query: '' }),
            }}
          />
        ) : (
          <></>
        )
      }
      slotFilter={
        queryParams.tab === 'requests' &&
        (!showEmptyPage || !isNotApplied) && <FilterAndSorting />
      }
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
            <Dashboard />
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
