import { useRouter } from 'next/router';
import { useState } from 'react';

import { BodyWithSublink, PageLayout } from '@/devlink2';

import MySchedule from './MySchedule';
import SchedulingSettings from './Settings';
import SubNav from './SubNav';
import SyncStatus from '../JobsDashboard/JobPostCreateUpdate/JobPostFormSlides/SyncStatus';


function InterviewerScheduling() {
  const [saving, setSaving] = useState<'saving' | 'saved'>('saved');
  const router = useRouter();
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
                <SchedulingSettings setSaving={setSaving} />
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
