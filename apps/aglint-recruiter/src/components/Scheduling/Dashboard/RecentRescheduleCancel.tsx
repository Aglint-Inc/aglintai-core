/* eslint-disable security/detect-object-injection */
import { Avatar, Skeleton } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { NoData } from '@/devlink3/NoData';
import { RecentDeclineList } from '@/devlink3/RecentDeclineList';
import { RecentDeclines } from '@/devlink3/RecentDeclines';
import { RecentReschedule } from '@/devlink3/RecentReschedule';
import { RecentRescheduleList } from '@/devlink3/RecentRescheduleList';
import {
  useCancelRescheduleReasons,
  useCancelRescheduleReasonsUsers,
  useScheduleSessionsAnalytics,
} from '@/src/queries/scheduling-dashboard';

import { FilterDropDownDash, ItemList } from './FilterDropDownDash';

const RecentRescheduleCancel = () => {
  const { data: analyticsData } = useScheduleSessionsAnalytics();
  const { data: CancelReasonsData } = useCancelRescheduleReasons();
  const {
    data: userDetails,
    isPending,
    parentFetching,
    disabled,
  } = useCancelRescheduleReasonsUsers();

  const [type, setType] = useState<'interviewer' | 'candidate'>('candidate');

  const itemList: ItemList[] = [
    { label: 'Interview', value: 'interviewer' },
    { label: 'Candidate', value: 'candidate' },
  ];
  const processedRescheduleData = (CancelReasonsData || [])
    .filter((item) => item.type == 'reschedule')
    .reduce(
      (acc, curr) => {
        if (curr.session_relation_id == null) {
          const temp = acc['candidate'] || [];
          const tempAD = analyticsData.find(
            (item) => item.interview_session.id == curr.session_id,
          );
          const detail_id = tempAD?.interview_schedule.application_id;
          const meet_id = tempAD?.interview_meeting.id;
          const temp_user = userDetails?.[type];
          const user = temp_user?.[detail_id];
          if (user) {
            const tempItem = {
              id: user.id,
              meet_id: meet_id,
              name: user.name,
              image: user.profile_image,
              time: curr.created_at,
              desc: curr.other_details?.note || curr.reason,
            };

            acc['candidate'] = [...temp, tempItem];
          }
        } else {
          const temp = acc['interviewer'] || [];
          const detail_id = curr.session_relation_id;
          const meet_id = analyticsData.find(
            (item) => item.interview_session.id == curr.session_id,
          )?.interview_meeting.id;
          const temp_user = userDetails?.[type];
          const user = temp_user?.[detail_id];
          if (user) {
            const tempItem = {
              id: user.id,
              meet_id: meet_id,
              name: user.name,
              image: user.profile_image,
              time: curr.created_at,
              desc: curr.other_details?.note || curr.reason,
            };
            acc['interviewer'] = [...temp, tempItem];
          }
        }
        return acc;
      },
      { interviewer: [], candidate: [] } as {
        // eslint-disable-next-line no-unused-vars
        interviewer: {
          id: any;
          meet_id: string;
          name: any;
          image: any;
          time: string;
          desc: string;
        }[];
        candidate: {
          id: any;
          meet_id: string;
          name: any;
          image: any;
          time: string;
          desc: string;
        }[];
      },
    );
  const processedCancelData = (CancelReasonsData || [])
    .map((item) => {
      const temp_user = {
        ...userDetails?.['candidate'],
        ...userDetails?.['interviewer'],
      };
      const detail_id = analyticsData.find(
        (itemX) => itemX.interview_session.id == item.session_id,
      )?.interview_schedule.application_id;
      const user = temp_user?.[detail_id];
      return (
        user && {
          id: user.id,
          name: user.name,
          image: user.profile_image,
          time: item.created_at,
          desc: item.other_details?.note || item.reason,
        }
      );
    })
    .filter((item) => item);
  const loading = parentFetching || (!disabled && isPending);

  return (
    <>
      <RecentReschedule
        slotRecentRescheduleList={
          loading ? (
            <RecentRescheduleListItem loading />
          ) : processedRescheduleData?.[type].length ? (
            processedRescheduleData?.[type]
              .filter((item) => item)
              .map((user) => {
                return (
                  <RecentRescheduleListItem
                    key={user.id}
                    detail={{
                      meet_id: user.meet_id,
                      name: user.name,
                      image: user.image,
                      time: user.time,
                      desc: user.desc,
                    }}
                  />
                );
              })
          ) : (
            <NoData />
          )
        }
        slotDropdown={
          <FilterDropDownDash
            itemList={itemList}
            onChange={setType}
            value={type}
          />
        }
      />
      <RecentDeclines
        slotRecentDeclineList={
          <>
            {loading ? (
              <RecentDeclineListItem loading />
            ) : processedCancelData?.length ? (
              processedCancelData.map((user) => {
                return (
                  <RecentDeclineListItem
                    key={user.id}
                    detail={{
                      name: user.name,
                      image: user.image,
                      time: user.time,
                      desc: user.desc,
                    }}
                  />
                );
              })
            ) : (
              <NoData />
            )}
          </>
        }
      />
    </>
  );
};

export default RecentRescheduleCancel;

const RecentRescheduleListItem = ({
  loading = false,
  detail = null,
}: {
  loading?: boolean;
  detail?: {
    meet_id: string;
    name: string;
    image: string;
    time: string;
    desc: string;
  };
}) => {
  const router = useRouter();
  if (loading)
    return (
      <RecentRescheduleList
        slotImage={
          <Skeleton variant='circular' width={'100%'} height={'100%'} />
        }
        textName={
          <Skeleton variant='text' width={'100px'} height={'var(--space-6)'} />
        }
        textTime={
          <Skeleton variant='text' width={'50px'} height={'var(--space-6)'} />
        }
        textDesc={
          <Skeleton variant='text' width={'200px'} height={'var(--space-6)'} />
        }
      />
    );
  return (
    <RecentRescheduleList
      slotImage={
        <Avatar
          src={detail.image ? detail.image : undefined}
          alt={detail.name}
          variant='rounded-medium'
        />
      }
      onClickCandidate={{
        onClick: () => {
          if (detail?.meet_id)
            router.push(
              `/scheduling/view?meeting_id=${detail?.meet_id}&tab=candidate_details`,
            );
        },
      }}
      textName={detail.name}
      textTime={dayjs(detail.time).fromNow()}
      textDesc={detail.desc}
      onClickView={{
        onClick: () => {
          router.push(`/scheduling/view?meeting_id=${detail.meet_id}`);
        },
      }}
    />
  );
};

const RecentDeclineListItem = ({
  loading = false,
  detail = null,
}: {
  loading?: boolean;
  detail?: {
    name: string;
    image: string;
    time: string;
    desc: string;
  };
}) => {
  if (loading)
    return (
      <RecentDeclineList
        slotImage={
          <Skeleton variant='circular' width={'100%'} height={'100%'} />
        }
        textName={
          <Skeleton variant='text' width={'100px'} height={'var(--space-6)'} />
        }
        textTime={
          <Skeleton variant='text' width={'50px'} height={'var(--space-6)'} />
        }
        textDesc={
          <Skeleton variant='text' width={'200px'} height={'var(--space-6)'} />
        }
      />
    );
  return (
    <RecentDeclineList
      slotImage={
        <Avatar
          src={detail.image ? detail.image : undefined}
          alt={detail.name}
          variant='rounded-medium'
        />
      }
      textName={detail.name}
      textTime={dayjs(detail.time).fromNow()}
      textDesc={detail.desc}
    />
  );
};
