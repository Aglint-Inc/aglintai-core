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

import { DropdownSelectButton } from './CancelReasons';

const RecentRescheduleCancel = () => {
  const { data: analyticsData } = useScheduleSessionsAnalytics();
  const { data: CancelReasonsData } = useCancelRescheduleReasons();
  const { data: userDetails, isPending: loading } =
    useCancelRescheduleReasonsUsers();
  const [type, setType] = useState<'interviewer' | 'candidate'>('candidate');
  const processedRescheduleData = (CancelReasonsData || [])
    .filter((item) => item.type == 'reschedule')
    .reduce(
      (acc, curr) => {
        if (curr.session_relation_id == null) {
          const temp = acc['candidate'] || [];
          const tempAD = analyticsData.find(
            (item) => item.interview_session.id == curr.session_id,
          );
          const detail_id = tempAD.interview_schedule.application_id;
          const meet_id = tempAD.interview_meeting.id;
          acc['candidate'] = [...temp, { ...curr, detail_id, meet_id }];
        } else {
          const temp = acc['interviewer'] || [];
          const detail_id = curr.session_relation_id;
          const meet_id = analyticsData.find(
            (item) => item.interview_session.id == curr.session_id,
          ).interview_meeting.id;

          acc['interviewer'] = [...temp, { ...curr, detail_id, meet_id }];
        }
        return acc;
      },
      { interviewer: [], candidate: [] } as {
        // eslint-disable-next-line no-unused-vars
        interviewer: ((typeof CancelReasonsData)[number] & {
          detail_id: string;
          meet_id: string;
        })[];
        candidate: ((typeof CancelReasonsData)[number] & {
          detail_id: string;
          meet_id: string;
        })[];
      },
    );
  const processedCancelData = CancelReasonsData?.map((item) => {
    const temp_user = {
      ...userDetails?.['candidate'],
      ...userDetails?.['interviewer'],
    };
    const detail_id = analyticsData.find(
      (itemX) => itemX.interview_session.id == item.session_id,
    ).interview_schedule.application_id;
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
  }).filter((item) => item);

  return (
    <>
      <RecentReschedule
        slotRecentRescheduleList={
          loading ? (
            <RecentRescheduleListItem loading />
          ) : processedRescheduleData?.[type].length ? (
            processedRescheduleData?.[type]
              .map((item) => {
                const temp_user = userDetails?.[type];
                const user = temp_user[item.detail_id];
                return (
                  user && {
                    id: user.id,
                    meet_id: item.meet_id,
                    name: user.name,
                    image: user.profile_image,
                    time: item.created_at,
                    desc: item.other_details?.note || item.reason,
                  }
                );
              })
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
          <DropdownSelectButton
            itemList={
              ['interviewer', 'candidate'] as unknown as (typeof type)[]
            }
            selectedItem={type}
            setSelectedItem={(e) => setType(e)}
          />
        }
      />
      <RecentDeclines
        slotRecentDeclineList={
          <>
            {loading ? (
              <RecentDeclineListItem loading />
            ) : (
              processedCancelData.length &&
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
        textName={<Skeleton variant='text' width={'100px'} height={'30px'} />}
        textTime={<Skeleton variant='text' width={'50px'} height={'30px'} />}
        textDesc={<Skeleton variant='text' width={'200px'} height={'30px'} />}
      />
    );
  return (
    <RecentRescheduleList
      slotImage={
        <Avatar
          src={detail.image ? detail.image : undefined}
          alt={detail.name}
        />
      }
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
        textName={<Skeleton variant='text' width={'100px'} height={'30px'} />}
        textTime={<Skeleton variant='text' width={'50px'} height={'30px'} />}
        textDesc={<Skeleton variant='text' width={'200px'} height={'30px'} />}
      />
    );
  return (
    <RecentDeclineList
      slotImage={
        <Avatar
          src={detail.image ? detail.image : undefined}
          alt={detail.name}
        />
      }
      textName={detail.name}
      textTime={dayjs(detail.time).fromNow()}
      textDesc={detail.desc}
    />
  );
};
