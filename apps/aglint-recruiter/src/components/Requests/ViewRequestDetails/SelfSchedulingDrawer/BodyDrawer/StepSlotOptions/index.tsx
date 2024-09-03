import { type EmailTemplateAPi } from '@aglint/shared-types';
import { Stack, Typography } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import { ScheduleOptionsList } from '@/devlink3/ScheduleOptionsList';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useRequests } from '@/src/context/RequestsContext';

import {
  setCalendarDate,
  setEmailData,
  setSelectedCombIds,
  useSelfSchedulingFlowStore,
} from '../../store';
import DayCardWrapper from './DayCardWrapper';
import FilterButton from './FilterButton';
import { type groupByDateRange } from './utils';

export type GroupByDateRange = ReturnType<typeof groupByDateRange>;

function StepSlotOptions() {
  const filteredSchedulingOptions = useSelfSchedulingFlowStore(
    (state) => state.filteredSchedulingOptions,
  );

  const {
    requests: {
      data: { schedule_request },
    },
  } = useRequests();

  const { recruiterUser } = useAuthDetails();

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

  const payload: EmailTemplateAPi<'sendSelfScheduleRequest_email_applicant'>['api_payload'] =
    {
      application_id: schedule_request[0].application_id,
      organizer_id: recruiterUser.user_id,
    };

  useEffect(() => {
    try {
      axios
        .post('/api/emails/sendSelfScheduleRequest_email_applicant', {
          ...payload,
        })
        .then(({ data }) => {
          setEmailData(data);
        });
    } catch (e) {
      //
    }
  }, []);

  return (
    <Stack height={'calc(100vh - 97px)'}>
      <ScheduleOptionsList
        slotDescription={
          <Stack justifyContent={'space-between'} direction={'row'}>
            <Typography fontWeight={600} variant='body1'>
              Showing available options between{' '}
              {dayjs(dateRange.start_date).format('MMM DD')}
              {' - '}
              {dayjs(dateRange.end_date).format('MMM DD')}
            </Typography>
            <FilterButton />
          </Stack>
        }
        slotDateOption={
          <>
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
          </>
        }
      />
    </Stack>
  );
}

export default StepSlotOptions;
