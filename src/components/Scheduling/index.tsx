import { InputAdornment, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { BodyWithSublink, PageLayout } from '@/devlink2';
import { ButtonPrimaryDefaultRegular } from '@/devlink3';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { SocialsType } from '@/src/types/data.types';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabase/client';

import AllSchedules from './AllSchedules';
import { Modules } from './Modules/Modules';
import {
  setIsCreateDialogOpen,
  setSearchText,
  useModulesStore
} from './Modules/store';
import MySchedule from './MySchedule';
import SchedulingEmailTemplates from './SchedulingEmailTemplates';
import SettingsScheduling from './Settings';
import { schedulingSettingType } from './Settings/types';
import SubNav from './SubNav';
import Icon from '../Common/Icons/Icon';
import UITextField from '../Common/UITextField';
import InterviewTab from '../CompanyDetailComp/Interviewers';
import SyncStatus from '../JobsDashboard/JobPostCreateUpdate/JobPostFormSlides/SyncStatus';

function SchedulingMainComp() {
  const router = useRouter();
  const { recruiter, setRecruiter, allowAction } = useAuthDetails();
  const [saving, setSaving] = useState<'saving' | 'saved'>('saved');
  const { searchText } = useModulesStore();
  async function updateSettings(schedulingSettingObj: schedulingSettingType) {
    setSaving('saving');

    const { data: updatedRecruiter, error } = await supabase
      .from('recruiter')
      .update({ scheduling_settings: schedulingSettingObj })
      .eq('id', recruiter.id)
      .select()
      .single();
    if (!error) {
      setRecruiter(
        {
          ...updatedRecruiter,
          socials: updatedRecruiter?.socials as unknown as SocialsType
        }!
      );
    }
    setSaving('saved');
  }
  useEffect(() => {
    if (router.isReady && !router.query.tab) {
      router.push(`${pageRoutes.SCHEDULING}?tab=mySchedules`, undefined, {
        shallow: true
      });
    }
  }, [router]);

  return (
    <>
      <PageLayout
        slotSaving={<SyncStatus status={saving} />}
        slotTopbarRight={
          <>
            {router.query.tab == 'interviewModules' && (
              <Stack direction={'row'} alignItems={'center'} spacing={2}>
                <UITextField
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Icon variant='JobSearch' height='14' />
                      </InputAdornment>
                    )
                  }}
                  placeholder='Search by name'
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                  value={searchText}
                  borderRadius={10}
                />

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
              </Stack>
            )}
          </>
        }
        slotBody={
          <BodyWithSublink
            slotTabContent={
              router.query.tab == 'allSchedules' ? (
                allowAction(<AllSchedules />, [
                  'admin',
                  'recruiter',
                  'scheduler'
                ])
              ) : router.query.tab == 'mySchedules' ? (
                <>
                  <MySchedule />
                  {/* <InterviewerComp /> */}
                </>
              ) : router.query.tab == 'interviewModules' ? (
                allowAction(<Modules />, ['admin', 'recruiter', 'scheduler'])
              ) : router.query.tab == 'emailTemplate' ? (
                allowAction(<SchedulingEmailTemplates />, [
                  'admin',
                  'recruiter',
                  'scheduler'
                ])
              ) : router.query.tab == 'interviewers' ? (
                allowAction(<InterviewTab />, [
                  'admin',
                  'recruiter',
                  'scheduler'
                ])
              ) : router.query.tab == 'settings' ? (
                allowAction(
                  <SettingsScheduling
                    updateSettings={updateSettings}
                    initialData={recruiter?.scheduling_settings}
                  />,
                  ['admin', 'recruiter', 'scheduler']
                )
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
