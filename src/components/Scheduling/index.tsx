import { useRouter } from 'next/router';

import { ButtonPrimaryRegular } from '@/devlink';
import { BodyWithSublink, PageLayout } from '@/devlink2';

import InterviewComp from './AllSchedules';
import InterviewerComp from './Interviewer';
import Modules from './Modules';
import { setIsCreateDialogOpen } from './Modules/store';
import SchedulingEmailTemplates from './SchedulingEmailTemplates';
import SettingsScheduling from './Settings';
import SubNav from './SubNav';
import Icon from '../Common/Icons/Icon';

function SchedulingMainComp() {
  const router = useRouter();

  return (
    <>
      <PageLayout
        slotTopbarRight={
          <>
            {router.query.tab == 'interviewModules' && (
              <ButtonPrimaryRegular
                isStartIcon={true}
                slotStartIcon={
                  <Icon
                    variant='PlusThin'
                    height='12'
                    width='12'
                    color='#fff'
                  />
                }
                textLabel={'New Module'}
                onClickButton={{
                  onClick: () => {
                    setIsCreateDialogOpen('create');
                  }
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
              ) : router.query.tab == 'interviewModules' ? (
                <Modules />
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
