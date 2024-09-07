import { RequestAgentEmpty } from '@devlink2/RequestAgentEmpty';
import { useEffect, useState } from 'react';

import { useRequests } from '@/context/RequestsContext';
import { useRouterPro } from '@/hooks/useRouterPro';
import { SafeObject } from '@/utils/safeObject';
// import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import AgentChats from './AgentChats';
import { AgentIEditorProvider } from './AgentChats/AgentEditorContext';
import CompletedRequests from './CompletedRequests';
import { useCompletedRequestsStore } from './CompletedRequests/store';
import Dashboard from './Dashboard';
import { Button } from '@components/ui/button';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import RequestSections from './RequestSections';

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
    filters.jobs.length === 0 &&
    filters.applications.length === 0 &&
    filters.assigneeList.length === 0 &&
    filters.assignerList.length === 0;

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

  const { completedMode } = useCompletedRequestsStore();
  return (
    <div className='relative min-h-screen flex'>
      {/* Dock to Right Button */}
      <div className='fixed top-4 left-16 z-50'>
        <Button
          variant='ghost'
          size='sm'
          onClick={() => {
            const newOpenChat = !openChat;
            localStorage.setItem('openChat', newOpenChat.toString());
            setOpenChat(newOpenChat);
          }}
        >
          {openChat ? (
            <PanelLeftClose className='h-6 w-6' />
          ) : (
            <PanelLeftOpen className='h-6 w-6' />
          )}
        </Button>
      </div>

      {/* AgentIEditorProvider Section */}
      <AgentIEditorProvider>
        <div
          className={`
            transition-all duration-300 ease-in-out
            ${openChat ? 'w-[450px]' : 'w-0'}
            overflow-hidden h-screen
          `}
        >
          <div className='h-full sticky top-0 z-998'>
            <AgentChats />
          </div>
        </div>
      </AgentIEditorProvider>

      {/* Main Content */}
      <div
        className={`flex-1 p-4 overflow-y-auto z-999 ${openChat ? 'w-[calc(100%-450px)]' : 'w-full'}`}
      >
        {showEmptyPage && isNotApplied ? (
          <RequestAgentEmpty />
        ) : completedMode ? (
          <CompletedRequests />
        ) : queryParams.tab === 'dashboard' ? (
          <Dashboard />
        ) : (
          <RequestSections />
        )}
      </div>
    </div>
  );
};

export default Requests;
