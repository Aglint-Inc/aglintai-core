import { useRouter } from 'next/router';
import React from 'react';

import { Breadcrum, PageLayout } from '@/devlink2';
import {
  setSelectedSchedule,
  useInterviewerStore
} from '@/src/components/Scheduling/Interviewer/store';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { pageRoutes } from '@/src/utils/pageRouting';

import InterviewerComp from '../../components/Scheduling/Interviewer';

function InterviewerPage() {
  const router = useRouter();
  const { recruiterUser } = useAuthDetails();
  const selectedSchedule = useInterviewerStore(
    (state) => state.selectedSchedule
  );
  return (
    <>
      <PageLayout
        slotTopbarLeft={
          <>
            {recruiterUser.role == 'admin' && (
              <Breadcrum
                isLink={true}
                onClickLink={{
                  onClick: () => {
                    router.push(pageRoutes.SCHEDULING);
                  }
                }}
              />
            )}

            <Breadcrum
              showArrow={recruiterUser.role == 'admin'}
              textName={'My Schedules'}
              isLink={selectedSchedule ? true : false}
              onClickLink={{
                onClick: () => {
                  setSelectedSchedule(null);
                }
              }}
            />

            {selectedSchedule && (
              <Breadcrum
                showArrow
                textName={selectedSchedule?.schedule.schedule_name}
              />
            )}
          </>
        }
        slotBody={<InterviewerComp />}
      />
      {/* <InterviewerScheduling /> */}
    </>
  );
}

export default InterviewerPage;
