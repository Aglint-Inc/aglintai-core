import { Grid, InputAdornment, Stack } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React, { useState } from 'react';

import { AllInterviewEmpty, InterviewMemberSide } from '@/devlink2';
import { NewMyScheduleCard } from '@/devlink3';
import Icon from '@/src/components/Common/Icons/Icon';
import { ShowCode } from '@/src/components/Common/ShowCode';
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { DatabaseEnums } from '@/src/types/customSchema';
import { schedulingSettingType } from '@/src/types/scheduleTypes/scheduleSetting';
import { supabase } from '@/src/utils/supabase/client';

import DynamicLoader from '../../Interviewers/DynamicLoader';
import ScheduleMeetingCard from './ScheduleMeetingCard';
export type ScheduleListType = {
  interview_meeting: {
    end_time: string;
    job_title: string;
    schedule_type: DatabaseEnums['interview_schedule_type'];
    session_duration: number;
    session_name: string;
    start_time: string;
    status: DatabaseEnums['interview_schedule_status'];
    meeting_id: string;
  };
  users: {
    email: string;
    first_name: string;
    id: string;
    last_name: string;
    location: string;
    position: string;
    profile_image: string;
    scheduling_settings: schedulingSettingType;
    training_type: DatabaseEnums['interviewer_type'];
    weekly_meetings: {
      end_time: string;
      duration: number;
      start_time: string;
    }[];
    accepted_status: DatabaseEnums['session_accepted_status'];
  }[];
}[];
function ModuleSchedules() {
  const [filter, setFilter] = React.useState<
    'all' | 'confirmed' | 'cancelled' | 'completed' | 'waiting'
  >('confirmed');
  const [changeText, setChangeText] = useState('');
  const { data: scheduleList, isFetched } = useScheduleList();
  const newScheduleList = scheduleList as ScheduleListType;
  if (!isFetched) {
    return <DynamicLoader />;
  }

  const newFilterSchedules = () => {
    const filSch = newScheduleList;
    switch (filter) {
      case 'all':
        return filSch;
      default:
        return filSch.filter(
          (sch) =>
            sch.interview_meeting.status === filter &&
            sch.interview_meeting.session_name
              .toLowerCase()
              .includes(changeText.toLowerCase()),
        );
    }
  };

  return (
    <InterviewMemberSide
      slotInterview={
        <Stack>
          <UITextField
            width='400px'
            value={changeText}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Icon variant='JobSearch' height='14' />
                </InputAdornment>
              ),
            }}
            placeholder={'Search by session name'}
            onChange={(e) => {
              setChangeText(e.target.value);
            }}
            borderRadius={10}
            height={42}
          />
        </Stack>
      }
      isAllActive={filter === 'all'}
      isUpcomingActive={filter === 'confirmed'}
      isCancelActive={filter === 'cancelled'}
      isCompletedActive={filter === 'completed'}
      onClickAll={{
        onClick: () => setFilter('all'),
      }}
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
          <ShowCode.When isTrue={isFetched}>
            <Stack height={'calc(100vh - 154px)'}>
              {isFetched &&
                transformData(newFilterSchedules()).map((sch, ind) => {
                  const date = Object.keys(sch)[0];
                  const schedules = sch[String(date)] as ScheduleListType;
                  return (
                    <Grid item sm={12} md={12} lg={6} xl={4} key={ind}>
                      <NewMyScheduleCard
                        textDate={dayjs(date).format('DD')}
                        textDay={dayjs(date).format('ddd')}
                        textMonth={dayjs(date).format('MMM')}
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
                    </Grid>
                  );
                })}
            </Stack>
          </ShowCode.When>
          <ShowCode.When isTrue={isFetched && newScheduleList?.length === 0}>
            <AllInterviewEmpty textDynamic='No schedule found' />
          </ShowCode.When>
        </ShowCode>
      }
    />
  );
}

export default ModuleSchedules;

function transformData(inputData: ScheduleListType) {
  const transformedData = {};

  inputData?.forEach((item) => {
    const date = item.interview_meeting.start_time?.split('T')[0]; // Extracting date from start_time
    if (!transformedData[String(date)]) {
      transformedData[String(date)] = [];
    }
    transformedData[String(date)].push(item);
  });

  const result = [];
  for (const date in transformedData) {
    result.push({ [date]: transformedData[String(date)] });
  }

  return result.sort((a, b) => {
    const dateA = Object.keys(a)[0];
    const dateB = Object.keys(b)[0];
    return (new Date(dateA) as any) - (new Date(dateB) as any);
  });
}

export const useScheduleList = () => {
  const { recruiterUser } = useAuthDetails();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_ScheduleList'],
    queryFn: () => getScheduleList(recruiterUser.user_id),
  });
  const refetch = () =>
    queryClient.invalidateQueries({ queryKey: ['get_ScheduleList'] });
  return { ...query, refetch };
};

async function getScheduleList(user_id: string) {
  const { data, error } = await supabase.rpc(
    'new_get_interview_schedule_by_user_id',
    {
      target_user_id: user_id,
    },
  );
  if (error) throw Error(error.message);
  else return data;
}
