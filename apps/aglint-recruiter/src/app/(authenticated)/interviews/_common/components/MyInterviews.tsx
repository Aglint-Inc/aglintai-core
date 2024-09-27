import { type DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { EmptyState } from '@components/empty-state';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { AlertTriangle, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { transformDataSchedules } from 'src/app/_common/utils/schedules-query';

import { useAllIntegrations } from '@/authenticated/hooks';
import { Loader } from '@/components/Common/Loader';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';

import {
  getInterviewsCountByUserId,
  useInterviewsByUserId,
} from '../hooks/useInterviewsByUserId';
import { InterviewMemberSide } from './ui/InterviewMemberSide';
import { NewMyScheduleCard } from './ui/NewMyScheduleCard';
import ScheduleMeetingCard from './ui/ScheduleMeetingCard';

function MyInterviews() {
  const { recruiterUser } = useAuthDetails();
  const [filter, setFilter] =
    useState<DatabaseTable['interview_meeting']['status']>('confirmed');
  // const [changeText, setChangeText] = useState('');
  const [counts, setCounts] = useState({
    upcomingCount: 0,
    completedCount: 0,
    cancelledCount: 0,
  });

  useEffect(() => {
    (async () => {
      const res = await getInterviewsCountByUserId(
        recruiterUser?.user_id ?? '',
      );
      setCounts(res);
    })();
  }, []);

  const { data, isFetched: scheduleFetched } = useInterviewsByUserId({
    filter,
    member_id: recruiterUser?.user_id ?? '',
  });
  const schedules = data?.schedules ?? [];
  const allSchedules = schedules;
  const { data: allIntegrations, isLoading: integrationLoading } =
    useAllIntegrations();

  return (!!allIntegrations?.service_json &&
    allIntegrations?.google_workspace_domain?.split('//')[1] ===
      recruiterUser?.email.split('@')[1]) ||
    !!(recruiterUser?.schedule_auth as any)?.access_token ? (
    <>
      <InterviewMemberSide
        propsGrids={{ style: { maxWidth: 'none' } }}
        slotInterview={
          <></>
          // <SearchField
          //   value={changeText}
          //   onChange={(e) => {
          //     setChangeText(e.target.value);
          //   }}
          //   onClear={() => setChangeText('')}
          //   placeholder={'Search by session name'}
          // />
        }
        isUpcomingActive={filter === 'confirmed'}
        isCancelActive={filter === 'cancelled'}
        isCompletedActive={filter === 'completed'}
        textUpcomingCount={counts.upcomingCount}
        textCancelledCount={counts.cancelledCount}
        textPastCount={counts.completedCount}
        onClickUpcoming={{
          onClick: () => setFilter('confirmed'),
        }}
        onClickCancelled={{
          onClick: () => setFilter('cancelled'),
        }}
        onClickCompleted={{
          onClick: () => setFilter('completed'),
        }}
        slotInterviewCard={
          <>
            {!scheduleFetched && (
              <div className='flex h-20 items-center justify-center'>
                <Loader className='h-8 w-8 animate-spin' />
              </div>
            )}
            {scheduleFetched &&
              allSchedules.length > 0 &&
              transformDataSchedules(allSchedules).map((sch, ind) => {
                const date = Object.keys(sch)[0];
                const schedules = sch[String(date)];
                return (
                  <NewMyScheduleCard
                    key={ind}
                    textDate={
                      date != 'undefined' ? dayjsLocal(date).format('DD') : ''
                    }
                    textDay={
                      date != 'undefined' ? dayjsLocal(date).format('ddd') : ''
                    }
                    textMonth={
                      date != 'undefined' ? (
                        dayjsLocal(date).format('MMM')
                      ) : (
                        <Calendar size={20} />
                      )
                    }
                    slotMyScheduleSubCard={schedules.map(
                      (meetingDetails, i) => {
                        return (
                          <ScheduleMeetingCard
                            key={i}
                            meetingDetails={meetingDetails}
                          />
                        );
                      },
                    )}
                  />
                );
              })}
            {scheduleFetched && allSchedules.length === 0 && (
              <EmptyState
                module='interviews'
                title='No interviews found'
                description='There are no upcoming interviews.'
              />
            )}
          </>
        }
      />
    </>
  ) : (
    <IntegrationNotFound loading={integrationLoading} />
  );
}

export default MyInterviews;

function IntegrationNotFound({ loading }: { loading: boolean }) {
  const { recruiterUser } = useAuthDetails();
  return (
    <Card className='mb-6'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg font-semibold'>My Interviews</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className='flex h-full flex-col'>
          <div className='max-w-900px flex h-full flex-col gap-2.5 overflow-auto'>
            {loading ? (
              <div className='flex h-20 w-full items-center justify-center'>
                <Loader className='h-8 w-8 animate-spin' />
              </div>
            ) : (
              <Alert variant='warning'>
                <AlertTriangle className='h-4 w-4' />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Your calendar is not connected to the scheduling app. Please
                  <Link href={`/user/${recruiterUser?.user_id}`}>
                    connect it in your profile settings.
                  </Link>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
