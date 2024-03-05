import { useRouter } from 'next/router';
import { useState } from 'react';

import { BodyWithSublink, PageLayout } from '@/devlink2';
import { ButtonPrimaryDefaultRegular } from '@/devlink3';

import InterviewComp from './AllSchedules';
import InterviewerComp from './Interviewer';
import { Modules } from './Modules/Modules';
import { setIsCreateDialogOpen } from './Modules/store';
import SchedulingEmailTemplates from './SchedulingEmailTemplates';
import SettingsScheduling from './Settings';
import SubNav from './SubNav';
import Icon from '../Common/Icons/Icon';
import SyncStatus from '../JobsDashboard/JobPostCreateUpdate/JobPostFormSlides/SyncStatus';

function SchedulingMainComp() {
  const router = useRouter();
  const [saving, setSaving] = useState<'saving' | 'saved'>('saved');

  return (
    <>
      <PageLayout
        slotSaving={<SyncStatus status={saving} />}
        slotTopbarRight={
          <>
            {router.query.tab == 'interviewModules' && (
              <ButtonPrimaryDefaultRegular
                startIconSlot={
                  <Icon
                    variant='PlusThin'
                    height='12'
                    width='12'
                    color='#fff'
                  />
                }
                buttonText={'New Module'}
                buttonProps={{
                  onClick: () => {
                    setIsCreateDialogOpen(true);
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
                <SettingsScheduling setSaving={setSaving} />
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
