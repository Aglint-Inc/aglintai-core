import { type DatabaseTable } from '@aglint/shared-types';
import { Skeleton, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { InterviewersCardList } from '@/devlink3/InterviewersCardList';
import { InterviewersDash } from '@/devlink3/InterviewersDash';
import { NoData } from '@/devlink3/NoData';
import axios from '@/src/client/axios';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import {
  type ApiBodyGetUsersByIds,
  type ApiResponseGetUsersByIds,
} from '@/src/pages/api/get_users_by_ids';
import { schedulingDashboardQueryKeys } from '@/src/queries/scheduling-dashboard/keys';
import { supabase } from '@/src/utils/supabase/client';

const InterviewersAnalyticCards = () => {
  const [type, setType] =
    useState<DatabaseTable['interview_session_relation']['interviewer_type']>(
      'training',
    );
  const { recruiter } = useAuthDetails();
  const { queryKey } =
    schedulingDashboardQueryKeys.InterviewersListAnalyticCards({
      recruiter_id: recruiter.id,
      type,
    });
  const { data: interviewersData, isPending: loading } = useQuery({
    queryKey,
    queryFn: () =>
      getUsersByIds({ rec_id: recruiter.id, interviewer_type: type }),
    enabled: Boolean(recruiter.id),
  });
  const router = useRouter();
  return (
    <InterviewersDash
      onClickQualified={{
        onClick: () => {
          setType('qualified');
        },
      }}
      onClickTrainee={{
        onClick: () => {
          setType('training');
        },
      }}
      isTraineeActive={type == 'training'}
      isQualifiedActive={type == 'qualified'}
      slotInterviewersCardList={
        loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <InterviewersCardList
              key={index}
              textName={
                <Skeleton
                  variant='text'
                  width={'100px'}
                  height={'var(--space-6)'}
                />
              }
              textCompleted={
                <Skeleton
                  variant='text'
                  width={'var(--space-5)'}
                  height={'var(--space-6)'}
                />
              }
              textUpcoming={
                <Skeleton
                  variant='text'
                  width={'var(--space-5)'}
                  height={'var(--space-6)'}
                />
              }
              textDeclined={
                <Skeleton
                  variant='text'
                  width={'var(--space-5)'}
                  height={'var(--space-6)'}
                />
              }
            />
          ))
        ) : interviewersData.length ? (
          interviewersData?.map((item) => (
            // eslint-disable-next-line react/jsx-key
            <Stack onClick={() => router.push(`/user/profile/${item.id}`)}>
              <InterviewersCardList
                key={item.id}
                textName={item.name}
                textCompleted={item.status['completed'] || 0}
                textUpcoming={item.status['confirmed'] || 0}
                textDeclined={item.status['cancelled'] || 0}
              />
            </Stack>
          ))
        ) : (
          <NoData />
        )
      }
    />
  );
};

export default InterviewersAnalyticCards;

const getInterviewerData = async ({
  ids,
  interviewer_type,
}: {
  ids: string[];
  interviewer_type: DatabaseTable['interview_session_relation']['interviewer_type'];
}) => {
  return supabase
    .from('interview_session_relation')
    .select(
      'user_id, interview_session!inner ( interview_meeting!inner ( status ))',
    )
    .eq('interviewer_type', interviewer_type)
    .in('user_id', ids)
    .in('interview_session.interview_meeting.status', [
      'waiting',
      'confirmed',
      'completed',
      'cancelled',
    ])
    .then((data) => {
      return data;
    })
    .then(async ({ data }) => {
      return data.reduce(
        (acc, curr) => {
          const tempUser: {
            [key: string]: number;
          } = acc[curr.user_id] || {};
          tempUser[curr.interview_session.interview_meeting.status] =
            (tempUser[curr.interview_session.interview_meeting.status] || 0) +
            1;
          acc[curr.user_id] = tempUser;
          return acc;
        },
        {} as {
          [key: string]: {
            [key: string]: number;
          };
        },
      );
    });
};

const getUsersByIds = async ({
  rec_id,
  interviewer_type,
}: {
  rec_id: string;
  interviewer_type: DatabaseTable['interview_session_relation']['interviewer_type'];
}) => {
  const bodyParams: ApiBodyGetUsersByIds = {
    rec_id,
  };
  const { data: users } = await axios.post(`/api/get_users_by_ids`, bodyParams);

  const data: ApiResponseGetUsersByIds = users;

  const ids = data?.map((item) => item.recruiter_user.user_id);

  if (ids?.length) {
    const tempData = await getInterviewerData({ ids, interviewer_type });

    return data?.reduce(
      (acc, curr) => {
        const status = tempData[curr.recruiter_user.user_id];
        if (!status) return acc;
        const temp = {
          id: curr.recruiter_user.user_id,
          name: `${curr.recruiter_user.first_name} ${curr.recruiter_user.last_name}`.trim(),
          profile_image: curr.recruiter_user.profile_image,
          status,
        };

        return [...acc, temp];
      },
      [] as {
        id: string;
        name: string;
        image: string;
        status: { [key: string]: number };
      }[],
    );
  }
  return [] as {
    id: string;
    name: string;
    image: string;
    status: { [key: string]: number };
  }[];
};
