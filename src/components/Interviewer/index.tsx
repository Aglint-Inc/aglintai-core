import { useRouter } from 'next/router';
import { useState } from 'react';

import { BodyWithSublink, PageLayout } from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { RecruiterUserType } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabase/client';

import MySchedule from './MySchedule';
import SubNav from './SubNav';
import SyncStatus from '../JobsDashboard/JobPostCreateUpdate/JobPostFormSlides/SyncStatus';
import SchedulingSettings from '../Scheduling/Settings';
import { schedulingSettingType } from '../Scheduling/Settings/types';

function InterviewerScheduling() {
  const { recruiterUser, setRecruiterUser } = useAuthDetails();
  const [saving, setSaving] = useState<'saving' | 'saved'>('saved');
  const router = useRouter();

  async function updateSettings(schedulingSettingObj: schedulingSettingType) {
    setSaving('saving');

    const { data: updatedRecruiterUser, error } = await supabase
      .from('recruiter_user')
      .update({ scheduling_settings: schedulingSettingObj })
      .eq('recruiter_id', recruiterUser.recruiter_id)
      .select()
      .single();
    if (!error) {
      setRecruiterUser(updatedRecruiterUser as RecruiterUserType);
    }
    setSaving('saved');
  }
  return (
    <div>
      <PageLayout
        slotSaving={<SyncStatus status={saving} />}
        slotBody={
          <BodyWithSublink
            slotTabContent={
              router.query.tab == 'mySchedules' ? (
                <>
                  <MySchedule />
                  {/* <InterviewerComp /> */}
                </>
              ) : router.query.tab == 'settings' ? (
                <SchedulingSettings
                  initialData={recruiterUser?.scheduling_settings}
                  updateSettings={updateSettings}
                />
              ) : (
                ''
              )
            }
            slotSublinkTab={<SubNav />}
          />
        }
      />
    </div>
  );
}

export default InterviewerScheduling;
