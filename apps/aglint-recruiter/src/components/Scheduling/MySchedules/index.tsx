import { type DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { useToast } from '@components/hooks/use-toast';
import { Button } from '@components/ui/button';
import { InterviewMemberSide } from '@devlink2/InterviewMemberSide';
import { NewMyScheduleCard } from '@devlink3/NewMyScheduleCard';
import axios from 'axios';
import { Calendar, Loader2 } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useAllIntegrations } from '@/queries/intergrations';

import SearchField from '../../Common/SearchField/SearchField';
import { ShowCode } from '../../Common/ShowCode';
import ScheduleMeetingCard from '../Common/ModuleSchedules/ScheduleMeetingCard';
import {
  fetchSchedulesCountByUserId,
  useAllSchedulesByUserId,
} from '../Interviewers/InterviewerDetail/query';
import { transformDataSchedules } from '../schedules-query';

function MySchedule() {
  const { toast } = useToast();
  const { recruiterUser } = useAuthDetails();
  const [filter, setFilter] =
    useState<DatabaseTable['interview_meeting']['status']>('confirmed');
  const [changeText, setChangeText] = useState('');
  const [counts, setCounts] = useState({
    upcomingCount: 0,
    completedCount: 0,
    cancelledCount: 0,
  });

  useEffect(() => {
    (async () => {
      const res = await fetchSchedulesCountByUserId(recruiterUser.user_id);
      setCounts(res);
    })();
  }, []);

  const router = useRouter();

  const getConsent = async () => {
    try {
      localStorage.setItem(
        'gmail-redirect-path',
        `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling?tab=my_interviews`,
      );
      const { data } = await axios.get('/api/scheduling/google-consent');

      return router.push(data);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong. Please try again.',
      });
    }
  };

  const {
    data: { schedules: allSchedules },
    isLoading: scheduleLoading,
  } = useAllSchedulesByUserId({
    filter,
    member_id: recruiterUser.user_id,
  });

  const { data: allIntegrations, isLoading: integrationLoading } =
    useAllIntegrations();

  if (scheduleLoading || integrationLoading)
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <Loader2 className='w-8 h-8 animate-spin' />
      </div>
    );

  return (
    <>
      <ShowCode>
        <ShowCode.When
          isTrue={
            (!!allIntegrations?.service_json &&
              allIntegrations?.google_workspace_domain?.split('//')[1] ===
                recruiterUser.email.split('@')[1]) ||
            !!(recruiterUser.schedule_auth as any)?.access_token
          }
        >
          <InterviewMemberSide
            propsGrids={{ style: { maxWidth: 'none' } }}
            slotInterview={
              <SearchField
                value={changeText}
                onChange={(e) => {
                  setChangeText(e.target.value);
                }}
                onClear={() => setChangeText('')}
                placeholder={'Search by session name'}
              />
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
                {scheduleLoading ? (
                  ''
                ) : allSchedules.length === 0 ? (
                  <div className='flex flex-col items-center justify-center p-8 text-center'>
                    <Calendar className='w-12 h-12 text-gray-400 mb-2' />
                    <h3 className='text-lg font-medium text-gray-900 mb-1'>
                      No schedule found
                    </h3>
                    <p className='text-sm text-gray-500'>
                      There are no schedules available at the moment.
                    </p>
                  </div>
                ) : (
                  <>
                    {transformDataSchedules(allSchedules).map((sch, ind) => {
                      const date = Object.keys(sch)[0];
                      const schedules = sch[String(date)];
                      return (
                        <NewMyScheduleCard
                          key={ind}
                          textDate={
                            date != 'undefined'
                              ? dayjsLocal(date).format('DD')
                              : null
                          }
                          textDay={
                            date != 'undefined'
                              ? dayjsLocal(date).format('ddd')
                              : null
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
                  </>
                )}
              </>
            }
          />
        </ShowCode.When>
        <ShowCode.Else>
          <div className='p-4 border rounded-md bg-white shadow-md'>
            {recruiterUser.schedule_auth ? (
              <div>
                <p className='text-lg font-semibold'>
                  Connected to {recruiterUser.schedule_auth.email}
                </p>
              </div>
            ) : (
              <div>
                <p className='text-lg font-semibold'>
                  Connect your Google Calendar
                </p>
                <p className='text-sm text-gray-500 mt-2'>
                  To manage your schedules, please connect your Google Calendar
                  via OAuth.
                </p>
                <Button
                  onClick={getConsent}
                  className='mt-4 bg-blue-500 hover:bg-blue-600'
                >
                  Connect Calendar
                </Button>
              </div>
            )}
          </div>
        </ShowCode.Else>
      </ShowCode>
    </>
  );
}

export default MySchedule;
