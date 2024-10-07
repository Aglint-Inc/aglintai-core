'use client';

import { TwoColumnPageLayout } from '@components/layouts/two-column-page-layout';
import AgentChats from '@requests/components/AgentChats';
import { AgentIEditorProvider } from '@requests/components/AgentChats/AgentEditorContext';
import MainBody from '@requests/components/MainBody';
import { useEffect, useState } from 'react';

import { useFlags } from '@/company/hooks/useFlags';

function RequestsPage() {
  const { isShowFeature } = useFlags();
  const [openChat, setOpenChat] = useState(false);

  useEffect(() => {
    if (isShowFeature) {
      setOpenChat(
        localStorage.getItem('openChat') === 'true' && isShowFeature('AGENT')
          ? true
          : false,
      );
    }
  }, [isShowFeature]);
  return (
    <TwoColumnPageLayout
      sidebar={
        <AgentIEditorProvider>
          <div
            className={`transition-all duration-300 ease-in-out ${openChat ? 'w-[450px]' : 'w-0'} sticky left-0 top-0 h-screen overflow-hidden`}
          >
            <div className='h-full'>
              <AgentChats />
            </div>
          </div>
        </AgentIEditorProvider>
      }
      sidebarPosition='left'
      sidebarWidth={0}
    >
      <MainBody />
    </TwoColumnPageLayout>
  );
}

export default RequestsPage;
