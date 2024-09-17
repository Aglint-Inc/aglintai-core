import { type DatabaseTable } from '@aglint/shared-types';
import { useQuery } from '@tanstack/react-query';
import { BarChart2 } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import axios from '@/client/axios';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import {
  type ApiBodyGetUsersByIds,
  type ApiResponseGetUsersByIds,
} from '@/pages/api/get_users_by_ids';
import { schedulingDashboardQueryKeys } from '@/queries/scheduling-dashboard/keys';
import { supabase } from '@/utils/supabase/client';

import { InterviewersCardList } from './_common/InterviewersCardList';
import { InterviewersDash } from './_common/InterviewersDash';

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
      onClickQualified={() => setType('qualified')}
      onClickTrainee={() => setType('training')}
      isTraineeActive={type == 'training'}
      isQualifiedActive={type == 'qualified'}
      slotInterviewersCardList={
        loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <InterviewersCardList
              key={index}
              textName={
                <div className='h-6 w-24 animate-pulse rounded bg-gray-200' />
              }
              textCompleted={
                <div className='h-6 w-5 animate-pulse rounded bg-gray-200' />
              }
              textUpcoming={
                <div className='h-6 w-5 animate-pulse rounded bg-gray-200' />
              }
              textDeclined={
                <div className='h-6 w-5 animate-pulse rounded bg-gray-200' />
              }
            />
          ))
        ) : interviewersData.length ? (
          interviewersData?.map((item) => (
            <div
              key={item.id}
              className='cursor-pointer'
              onClick={() => router.push(`/user/profile/${item.id}`)}
            >
              <InterviewersCardList
                textName={item.name}
                textCompleted={item.status['completed'] || 0}
                textUpcoming={item.status['confirmed'] || 0}
                textDeclined={item.status['cancelled'] || 0}
              />
            </div>
          ))
        ) : (
          <div className='h-[296px]'>
            <div className='flex h-full flex-col items-center justify-center'>
              <BarChart2 className='h-12 w-12 text-gray-400' />
              <p className='mt-2 text-sm text-gray-500'>No data available</p>
            </div>
          </div>
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
