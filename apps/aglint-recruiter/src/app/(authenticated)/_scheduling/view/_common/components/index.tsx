import { useEffect } from 'react';

import { Loader } from '@/components/Common/Loader';
import { UIAlert } from '@/components/Common/UIAlert';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';
import { WorkflowConnectedCard } from '@/workflow/components/WorkflowConnectedCard';

import { useScheduleDetails } from '../hooks/useScheduleDetails';
import { setSessionUser } from '../stores';
import Banners from './Banners';
import ButtonGroup from './ButtonGroup';
import Requests from './Requests';
import ScheduleDetailsTabs from './Tabs';

function SchedulingViewComp() {
  const { recruiterUser } = useAuthDetails();
  const { checkPermissions } = useRolesAndPermissions();
  const { data, isLoading } = useScheduleDetails();

  const schedule = data?.schedule_data;
  const job = schedule?.job;

  const confirmedUsers = schedule?.users?.filter(
    (user) => user.interview_session_relation.is_confirmed,
  );

  useEffect(() => {
    if (confirmedUsers?.length > 0) {
      setSessionUser(
        confirmedUsers.find(
          (user) => user.user_details.email === recruiterUser.email,
        ),
      );
    }
  }, [confirmedUsers]);

  if (isLoading)
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <Loader />
      </div>
    );

  return (
    <>
      <div className='container-lg mx-auto w-full px-12'>
        <div className=''>
          <div className='flex flex-row justify-between'>
            <h1 className='mb-8 text-xl font-bold text-gray-900'>
              {schedule.interview_session.name}
            </h1>
            <ButtonGroup />
          </div>

          <div className='flex justify-between space-x-8'>
            <div className='w-full'>
              <div className='flex flex-col space-y-2 pb-4'>
                <Banners />
              </div>
              {data?.schedule_data ? (
                <ScheduleDetailsTabs />
              ) : (
                <div className='p-2'>
                  <UIAlert title={'Meeting Not Found'} iconName={'Calendar'} />
                </div>
              )}
            </div>

            {checkPermissions(['scheduling_actions']) && (
              <div className='min-w-[350px] space-y-4'>
                <div className='flex flex-col space-y-2'>
                  <p className='font-medium'>Job</p>

                  <WorkflowConnectedCard
                    isLinkOffVisible={false}
                    textRoleCategory={
                      capitalizeFirstLetter(job?.departments?.name) || '--'
                    }
                    role={job.job_title || '--'}
                    textLocation={
                      !job.office_locations?.city ||
                      !job.office_locations?.country
                        ? '--'
                        : `${job.office_locations?.city}, ${job.office_locations?.country}`
                    }
                    onClickJob={() => {
                      window.open(
                        `/jobs/${job.id}?section=interview`,
                        '_blank',
                      );
                    }}
                  />
                </div>
                <Requests session_id={schedule?.interview_session?.id} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SchedulingViewComp;
