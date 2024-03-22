import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Breadcrum, PageLayout } from '@/devlink2';
import Loader from '@/src/components/Common/Loader';

import DeleteScheduleDialog from './Common/DeleteDialog';
import RescheduleDialog from './Common/RescheduleDialog';
import ConfirmedComp from './Confirmed';
import { useGetScheduleApplication } from './hooks';
import NotScheduledApplication from './NotScheduled';
import PendingConfirmed from './Pending';
import {
  resetSchedulingApplicationState,
  useSchedulingApplicationStore,
} from './store';

function SchedulingApplication() {
  const router = useRouter();
  const selectedApplication = useSchedulingApplicationStore(
    (state) => state.selectedApplication,
  );
  const scheduleName = useSchedulingApplicationStore(
    (state) => state.scheduleName,
  );
  const fetchingSchedule = useSchedulingApplicationStore(
    (state) => state.fetchingSchedule,
  );

  const { fetchInterviewDataByApplication } = useGetScheduleApplication();

  useEffect(() => {
    if (router.isReady && router.query.application_id) {
      fetchInterviewDataByApplication();
    }
    return () => {
      resetSchedulingApplicationState();
    };
  }, [router]);

  return (
    <>
      <DeleteScheduleDialog />
      <RescheduleDialog />
      <PageLayout
        onClickBack={{
          onClick: () => {
            window.history.back();
          },
        }}
        isBackButton={true}
        slotTopbarLeft={
          <>
            <Breadcrum textName={scheduleName} />
          </>
        }
        slotBody={
          <>
            {!fetchingSchedule ? (
              !selectedApplication?.schedule ||
              selectedApplication.schedule.status == 'reschedule' ? (
                <NotScheduledApplication />
              ) : selectedApplication?.schedule.status == 'pending' ? (
                <PendingConfirmed />
              ) : (
                // confirmed and cancelled and completed same component
                <ConfirmedComp />
              )
            ) : (
              <Loader />
            )}
          </>
        }
        slotTopbarRight={''}
      />
    </>
  );
}

export default SchedulingApplication;
