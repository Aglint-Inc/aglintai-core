import { useEffect } from 'react';

import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { RequestAgent } from '@/devlink2/RequestAgent';
import { RequestAgentEmpty } from '@/devlink2/RequestAgentEmpty';
import { RequestsWrapper } from '@/devlink2/RequestsWrapper';
import { useRequests } from '@/src/context/RequestsContext';
import { useRouterPro } from '@/src/hooks/useRouterPro';
import { SafeObject } from '@/src/utils/safeObject';

import { ShowCode } from '../Common/ShowCode';
import AgentChats from './AgentChats';
import { AgentIEditorProvider } from './AgentChats/AgentEditorContext';
import Dashboard from './Dashboard';
import FilterAndSorting from './FiltersAndSorting';
import RequestSections from './RequestSections';

const Requests = () => {
  const { setQueryParams, queryParams } = useRouterPro();

  const {
    requests: { status, data: requestList },
    filters,
    setFilters,
    setSections,
    initialSections,
    initialFilter,
  } = useRequests();
  const isNotApplied =
    !filters.is_new &&
    filters.status.length === 0 &&
    filters.type.length === 0 &&
    !filters.title &&
    !filters.created_at;

  const showEmptyPage =
    status === 'success' &&
    !(SafeObject.values(requestList) ?? []).flatMap((requests) => requests)
      .length;

  useEffect(() => {
    if (!queryParams?.tab) {
      setQueryParams({ tab: 'dashboard' });
    } else if (queryParams.tab !== 'requests') {
      setFilters(structuredClone(initialFilter));
      setSections(structuredClone(initialSections));
    }
  }, [queryParams?.tab]);

  return (
    <RequestAgent
      slotRequest={
        <ShowCode>
          <ShowCode.When isTrue={showEmptyPage && isNotApplied}>
            <RequestAgentEmpty />
          </ShowCode.When>
          <ShowCode.When isTrue={queryParams.tab === 'requests'}>
            <ShowCode>
              <RequestsWrapper
                slotFilter={
                  <>
                    <ButtonSoft
                      size={1}
                      color={'neutral'}
                      isLeftIcon={true}
                      iconName={'arrow_back'}
                      textButton='Dashboard'
                      onClickButton={{
                        onClick: () =>
                          setQueryParams({ tab: 'dashboard', section: '' }),
                      }}
                    />
                    {(!showEmptyPage || !isNotApplied) && <FilterAndSorting />}
                  </>
                }
                slotRequestSection={<RequestSections />}
              />
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
