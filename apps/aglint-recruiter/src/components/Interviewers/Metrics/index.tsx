import { type DatabaseTable } from '@aglint/shared-types';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import { ScrollArea } from '@components/ui/scroll-area';
import { GlobalEmptyState } from '@devlink/GlobalEmptyState';
import { Trophy } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import UITypography from '@/components/Common/UITypography';
import { useAllInterviewModules } from '@/components/Scheduling/InterviewTypes/_common/hooks/useAllInterviewModules';
import { useAllDepartments } from '@/queries/departments';

import Loader from '../../Common/Loader';
import { Filter } from '../components/Filter';
import { InterviewerMetricList } from '../components/InterviewerMetricList';
import { InterviewerMetrics } from '../components/InterviewerMetrics';
import { Interviewers } from '../components/Interviewers';
import { useLeaderBoard } from '../Hook';
import { type LeaderAnalyticsFilterType } from '../types';

function Metrics() {
  const [leaderboardType, setLeaderboardType] =
    useState<LeaderAnalyticsFilterType['type']>('all_time');
  const { data: InterivewTypes } = useAllInterviewModules();

  const [selectedInterviewTypes, setInterviewTypes] = useState<string[]>([]);

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

  // Interview Type filter list
  const InterviewTypeOptions = InterivewTypes?.length
    ? InterivewTypes.map((type) => ({
        name: type.name,
        value: type.id,
      }))
    : [];
  // Filtering interviewers
  const selectedInterviewTypeUserIds = [
    ...new Set(
      InterivewTypes?.filter((interType) =>
        selectedInterviewTypes.includes(interType.id),
      )
        .map((interviewType) => interviewType.users.map((user) => user.user_id))
        .flat(),
    ),
  ];

  const isFilterApplied = !!selectedInterviewTypes.length;

  const filteredInterviewers = isFilterApplied
    ? interviewers?.length
      ? interviewers.filter((interviewer) => {
          const isInterviewType = selectedInterviewTypes?.length
            ? selectedInterviewTypeUserIds.includes(interviewer.user_id)
            : true;

          return isInterviewType;
        })
      : []
    : interviewers;

  if (isLoading)
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <Loader />
      </div>
    );

  return (
    <>
      <InterviewerMetrics
        slotFilter={
          <div className='flex flex-row gap-1'>
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
            <Filter
              itemList={
                InterviewTypeOptions?.length ? InterviewTypeOptions : []
              }
              title='Interview Types'
              setSelectedItems={setInterviewTypes}
              selectedItems={selectedInterviewTypes}
            />
          </div>
        }
        // textDescription={`Metrics showing for the ${leaderTypeFilterList.find((item) => item.value === leaderboardType).name}  ${departmentForDes.length ? 'for ' + departmentForDes.join(', ') : ''} `}
        slotFirstGrid={
          <>
            <Card className='h-[420px] p-4 border border-neutral-200 rounded-md'>
              <CardHeader className='px-4 py-0 mb-2'>
                <div className='flex gap-2 items-center'>
                  <Trophy size={14} />
                  <UITypography>Interviewer Leaderboard</UITypography>
                </div>
              </CardHeader>
              <CardContent className='p-0 mt-1'>
                <ScrollArea className='h-[378px] px-1 '>
                  {filteredInterviewers?.length > 0 ? (
                    filteredInterviewers.map((interviewer, i) => {
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
                            <>
                              <Avatar className='h-8 w-8'>
                                <AvatarImage
                                  src={interviewer.profile_image}
                                  alt={interviewer.name}
                                />
                                <AvatarFallback>
                                  {interviewer.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                            </>
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
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
            <Interviewers />
          </>
        }
      />
    </>
  );
}

export default Metrics;
