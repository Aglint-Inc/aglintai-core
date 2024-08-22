import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { NavigationPill } from '@/devlink2/NavigationPill';
import { RequestAgentEmpty } from '@/devlink2/RequestAgentEmpty';
import { RequestsWrapper } from '@/devlink2/RequestsWrapper';
import { IconButtonSoft } from '@/devlink3/IconButtonSoft';
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
  const [openChat, setOpenChat] = useState(
    localStorage.getItem('openChat') === 'true' ? true : false,
  );

  useEffect(() => {
    setOpenChat(localStorage.getItem('openChat') === 'true' ? true : false);
  }, [localStorage.getItem('openChat')]);
  return (
    <>
      <Stack
        onClick={() => {
          if (openChat) {
            localStorage.setItem('openChat', 'false');
          } else {
            localStorage.setItem('openChat', 'true');
          }
          setOpenChat(!openChat);
        }}
        position={'absolute'}
        top={'14px'}
        left={'58px'}
        right={0}
        width={'50px'}
        zIndex={9999}
        bgcolor={'white'}
        pl={'20px'}
      >
        <IconButtonSoft
          iconName={openChat ? <DockToRightFilled /> : 'dock_to_right'}
          color={'neutral'}
          size={1}
          iconSize={4}
        />
      </Stack>
      <Stack direction='row' width={'100%'}>
        <AgentIEditorProvider>
          <Stack
            sx={{
              width: openChat ? '450px' : '0px',
              opacity: openChat ? 1 : 0,
              transform: openChat ? 'translateX(0)' : 'translateX(-450px)',
              transition: openChat ? 'all 0.3s ease-in' : 'all 0.3s ease-out',
            }}
            direction={'row'}
            justifyContent={'start'}
            alignItems={'end'}
          >
            <AgentChats />
          </Stack>
        </AgentIEditorProvider>

        <Stack
          width={openChat ? 'calc(100% - 400px)' : '100%'}
          sx={{
            transition: openChat ? 'all 0.3s ease-in' : 'all 0.3s ease-out',
          }}
        >
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
                    <Stack
                      direction={'row'}
                      justifyContent={'space-between'}
                      ml={!openChat ? '28px' : '0px'}
                      width={'100%'}
                    >
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
                    </Stack>
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
        </Stack>
      </Stack>
    </>
  );
};

export default Requests;

function DockToRightFilled() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='16px'
      viewBox='0 -960 960 960'
      width='16px'
      fill='#080800A1'
      style={{
        padding: '0px',
      }}
    >
      <path d='M180-120q-24.75 0-42.37-17.63Q120-155.25 120-180v-600q0-24.75 17.63-42.38Q155.25-840 180-840h600q24.75 0 42.38 17.62Q840-804.75 840-780v600q0 24.75-17.62 42.37Q804.75-120 780-120H180Zm207-60h393v-600H387v600Z' />
    </svg>
  );
}
