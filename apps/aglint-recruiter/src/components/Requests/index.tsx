import { useEffect } from 'react';

import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { NavigationPill } from '@/devlink2/NavigationPill';
import { RequestAgent } from '@/devlink2/RequestAgent';
import { RequestAgentEmpty } from '@/devlink2/RequestAgentEmpty';
import { RequestsWrapper } from '@/devlink2/RequestsWrapper';
import { useRequests } from '@/src/context/RequestsContext';
import { useRouterPro } from '@/src/hooks/useRouterPro';
import { SafeObject } from '@/src/utils/safeObject';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import Loader from '../Common/Loader';
import { ShowCode } from '../Common/ShowCode';
import AgentChats from './AgentChats';
import { AgentIEditorProvider } from './AgentChats/AgentEditorContext';
import Dashboard from './Dashboard';
import FilterAndSorting from './FiltersAndSorting';
import RequestSections, { sectionDefaultsData } from './RequestSections';

const Requests = () => {
  const { setQueryParams, queryParams } = useRouterPro();
  const { tab, section } = queryParams;

  const {
    requests: { isRefetching, data: requestList, isPlaceholderData },
    filters,
  } = useRequests();
  const isNotApplied =
    !filters.is_new &&
    filters.status.length === 0 &&
    filters.type.length === 0 &&
    !filters.title &&
    !filters.created_at &&
    filters.jobs.length === 0;

  const showEmptyPage =
    !isPlaceholderData &&
    Boolean(
      !(SafeObject.values(requestList) ?? []).flatMap((requests) => requests)
        .length,
    );
  useEffect(() => {
    if (!queryParams?.tab) {
      setQueryParams({ tab: 'dashboard' });
    }
  }, [tab, queryParams]);

  useEffect(() => {
    document.querySelector('#outer-div') &&
      document.querySelector('#outer-div').addEventListener('scroll', () => {
        showMatchingDivs(getHiddenDivs());
      });

    if (!isRefetching) {
      const hiddenDivs = getHiddenDivs();
      showMatchingDivs(hiddenDivs);

      gotoSection();
      const targetSection = document.querySelector(
        `[data-req-section=${section}]`,
      );
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
        });
      }
      // setQueryParams({ section: '' });
    }
  }, [section]);

  function showMatchingDivs(hiddenDivs) {
    const buttons = document.querySelectorAll('[data-req-button]');
    if (hiddenDivs.length === 0) {
      buttons.forEach((button: any) => {
        const buttonSection = button.getAttribute('data-req-button');

        if (buttonSection === 'back') {
          button.style.display = 'flex';
        } else {
          button.style.display = 'none';
        }
      });
    } else {
      buttons.forEach((button: any) => {
        const buttonSection = button.getAttribute('data-req-button');
        if (hiddenDivs.includes(buttonSection)) {
          button.style.display = 'flex';
        } else {
          button.style.display = 'none';
        }
        if (buttonSection === 'back') {
          button.style.display = 'none';
        }
      });
    }
  }
  function getHiddenDivs() {
    const container = document.querySelector('#outer-div');
    const divs = container && container.querySelectorAll('[data-req-section]');
    const hiddenDivs = [];
    divs &&
      divs.forEach((div) => {
        const rect = div.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        if (rect.top >= containerRect.bottom - 200) {
          hiddenDivs.push(div.getAttribute('data-req-section'));
        }
      });

    return hiddenDivs;
  }
  function gotoSection() {
    document.querySelectorAll('[data-req-button]').forEach((button) => {
      button.addEventListener('click', function () {
        const sectionValue = this.getAttribute('data-req-button');
        if (sectionValue === 'back') {
          const targetSection = document.querySelector(
            `[data-req-section=${'urgent_request'}]`,
          );
          if (targetSection) {
            targetSection.scrollIntoView({
              behavior: 'smooth',
            });
          }
        } else {
          const targetSection = document.querySelector(
            `[data-req-section=${sectionValue}]`,
          );
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }
  return (
    <RequestAgent
      slotRequest={
        <ShowCode>
          <ShowCode.When isTrue={isPlaceholderData && isNotApplied}>
            <Loader />
          </ShowCode.When>
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
                    {<FilterAndSorting />}
                  </>
                }
                slotRequestSection={<RequestSections />}
                slotNavigationPills={
                  <>
                    {Object.entries(requestList ?? {}).map(
                      ({ '0': item, '1': value }, i) => (
                        <NavigationPill
                          attributeValue={item}
                          textCount={value.length}
                          key={item}
                          iconName={
                            sectionDefaultsData[Number(i)].sectionIconName
                          }
                          onClickPill={{
                            onClick: () => {
                              gotoSection();
                            },
                          }}
                          textPill={capitalizeFirstLetter(item)}
                        />
                      ),
                    )}
                    <NavigationPill
                      showNumberCount={false}
                      attributeValue={'back'}
                      textCount={''}
                      iconName={'arrow_warm_up'}
                      onClickPill={{
                        onClick: gotoSection,
                      }}
                      textPill={capitalizeFirstLetter('back_to_top')}
                    />
                  </>
                }
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
