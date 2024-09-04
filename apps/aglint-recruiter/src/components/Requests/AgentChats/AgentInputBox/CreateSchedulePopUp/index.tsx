import { getFullName } from '@aglint/shared-utils';
import { ButtonSoft } from '@devlink/ButtonSoft';
import { Text } from '@devlink/Text';
import { AiChatSuggest } from '@devlink2/AiChatSuggest';
import { Stack } from '@mui/material';
import React, { useState } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRequests } from '@/context/RequestsContext';
import dayjs from '@/utils/dayjs';

import { type selectedItemsType } from '../utils';
import SelectScheduleDate from './SelectScheduleDate';

function CreateSchedulePopUp({
  selectedItems,
  setSelectedItems,
  setText,
}: {
  selectedItems: selectedItemsType;
  setSelectedItems: React.Dispatch<React.SetStateAction<selectedItemsType>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { handleAsyncCreateRequests } = useRequests();
  const { recruiterUser } = useAuthDetails();
  const [loading, setLoading] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState({
    start_date: dayjs().toString(),
    end_date: dayjs().add(7, 'day').toString(),
  });
  const assigner = 'user';
  const assignerText =
    assigner === 'user'
      ? `assign to ${getFullName(recruiterUser.first_name, recruiterUser.last_name)}`
      : assigner === 'email'
        ? 'send an email'
        : assigner === 'phone'
          ? 'make a phone call'
          : '';
  const candidate = selectedItems?.applicant_name.length
    ? selectedItems?.applicant_name[0]?.name
    : `{{candidate}}`;
  const scheduleType = selectedItems?.schedule_type.length
    ? selectedItems?.schedule_type[0]?.name
    : '{{schedule_type}}';
  const interviewName = selectedItems?.interview_name.length
    ? selectedItems?.interview_name.map((ele) => ele.name).join(',')
    : '{{interviews}}';
  async function createNewRequest() {
    const selectedSession = selectedItems?.interview_name;
    if (selectedSession.length && selectedItems.applicant_name.length) {
      setLoading(true);
      await handleAsyncCreateRequests({
        payload: {
          request: {
            priority: 'standard',
            assigner_id: recruiterUser.user_id,
            assignee_id: recruiterUser.user_id,
            title: `${getFullName(recruiterUser.first_name, recruiterUser.last_name)} requested to schedule a ${selectedSession.map((ele) => ele.name).join(' ,')} for ${selectedItems.applicant_name[0].name}`,
            status: 'in_progress',
            type: 'schedule_request',
            schedule_start_date: selectedDateRange.start_date,
            schedule_end_date: selectedDateRange.end_date,
            note: null,
          },
          applications: [selectedItems.applicant_name[0].id],
          sessions: selectedItems.interview_name.map((ele) => ele.id),
        },
      });
      setLoading(false);
      setSelectedItems(null);
      setText('');
    }
  }

  return selectedItems?.schedule_type[0]?.id === 'schedule' &&
    selectedItems.applicant_name[0]?.id &&
    !!selectedItems.interview_name.length ? (
    <Stack px={'16px'} position={'relative'} top={'-10px'}>
      <AiChatSuggest
        textHeader={'Schedule an interview'}
        slotList={
          <Stack
            height={'100%'}
            width={'100%'}
            direction={'column'}
            justifyContent={'space-between'}
            alignItems={'flex-end'}
            p={1}
          >
            <Stack>
              <Text
                size={1}
                color={'neutral'}
                content={`Aglint AI will ${assignerText} to ${candidate} to get ${scheduleType} for the ${interviewName} interview between. `}
              />
              <SelectScheduleDate
                scheduleDate={{
                  start_date: selectedDateRange.start_date,
                  end_date: selectedDateRange.end_date,
                }}
                onChange={(e: any) => {
                  if (e[1]) {
                    setSelectedDateRange({
                      start_date: e[0],
                      end_date: e[1],
                    });
                  } else {
                    setSelectedDateRange({
                      start_date: e[0],
                      end_date: null,
                    });
                  }
                }}
              />
            </Stack>
            <ButtonSoft
              isLoading={loading}
              isDisabled={
                Boolean(!selectedItems?.interview_name.length) ||
                Boolean(!selectedItems?.applicant_name.length)
              }
              iconName={'send'}
              isRightIcon={true}
              size={1}
              textButton='Create Request'
              onClickButton={{
                onClick: createNewRequest,
              }}
            />
          </Stack>
        }
      />
    </Stack>
  ) : null;
}

export default CreateSchedulePopUp;
