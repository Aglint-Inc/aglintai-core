/* eslint-disable security/detect-object-injection */

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Skeleton } from '@components/ui/skeleton';
import dayjs from 'dayjs';
import { BarChart2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UITypography from '@/components/Common/UITypography';
import {
  useCancelRescheduleReasons,
  useCancelRescheduleReasonsUsers,
  useScheduleSessionsAnalytics,
} from '@/queries/scheduling-dashboard';

import { FilterDropDownDash } from './FilterDropDownDash';

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

  const itemList = [
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
          const detail_id = tempAD?.interview_meeting.application_id;
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
      )?.interview_meeting.application_id;
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
      {/* Recent Reschedule Table */}

      <div className='h-[450px] overflow-hidden rounded-md border border-gray-200'>
        <div className='flex items-center justify-between border-b border-gray-200 bg-gray-100 p-3'>
          <UITypography type='small' fontBold='normal' color='black'>
            Recent Reschedule
          </UITypography>
          <div>
            <FilterDropDownDash
              itemList={itemList}
              onChange={setType}
              value={type}
            />
          </div>
        </div>
        <div className='flex flex-col'>
          {loading ? (
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
            <div className='h-[296px]'>
              <div className='flex h-full flex-col items-center justify-center'>
                <BarChart2 className='h-12 w-12 text-gray-400' />
                <p className='mt-2 text-sm text-gray-500'>No data available</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Decline Table */}

      <div className='h-[450px] overflow-hidden rounded-md border border-gray-200'>
        <div className='border-b border-gray-200 bg-gray-100 p-3'>
          <UITypography type='small' fontBold='normal' color='black'>
            Recent Decline
          </UITypography>
        </div>
        <div className='flex flex-col'>
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
            <div className='h-[296px]'>
              <div className='flex h-full flex-col items-center justify-center'>
                <BarChart2 className='h-12 w-12 text-gray-400' />
                <p className='mt-2 text-sm text-gray-500'>No data available</p>
              </div>
            </div>
          )}
        </div>
      </div>
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
      // Recent Reschedule List Skeleton

      <div className='flex items-center space-x-4 p-4'>
        <div className='flex-shrink-0'>
          <Skeleton className='rounded-full' width={40} height={40} />
        </div>
        <div className='min-w-0 flex-1'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='mt-2 h-4 w-12' />
          <Skeleton className='mt-2 h-4 w-48' />
        </div>
      </div>
    );
  return (
    // Recent Reschedule List

    <div
      className='flex cursor-pointer items-center space-x-4 p-4'
      onClick={() => {
        if (detail?.meet_id)
          router.push(
            `/scheduling/view?meeting_id=${detail?.meet_id}&tab=candidate_details`,
          );
      }}
    >
      <div className='flex-shrink-0'>
        <Avatar
          src={detail.image ? detail.image : undefined}
          alt={detail.name}
        />
      </div>
      <div className='min-w-0 flex-1'>
        <p className='truncate text-sm font-medium text-gray-900'>
          {detail.name}
        </p>
        <p className='truncate text-sm text-gray-500'>
          {dayjs(detail.time).fromNow()}
        </p>
        <p className='truncate text-sm text-gray-500'>{detail.desc}</p>
      </div>
      <div className='flex-shrink-0'>
        <UIButton
          size='sm'
          variant='default'
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/scheduling/view?meeting_id=${detail.meet_id}`);
          }}
        >
          View
        </UIButton>
      </div>
    </div>
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
      <div className='flex items-center space-x-4 p-4'>
        <div className='flex-shrink-0'>
          <Skeleton className='h-4 w-24' />
        </div>
        <div className='min-w-0 flex-1'>
          <Skeleton className='h-4 w-12' />
          <Skeleton className='h-4 w-48' />
        </div>
      </div>
    );
  return (
    <div className='flex items-center space-x-4 p-4'>
      <div className='flex-shrink-0'>
        <Avatar>
          <AvatarImage src={detail.image} alt={detail.name} />
          <AvatarFallback>{detail.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      <div className='min-w-0 flex-1'>
        <p className='truncate text-sm font-medium text-gray-900'>
          {detail.name}cvscsd
        </p>
        <p className='truncate text-sm text-gray-500'>
          {dayjs(detail.time).fromNow()}
        </p>
        <p className='truncate text-sm text-gray-500'>{detail.desc}</p>
      </div>
    </div>
  );
};
