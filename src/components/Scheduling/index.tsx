import { useRouter } from 'next/router';

import {
  BodyWithSublink,
  PageLayout,
  PanelDashboardTopRight,
} from '@/devlink2';

import InterviewComp from './Interview';
import InterviewerComp from './Interviewer';
import Panels from './Panels';
import { setIsCreateDialogOpen } from './Panels/store';
import SchedulingEmailTemplates from './SchedulingEmailTemplates';
import SettingsScheduling from './Settings';
import SubNav from './SubNav';

function SchedulingMainComp() {
  const router = useRouter();

  return (
    <>
      <PageLayout
        slotTopbarRight={
          <>
            {router.query.tab == 'interviewPanel' && (
              <PanelDashboardTopRight
                onClickCreatePanel={{
                  onClick: () => {
                    setIsCreateDialogOpen('create');
                  },
                }}
              />
            )}
          </>
        }
        slotBody={
          <BodyWithSublink
            slotTabContent={
              router.query.tab == 'allSchedules' ? (
                <InterviewComp />
              ) : router.query.tab == 'mySchedules' ? (
                <InterviewerComp />
              ) : router.query.tab == 'panels' ? (
                <Panels />
              ) : router.query.tab == 'emailTemplates' ? (
                <SchedulingEmailTemplates />
              ) : router.query.tab == 'settings' ? (
                <SettingsScheduling />
              ) : (
                ''
              )
            }
            slotSublinkTab={<SubNav />}
          />
        }
      />
    </>
  );
}

export default SchedulingMainComp;
