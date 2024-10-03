import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { BriefcaseBusiness, Home, MapPin, User } from 'lucide-react';
import { useEffect } from 'react';

import { useTenant } from '@/company/hooks';
import { Loader } from '@/components/Common/Loader';
import { UIAlert } from '@/components/Common/UIAlert';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import { useScheduleDetails } from '../hooks/useScheduleDetails';
import { setSessionUser } from '../stores';
import Banners from './Banners';
import ButtonGroup from './ButtonGroup';
import ScheduleDetailsTabs from './Tabs';

function SchedulingViewComp() {
  const { recruiter_user } = useTenant();

  const { data, isLoading } = useScheduleDetails();

  const schedule = data?.schedule_data;
  const job = schedule?.job;

  const confirmedUsers =
    schedule?.users?.filter(
      (user) => user.interview_session_relation.is_confirmed,
    ) ?? [];

  useEffect(() => {
    if (confirmedUsers?.length > 0) {
      setSessionUser(
        confirmedUsers.find(
          (user) => user?.user_details?.email === recruiter_user?.email,
        ) ?? null,
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
      <div className='container-lg mx-auto w-full px-4'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>
                <Home size={16} />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href='/interviewers'>Scheduling</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>
                {schedule?.interview_session?.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className='flex items-start justify-between pt-4'>
          <div className=''>
            <h1 className='text-2xl font-medium text-gray-900'>
              {schedule?.interview_session.name}
            </h1>
            <p className='text-md mt-2 pb-2 text-gray-600'>
              Interview for{' '}
              <a
                href={`/jobs/${job?.id}`}
                target='_blank'
                rel='noopener noreferrer'
                className='hover:underline'
              >
                {job?.job_title}
              </a>{' '}
              - {capitalizeFirstLetter(job?.departments?.name ?? '')}
            </p>
            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
              <div className='flex items-center gap-0.5'>
                <User className='mr-2 h-4 w-4' />
                <span>
                  {schedule?.candidates?.first_name}{' '}
                  {schedule?.candidates?.last_name}
                </span>
              </div>
              {schedule?.candidates?.current_job_title && (
                <div className='flex items-center gap-0.5'>
                  <BriefcaseBusiness className='h-4 w-4' />
                  <span className='ml-2'>
                    {schedule?.candidates?.current_job_title}
                  </span>
                </div>
              )}
              {schedule?.candidates?.city && (
                <div className='flex items-center gap-0.5'>
                  <MapPin className='h-4 w-4' />
                  <span className='ml-2'>{schedule?.candidates.city}</span>
                </div>
              )}
            </div>
          </div>
          <ButtonGroup />
        </div>
        <Banners />
        {data?.schedule_data ? (
          <div className='mt-4'>
            <ScheduleDetailsTabs />
          </div>
        ) : (
          <div className='p-2'>
            <UIAlert title={'Meeting Not Found'} iconName={'Calendar'} />
          </div>
        )}
      </div>
    </>
  );
}

export default SchedulingViewComp;
