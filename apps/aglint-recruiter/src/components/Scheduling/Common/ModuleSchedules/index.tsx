import { InterviewMemberSide } from '@devlink2/InterviewMemberSide';
import { Calendar, Loader2 } from 'lucide-react';
import React, { useState } from 'react';

import SearchField from '@/components/Common/SearchField/SearchField';
import { ShowCode } from '@/components/Common/ShowCode';

import { type fetchModuleSchedules } from '../../InterviewTypes/DetailPage/_common/utils/utils';
import ScheduleMeetingList from './ScheduleMeetingList';

type tabs = 'all' | 'confirmed' | 'cancelled' | 'completed' | 'waiting';
function ModuleSchedules({
  isFetched,
  newScheduleList,
}: {
  isFetched: boolean;
  newScheduleList: Awaited<ReturnType<typeof fetchModuleSchedules>>;
}) {
  const [filter, setFilter] = React.useState<tabs>('confirmed');
  const [changeText, setChangeText] = useState('');

  if (!isFetched) {
    return (
      <div className='flex items-center justify-center'>
        <Loader2 className='h-6 w-6 animate-spin text-primary' />
      </div>
    );
  }

  const countCalculation = (tab: tabs) => {
    return newScheduleList.filter(
      (sch) =>
        sch.status === tab &&
        sch.session_name.toLowerCase().includes(changeText.toLowerCase()),
    );
  };

  const newFilterSchedules = () => {
    const filSch = newScheduleList;

    switch (filter) {
      case 'all':
        return filSch;
      default:
        return countCalculation(filter);
    }
  };

  return (
    <InterviewMemberSide
      slotInterview={
        <div className='flex flex-col'>
          <SearchField
            value={changeText}
            onChange={(e) => {
              setChangeText(e.target.value);
            }}
            onClear={() => setChangeText('')}
            placeholder={'Search by session.'}
          />
        </div>
      }
      isUpcomingActive={filter === 'confirmed'}
      isCancelActive={filter === 'cancelled'}
      isCompletedActive={filter === 'completed'}
      textUpcomingCount={countCalculation('confirmed').length}
      textCancelledCount={countCalculation('cancelled').length}
      textPastCount={countCalculation('completed').length}
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
        <ShowCode>
          <ShowCode.When
            isTrue={isFetched && newFilterSchedules()?.length === 0}
          >
            <div className='flex min-h-[calc(100vh-128px)] items-center justify-center rounded-md bg-neutral-100 p-4'>
              <div className='w-[300px] max-w-sm p-2'>
                <div className='flex flex-col items-center justify-center text-center'>
                  <Calendar className='mb-2 h-12 w-12 text-gray-400' />
                  <h3 className='mb-1 text-lg font-medium text-gray-900'>
                    No schedule found
                  </h3>
                  <p className='text-sm text-gray-500'>
                    There are no schedules available at the moment.
                  </p>
                </div>
              </div>
            </div>
          </ShowCode.When>
          <ShowCode.When isTrue={isFetched}>
            <ScheduleMeetingList filterSchedules={newFilterSchedules()} />
          </ShowCode.When>
        </ShowCode>
      }
    />
  );
}

export default ModuleSchedules;
