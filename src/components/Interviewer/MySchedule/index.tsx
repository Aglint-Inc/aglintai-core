import { AvatarGroup, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { InterviewerScreens, InterviewScreenCard } from '@/devlink2';
import { pageRoutes } from '@/src/utils/pageRouting';

import MuiAvatar from '../../Common/MuiAvatar';

function MySchedule() {
  const router = useRouter();
  const [dataObj, setDataObj] = useState(data);

  useEffect(() => {
    router.push(`${pageRoutes.INTERVIEWER}?tab=mySchedules&filter=all`);
  }, []);
  return (
    <div>
      <InterviewerScreens
        onClickAll={{
          onClick: () => {
            setDataObj(data);
            router.push(`${pageRoutes.INTERVIEWER}?tab=mySchedules&filter=all`);
          }
        }}
        onClickUpcoming={{
          onClick: () => {
            setDataObj(data.filter((item) => item.status === 'upcoming'));

            router.push(
              `${pageRoutes.INTERVIEWER}?tab=mySchedules&filter=upcoming`
            );
          }
        }}
        onClickCompleted={{
          onClick: () => {
            setDataObj(data.filter((item) => item.status === 'completed'));
            router.push(
              `${pageRoutes.INTERVIEWER}?tab=mySchedules&filter=completed`
            );
          }
        }}
        onClickNotConfirmed={{
          onClick: () => {
            setDataObj(data.filter((item) => item.status === 'notconfirmed'));

            router.push(
              `${pageRoutes.INTERVIEWER}?tab=mySchedules&filter=confirmed`
            );
          }
        }}
        isUpcomingActive={router.query.filter === 'upcoming'}
        isAllActive={router.query.filter === 'all'}
        isCompletedActive={router.query.filter === 'completed'}
        isNotConfirmedActive={router.query.filter === 'confirmed'}
        slotInterviewScreenCard={dataObj.map((item, i) => {
          return (
            <Stack
              onClick={() => {
                router.push(`${pageRoutes.INTERVIEWER}/${item.id}`);
              }}
              key={i}
            >
              <InterviewScreenCard
                key={i}
                isUpcomingVisible={item.status !== 'completed'}
                isCompletedVisible={item.status !== 'upcoming'}
                slotMemberImage={<Members members={item.members} />}
                textDate={item.date.day}
                textTitle={item.name}
              />
            </Stack>
          );
        })}
      />
    </div>
  );
}

export default MySchedule;

export const data = [
  {
    id: '1',
    name: 'Phase 1: Interview for software engineer',
    status: 'completed',
    members: ['kishan', 'pradeep'],
    date: { day: 12 }
  },
  {
    id: '2',
    name: 'Phase 2: Interview for software engineer',
    status: 'upcoming',
    members: ['rohan', 'ramesh'],
    date: { day: 12 }
  },
  {
    id: '3',
    name: 'Phase 1: Interview for designer',
    status: 'upcoming',
    members: ['Mohan', 'Jay'],
    date: { day: 13 }
  },
  {
    id: '4',
    name: 'Phase 1: Interview for designer',
    status: 'upcoming',
    members: ['prakash', 'Vimlesh'],
    date: { day: 13 }
  },
  {
    id: '5',
    name: 'Phase 1: Interview for SDK2 engineer',
    status: 'completed',
    members: ['Arohi', 'Navin'],
    date: { day: 14 }
  },
  {
    id: '6',
    name: 'Phase 1: Interview for SDK2 engineer',
    status: 'upcoming',
    members: ['Sohan', 'Ganesh'],
    date: { day: 15 }
  }
];

export function Members({ members }) {
  return (
    <AvatarGroup max={3} total={5}>
      {members?.map((ele, i) => {
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
