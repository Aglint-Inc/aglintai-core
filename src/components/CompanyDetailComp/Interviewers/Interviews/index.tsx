import { AvatarGroup, Stack } from '@mui/material';
import React, { useMemo, useState } from 'react';

import { InterviewMemberSide, InterviewScreenCard } from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';

function Interviews({
  allInterviews,
  onClick
}: {
  allInterviews: any[];
  // eslint-disable-next-line no-unused-vars
  onClick: (item: any) => void;
}) {
  const [filter, setFilter] = useState<
    'all' | 'confirmed' | 'notConfirmed' | 'upcoming' | 'completed'
  >('all');
  const filteredInterviews = useMemo(() => {
    if (filter === 'all') return allInterviews;
    return allInterviews.filter((interview) => {
      return interview.status === filter;
    });
  }, [filter, allInterviews]);
  return (
    <>
      <InterviewMemberSide
        onClickAll={{
          onClick: () => {
            setFilter('all');
          }
        }}
        onClickUpcoming={{
          onClick: () => {
            setFilter('upcoming');
          }
        }}
        onClickCompleted={{
          onClick: () => {
            setFilter('completed');
          }
        }}
        onClickNotConfirmed={{
          onClick: () => {
            setFilter('notConfirmed');
          }
        }}
        isUpcomingActive={filter === 'upcoming'}
        isAllActive={filter === 'all'}
        isCompletedActive={filter === 'completed'}
        isNotConfirmedActive={filter === 'notConfirmed'}
        slotInterviewCard={filteredInterviews.map((item, i) => {
          return (
            <Stack
              onClick={() => onClick(item)}
              style={{ cursor: 'pointer' }}
              key={i}
            >
              <InterviewScreenCard
                isUpcomingVisible={item.status !== 'completed'}
                isCompletedVisible={item.status !== 'upcoming'}
                slotMemberImage={<Members members={item.members} />}
                textDate={item.date.day}
              />
            </Stack>
          );
        })}
      />
    </>
  );
}

export default Interviews;

function Members({ members }) {
  return (
    <AvatarGroup max={3} total={5}>
      {members.map((ele, i) => {
        return (
          <MuiAvatar
            key={i}
            level={ele}
            width='20'
            variant='circular'
            fontSize='12px'
            height='20'
            src='/static/images/avatar/5.jpg'
          />
        );
      })}
    </AvatarGroup>
  );
}
