import { type TargetApiPayloadType } from '@aglint/shared-types';
import dayjs from 'dayjs';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import UITypography from '@/components/Common/UITypography';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRequests } from '@/context/RequestsContext';
import { mailSender } from '@/utils/mailSender';

import {
  setCalendarDate,
  setEmailData,
  setSelectedCombIds,
  useSelfSchedulingFlowStore,
} from '../../../store/store';
import DayCardWrapper from './DayCardWrapper';
import FilterButton from './FilterButton';
import { type groupByDateRange } from './utils';

export type GroupByDateRange = ReturnType<typeof groupByDateRange>;

function StepSlotOptions() {
  const query = useParams();
  const filteredSchedulingOptions = useSelfSchedulingFlowStore(
    (state) => state.filteredSchedulingOptions,
  );

  const { recruiterUser } = useAuthDetails();

  const {
    requests: { data: requestList },
  } = useRequests();

  const selectedRequest = Object.values(requestList)
    .flat()
    .find((request) => request?.id === (query?.id || ''));

  const dateRange = useSelfSchedulingFlowStore((state) => state.dateRange);

  const selectedCombIds = useSelfSchedulingFlowStore(
    (state) => state.selectedCombIds,
  );

  const onClickSelect = (comb_id: string) => {
    if (!selectedCombIds.includes(comb_id)) {
      setSelectedCombIds([...selectedCombIds, comb_id]);
    } else {
      setSelectedCombIds(selectedCombIds.filter((id) => id !== comb_id));
    }
  };

  const payload: TargetApiPayloadType<'sendSelfScheduleRequest_email_applicant'> =
    {
      is_preview: true,
      organizer_id: recruiterUser.user_id,
      application_id: selectedRequest.application_id,
    };

  useEffect(() => {
    try {
      mailSender({
        target_api: 'sendSelfScheduleRequest_email_applicant',
        payload: {
          ...payload,
        },
      }).then((data) => {
        setEmailData(data);
      });
    } catch (e) {
      //
    }
  }, []);

  return (
    <div className='border-l border-gray-200'>
      <div className='flex flex-row items-center justify-between gap-2 border-b border-gray-200 px-4 py-2.5'>
        <UITypography type='small'>
          Showing available options between{' '}
          {dayjs(dateRange.start_date).format('MMM DD')}
          {' - '}
          {dayjs(dateRange.end_date).format('MMM DD')}
        </UITypography>
        <FilterButton />
      </div>
      <div className='flex h-[calc(100vh-144px)] flex-col gap-2 overflow-scroll p-4'>
        {filteredSchedulingOptions?.map((item, index) => {
          return (
            <DayCardWrapper
              key={item.date_range.join(', ')}
              isRadioNeeded={false}
              item={item}
              onClickSelect={onClickSelect}
              selectedCombIds={selectedCombIds}
              isDisabled={false}
              isDayCheckboxNeeded={true}
              isSlotCheckboxNeeded={true}
              isDayCollapseNeeded={true}
              isSlotCollapseNeeded={true}
              index={index}
              setSelectedCombIds={setSelectedCombIds}
              setCalendarDate={setCalendarDate}
            />
          );
        })}
      </div>
    </div>
  );
}

export default StepSlotOptions;
