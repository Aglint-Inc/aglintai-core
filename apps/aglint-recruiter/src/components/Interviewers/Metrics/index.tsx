import { DatabaseTable } from '@aglint/shared-types';
import { Avatar, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { InterviewerMetricList } from '@/devlink3/InterviewerMetricList';
import { InterviewerMetrics } from '@/devlink3/InterviewerMetrics';
import { MetricsLeaderboard } from '@/devlink3/MetricsLeaderboard';
import { useAllDepartments } from '@/src/queries/departments';

import Loader from '../../Common/Loader';
import { Filter } from '../components/Filter';
import { Interviewers } from '../components/Interviewers';
import { TrainingProgress } from '../components/MatricsTrainingProgress';
import { useLeaderBoard } from '../Hook';
import { LeaderAnalyticsFilterType } from '../types';

function Metrics() {
  const [leaderboardType, setLeaderboardType] =
    useState<LeaderAnalyticsFilterType['type']>('all_time');

  const [departments, setDepartments] = useState<
    DatabaseTable['departments']['id'][]
  >([]);

  const router = useRouter();
  const { data: interviewers, isLoading } = useLeaderBoard({
    departments,
    type: leaderboardType,
  });

  const { data: departmentList } = useAllDepartments();
  const leaderTypeFilterList: {
    name: string;
    value: LeaderAnalyticsFilterType['type'];
  }[] = [
    { name: 'All Time', value: 'all_time' },
    { name: 'Year', value: 'year' },
    { name: 'Month', value: 'month' },
    { name: 'Week', value: 'week' },
  ];

  const departmentFilterList = departmentList.map((dep) => ({
    name: dep.name,
    value: dep.id,
  }));

  // const departmentForDes = departmentFilterList
  //   .filter((dep) => departments.includes(dep.value))
  //   .map((dep) => dep.name);

  if (isLoading)
    return (
      <Stack
        height={'100%'}
        width={'100%'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Loader />
      </Stack>
    );

  return (
    <>
      <InterviewerMetrics
        slotFilter={
          <Stack direction={'row'} gap={2}>
            <Filter
              setSelectedItems={setDepartments}
              selectedItems={departments}
              itemList={departmentFilterList}
              title='Department'
            />
            <Filter
              setSelectedItems={setLeaderboardType}
              selectedItems={leaderboardType}
              itemList={leaderTypeFilterList}
              isSingle={true}
              nameIsTitle={true}
            />
          </Stack>
        }
        // textDescription={`Metrics showing for the ${leaderTypeFilterList.find((item) => item.value === leaderboardType).name}  ${departmentForDes.length ? 'for ' + departmentForDes.join(', ') : ''} `}
        slotFirstGrid={
          <>
            <MetricsLeaderboard
              slotInterviewerMetricsList={
                interviewers?.length > 0 ? (
                  interviewers.map((interviewer, i) => {
                    return (
                      <InterviewerMetricList
                        onClickCard={{
                          onClick: () =>
                            router.push(
                              `${process.env.NEXT_PUBLIC_HOST_NAME}/user/profile/${interviewer.user_id}`,
                            ),
                        }}
                        key={interviewer.user_id}
                        slotImage={
                          <Avatar
                            style={{
                              width: '32px',
                              height: '32px',
                            }}
                            src={interviewer.profile_image}
                            alt={interviewer.name}
                            variant='rounded-medium'
                          />
                        }
                        textCount={i + 1}
                        countHours={(interviewer.duration / 60).toFixed(1)}
                        countInterviews={interviewer.interviews}
                        textName={interviewer.name}
                        textRole={interviewer.position}
                        countDeclines={0}
                      />
                    );
                  })
                ) : (
                  <GlobalEmptyState
                    iconName={'monitoring'}
                    size={9}
                    textDesc={'No Data Available'}
                  />
                )
              }
            />
            <Interviewers />
          </>
        }
        slotMetrics={<TrainingProgress />}
      />
    </>
  );
}

export default Metrics;
