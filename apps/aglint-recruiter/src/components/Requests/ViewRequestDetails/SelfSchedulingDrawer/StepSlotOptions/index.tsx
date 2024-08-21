import { EmailTemplateAPi } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import { Text } from '@/devlink/Text';
import { ScheduleOptionsList } from '@/devlink3/ScheduleOptionsList';
import DayCardWrapper from '@/src/components/Scheduling/CandidateDetails/SchedulingDrawer/StepSlotOptions/DayCardWrapper';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useRequests } from '@/src/context/RequestsContext';

import {
  setEmailData,
  setSelectedCombIds,
  useSelfSchedulingFlowStore,
} from '../store';
import { groupByDateRange } from './utils';

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
          <>
            <Text
              content={`Showing available options between ${dayjs(dateRange.start_date).format('DD MMM YYYY')} - ${dayjs(dateRange.end_date).format('DD MMM YYYY')}`}
              weight={'medium'}
            />

            <Text
              content={`Select atleast 5 available time slots and then click 'Continue' to forward them to the candidate for selection.`}
            />
          </>
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
