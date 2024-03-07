import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Breadcrum, PageLayout } from '@/devlink2';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabase/client';

import NotScheduledApplication from './NotScheduled';
import PendingConfirmed from './PendingConfirmed';
import {
  setDateRange,
  setInitalLoading,
  setInterviewModules,
  setMembers,
  setScheduleName,
  setSelectedApplication,
  useSchedulingApplicationStore
} from './store';
import { ApplicationList } from '../store';

function SchedulingApplication() {
  const router = useRouter();
  const currentDate = dayjs();
  const threeDays = currentDate.add(3, 'day');
  const selectedApplication = useSchedulingApplicationStore(
    (state) => state.selectedApplication
  );
  const scheduleName = useSchedulingApplicationStore(
    (state) => state.scheduleName
  );
  const initialLoading = useSchedulingApplicationStore(
    (state) => state.initialLoading
  );

  useEffect(() => {
    if (router.isReady && router.query.application_id) {
      fetchInterviewDataByApplication();
    }
  }, [router]);

  useEffect(() => {
    return () => {
      setSelectedApplication(null);
    };
  }, []);

  const fetchInterviewDataByApplication = async () => {
    try {
      const { data, error } = await supabase.rpc(
        'fetch_interview_data_by_application_id',
        {
          app_id: router.query.application_id as string
        }
      );

      if (!error && data.length > 0) {
        const application = data[0] as ApplicationList;
        setScheduleName(
          `Interview for ${application?.public_jobs?.job_title} - ${application?.candidates?.first_name}`
        );
        setDateRange({
          start_date: currentDate.toISOString(),
          end_date: threeDays.toISOString()
        });
        const moduleIds = application?.public_jobs?.interview_plan?.plan
          ?.filter((plan) => !plan.isBreak)
          ?.map((plan) => plan.module_id);

        if (moduleIds?.length > 0) {
          const { data: modules, error: moduleError } = await supabase
            .from('interview_modules')
            .select('*')
            .in('id', moduleIds);

          if (!moduleError) {
            setInterviewModules(modules);
          }
        }
        let userIds = [];
        application?.public_jobs?.interview_plan?.plan.map((plan) => {
          plan.selectedIntervs.map((interv) => {
            userIds.push(interv.interv_id);
          });
        });

        const resMem = await axios.post('/api/scheduling/fetchdbusers', {
          user_ids: userIds
        });

        if (resMem?.data?.length > 0) {
          setMembers(resMem.data);
        }

        setInitalLoading(false);
        setSelectedApplication(application);
      }
    } catch (error) {
      //
    } finally {
      //
    }
  };

  return (
    <>
      <PageLayout
        onClickBack={{
          onClick: () => {
            router.push(`${pageRoutes.SCHEDULING}?tab=allSchedules`);
          }
        }}
        isBackButton={true}
        slotTopbarLeft={
          <>
            <Breadcrum textName={scheduleName} />
          </>
        }
        slotBody={
          !initialLoading &&
          (!selectedApplication?.schedule ? (
            <NotScheduledApplication />
          ) : (
            <PendingConfirmed />
          ))
        }
        slotTopbarRight={''}
      />
    </>
  );
}

export default SchedulingApplication;
