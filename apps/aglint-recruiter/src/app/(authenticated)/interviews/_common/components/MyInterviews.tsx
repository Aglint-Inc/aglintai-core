import { type DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Calendar, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { transformDataSchedules } from 'src/app/_common/utils/schedules-query';

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
      const res = await getInterviewsCountByUserId(recruiterUser.user_id);
      setCounts(res);
    })();
  }, []);

  const {
    data: { schedules: allSchedules },
    isLoading: scheduleLoading,
  } = useInterviewsByUserId({
    filter,
    member_id: recruiterUser.user_id,
  });

  if (scheduleLoading)
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin' />
      </div>
    );

  return (
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
            {scheduleLoading ? (
              ''
            ) : allSchedules.length === 0 ? (
              <div className='flex flex-col items-center justify-center p-8 text-center'>
                <Calendar className='mb-2 h-12 w-12 text-gray-400' />
                <h3 className='mb-1 text-lg font-medium text-gray-900'>
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
    </>
  );
}

export default MyInterviews;
