import { type DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Calendar, Info } from 'lucide-react';
import { useEffect, useState } from 'react';
import { transformDataSchedules } from 'src/app/_common/utils/schedules-query';

import { useTenant } from '@/company/hooks';
import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { Loader } from '@/components/Common/Loader';

import {
  getInterviewsCountByUserId,
  useInterviewsByUserId,
} from '../hooks/useInterviewsByUserId';
import { InterviewMemberSide } from './ui/InterviewMemberSide';
import { NewMyScheduleCard } from './ui/NewMyScheduleCard';
import ScheduleMeetingCard from './ui/ScheduleMeetingCard';
function MyInterviews() {
  const { recruiter_user } = useTenant();
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
        recruiter_user?.user_id ?? '',
      );
      setCounts(res);
    })();
  }, []);

  const { data, isFetched: scheduleFetched } = useInterviewsByUserId({
    filter,
    member_id: recruiter_user?.user_id ?? '',
  });
  const schedules = data?.schedules ?? [];
  const allSchedules = schedules;

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
              <GlobalEmpty
                icon={
                  <Calendar
                    strokeWidth={2}
                    className='h-6 w-6 text-muted-foreground'
                  />
                }
                header='No interviews found'
                description='There are no upcoming interviews for you.'
              />
            )}
          </>
        }
      />
    </>
  );
}

export default MyInterviews;
