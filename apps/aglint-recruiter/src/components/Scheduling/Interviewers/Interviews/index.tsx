import { type DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { InterviewMemberSide } from '@devlink2/InterviewMemberSide';
import { NewMyScheduleCard } from '@devlink3/NewMyScheduleCard';
import { Calendar } from 'lucide-react';
import { useRouter } from 'next/router';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

import SearchField from '@/components/Common/SearchField/SearchField';

import ScheduleMeetingCard from '../../Common/ModuleSchedules/ScheduleMeetingCard';
import {
  type SchedulesSupabase,
  transformDataSchedules,
} from '../../schedules-query';
import { fetchSchedulesCountByUserId } from '../InterviewerDetail/query';

function Interviews({
  allSchedules,
  isLoading,
  filter,
  setFilter,
  changeText,
  setChangeText,
}: {
  allSchedules: SchedulesSupabase;
  isLoading: boolean;
  filter: DatabaseTable['interview_meeting']['status'];
  setFilter: Dispatch<
    SetStateAction<DatabaseTable['interview_meeting']['status']>
  >;
  changeText: string;
  setChangeText: Dispatch<SetStateAction<string>>;
}) {
  const router = useRouter();
  const [counts, setCounts] = useState({
    upcomingCount: 0,
    completedCount: 0,
    cancelledCount: 0,
  });

  const member_id = router?.query?.user_id as string;

  useEffect(() => {
    if (member_id) {
      (async () => {
        const res = await fetchSchedulesCountByUserId(member_id);
        setCounts(res);
      })();
    }
  }, [member_id]);

  return (
    <InterviewMemberSide
      slotInterview={
        <div className='flex flex-col space-y-2'>
          <SearchField
            value={changeText}
            onChange={(e) => {
              setChangeText(e.target.value);
            }}
            onClear={() => setChangeText('')}
            placeholder={'Search by session name'}
          />
        </div>
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
          {isLoading ? (
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
                      date != 'undefined' ? dayjsLocal(date).format('DD') : null
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
  );
}

export default Interviews;
