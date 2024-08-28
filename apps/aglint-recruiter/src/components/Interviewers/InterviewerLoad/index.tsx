import { getFullName } from '@aglint/shared-utils';
import { Avatar, Stack } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { InterviewerWorkload } from '@/devlink3/InterviewerWorkload';
import { InterviewWorkloadList } from '@/devlink3/InterviewWorkloadList';
import { useJobs } from '@/src/context/JobsContext';
import { allInterviewerType } from '@/src/pages/api/interviewers/getAllInterviewers';
import { useAllDepartments } from '@/src/queries/departments';
import { useAllOfficeLocations } from '@/src/queries/officeLocations';
import dayjs from '@/src/utils/dayjs';
import ROUTES from '@/src/utils/routing/routes';

import Loader from '../../Common/Loader';
import { useAllInterviewModules } from '../../Scheduling/InterviewTypes/queries/hooks';
import { Filter } from '../components/Filter';
import { useAllInterviewer } from '../Hook';
import LineGraph from './LineGraph';

function InterviewerLoad() {
  const { data: departments } = useAllDepartments();
  const { data: InterivewTypes } = useAllInterviewModules();
  const { data: locations } = useAllOfficeLocations();

  const [selectedInterviewTypes, setInterviewTypes] = useState<string[]>([]);
  const [selectedJobs, setJobs] = useState<string[]>([]);
  const [selectedDepartments, setDepartments] = useState<number[]>([]);
  const [selectedLocations, setLocations] = useState<number[]>([]);

  const [dayCount, setDayCount] = useState<number>(0);

  const endDay = dayjs().startOf('day').subtract(dayCount, 'month');

  const startDay = dayjs()
    .startOf('day')
    .subtract(1 + dayCount, 'month');

  const { data: interviewers, isLoading } = useAllInterviewer({
    department_ids_params: selectedDepartments,
    end_time_param: endDay.toISOString(),
    start_time_param: startDay.toISOString(),
    job_ids_params: selectedJobs,
    module_ids_params: selectedInterviewTypes,
    office_location_ids_params: selectedLocations,
  });

  const {
    jobs: { data: Jobs },
  } = useJobs();

  //Location filter List
  const locationList = locations?.length
    ? locations.map((loc) => ({
        name: loc.city + ', ' + loc.region + ', ' + loc.country,
        value: loc.id,
      }))
    : [];

  //Department filter list
  const departmentList = departments?.length
    ? departments.map((dep) => ({ name: dep.name, value: dep.id }))
    : [];

  //Job filter List
  const JobsList = Jobs?.length
    ? Jobs.map((job) => ({
        name: job.job_title,
        value: job.id,
      }))
    : [];

  // Interview Type filter list
  const InterviewTypeOptions = InterivewTypes?.length
    ? InterivewTypes.map((type) => ({
        name: type.name,
        value: type.id,
      }))
    : [];

  const isFilterApplied =
    !!selectedDepartments.length ||
    !!selectedJobs.length ||
    !!selectedLocations.length ||
    !!selectedInterviewTypes.length;

  // calculate max count for height of the graph
  let maxCount = 10;

  if (interviewers?.length)
    interviewers.map((interviewer) => {
      if (interviewer.completed_meeting_last_month) {
        const value = Math.max(
          ...Object.values(interviewer.completed_meeting_last_month),
        );
        if (value > maxCount) maxCount = value;
      }
    });

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

  const sortedByCount = interviewers?.length
    ? interviewers.sort((a, b) => {
        const aa = a.completed_meetings || {};
        const bb = b.completed_meetings || {};
        return Object.values(bb).length - Object.values(aa).length;
      })
    : [];

  return (
    <>
      <InterviewerWorkload
        textDateRange={`${startDay.format('DD MMM YYYY')} - ${endDay.format('DD MMM YYYY')}`}
        onClickRight={{
          onClick: () => {
            setDayCount((pre) => (pre > 0 ? pre - 1 : 0));
          },
        }}
        onClickLeft={{
          onClick: () => {
            setDayCount((pre) => pre + 1);
          },
        }}
        slotFilter={
          <Stack direction={'row'} gap={1}>
            <Filter
              itemList={JobsList?.length ? JobsList : []}
              title='Jobs'
              setSelectedItems={setJobs}
              selectedItems={selectedJobs}
            />
            <Filter
              itemList={departmentList?.length ? departmentList : []}
              title='Departments'
              setSelectedItems={setDepartments}
              selectedItems={selectedDepartments}
            />
            <Filter
              itemList={locationList?.length ? locationList : []}
              title='Locations'
              setSelectedItems={setLocations}
              selectedItems={selectedLocations}
            />
            <Filter
              itemList={
                InterviewTypeOptions?.length ? InterviewTypeOptions : []
              }
              title='Interview Types'
              setSelectedItems={setInterviewTypes}
              selectedItems={selectedInterviewTypes}
            />
            {isFilterApplied && (
              <ButtonSoft
                size={1}
                color={'neutral'}
                iconName={'refresh'}
                isLeftIcon
                textButton={'Reset All'}
                onClickButton={{
                  onClick: () => {
                    setInterviewTypes([]);
                    setLocations([]);
                    setDepartments([]);
                    setJobs([]);
                  },
                }}
              />
            )}
          </Stack>
        }
        slotInterviewWorkloadList={
          sortedByCount?.length ? (
            sortedByCount.map((interviewer) => (
              <InterviewerCard
                key={interviewer.user_id}
                interviewer={interviewer}
                maxMeetingCount={maxCount}
              />
            ))
          ) : (
            <Stack padding={'16px'} bgcolor={'white'}>
              <GlobalEmptyState
                iconName={'monitoring'}
                size={9}
                textDesc={'No Data Available'}
              />
            </Stack>
          )
        }
      />
    </>
  );
}

export default InterviewerLoad;

const InterviewerCard = ({
  interviewer,
  maxMeetingCount,
}: {
  interviewer: allInterviewerType[number];
  maxMeetingCount: number;
}) => {
  const pastMonthDates = Array.from({ length: 30 }, (_, i) =>
    dayjs().subtract(i, 'day').format('D-M-YYYY'),
  );
  const pastMontCount = interviewer.completed_meetings || {};

  const transformedObject = Object.keys(pastMontCount).reduce((acc, key) => {
    const formattedKey = dayjs(key).format('D-M-YYYY');
    // eslint-disable-next-line security/detect-object-injection
    acc[formattedKey] = pastMontCount[key];
    return acc;
  }, {});

  const resultArray = pastMonthDates.map((date) => {
    // eslint-disable-next-line security/detect-object-injection
    return transformedObject[date] || 0;
  });

  return (
    <Link
      href={ROUTES['/user/profile/[user_id]']({ user_id: interviewer.user_id })}
    >
      <InterviewWorkloadList
        key={interviewer.user_id}
        slotImage={
          <Avatar
            src={interviewer.profile_image}
            variant='rounded'
            alt={interviewer.first_name}
            style={{
              width: '32px',
              height: '32px',
            }}
          />
        }
        slotWorkloadGraph={
          <LineGraph lineData={resultArray} maxMeetingCount={maxMeetingCount} />
        }
        textRole={interviewer.position || '--'}
        textName={getFullName(interviewer.first_name, interviewer.last_name)}
      />
    </Link>
  );
};
