import { getFullName } from '@aglint/shared-utils';
import { Avatar, Stack } from '@mui/material';
import { useState } from 'react';

import { InterviewerWorkload } from '@/devlink3/InterviewerWorkload';
import { InterviewWorkloadList } from '@/devlink3/InterviewWorkloadList';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';
import { useAllDepartments } from '@/src/queries/departments';
import { useAllOfficeLocations } from '@/src/queries/officeLocations';
import dayjs from '@/src/utils/dayjs';

import Loader from '../../Common/Loader';
import { Filter } from '../components/Filter';
import { useAllInterviewer, useAllInterviewerType } from '../Hook';
import LineGraph from './LineGraph';

function InterviewerLoad() {
  const { recruiter } = useAuthDetails();
  const { data: interviewers, isLoading } = useAllInterviewer(recruiter.id);
  const { data: departments } = useAllDepartments();
  const { data: locations } = useAllOfficeLocations();
  const [selectedInterviewTypes, setInterviewTypes] = useState<string[]>([]);
  const [selectedJobs, setJobs] = useState<string[]>([]);
  const [selectedDepartments, setDepartments] = useState<string[]>([]);
  const [selectedLocations, setLocations] = useState<string[]>([]);

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
  const allInterviewTypes = interviewers?.length
    ? [
        ...new Set(
          interviewers
            .map((interviewer) => [
              ...interviewer.qualified_module_names,
              ...interviewer.training_module_names,
            ])
            .flat()
            .filter((interviewType) => interviewType),
        ),
      ]
    : [];

  const InterviewTypeOptions = allInterviewTypes.map((type) => ({
    name: type,
    value: type.replace(/\s+/g, '').toLowerCase(),
  }));

  // filtering the interviewers
  const filteredInters = interviewers?.filter((interviewer) => {
    const qualifedType = interviewer.qualified_module_names.some((interType) =>
      selectedInterviewTypes.includes(
        interType?.replace(/\s+/g, '').toLowerCase(),
      ),
    );
    const trainingType = interviewer.training_module_names.some((interType) =>
      selectedInterviewTypes.includes(
        interType?.replace(/\s+/g, '').toLowerCase(),
      ),
    );

    return qualifedType || trainingType;
  });

  const filteredInterviewers =
    filteredInters?.length === 0 ? interviewers : filteredInters;

  // calculate max count for height of the graph
  let maxCount = 5;

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

  return (
    <>
      <InterviewerWorkload
        textDateRange={`${dayjs().subtract(1, 'month').format('DD MMM YYYY')} - ${dayjs().format('DD MMM YYYY')}`}
        slotFilter={
          <Stack direction={'row'} gap={1}>
            <Filter
              itemList={
                InterviewTypeOptions?.length ? InterviewTypeOptions : []
              }
              title='Interview Types'
              setSelectedItems={setInterviewTypes}
              selectedItems={selectedInterviewTypes}
            />
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
          </Stack>
        }
        slotInterviewWorkloadList={filteredInterviewers.map((interviewer) => (
          <InterviewerCard
            key={interviewer.user_id}
            interviewer={interviewer}
            maxMeetingCount={maxCount}
          />
        ))}
      />
    </>
  );
}

export default InterviewerLoad;

const InterviewerCard = ({
  interviewer,
  maxMeetingCount,
}: {
  interviewer: useAllInterviewerType['data'][number];
  maxMeetingCount: number;
}) => {
  const pastMonthDates = Array.from({ length: 30 }, (_, i) =>
    dayjs().subtract(i, 'day').toISOString(),
  );

  const pastMontCount = interviewer.completed_meeting_last_month || {};

  // eslint-disable-next-line security/detect-object-injection
  const resultArray = pastMonthDates.map((date) => pastMontCount[date] || 0);

  return (
    <InterviewWorkloadList
      key={interviewer.user_id}
      slotImage={
        <Avatar
          src={interviewer.profile_image}
          variant='rounded'
          alt={interviewer.first_name}
          sx={{ height: '24px', width: '24px' }}
        />
      }
      slotWorkloadGraph={
        <LineGraph lineData={resultArray} maxMeetingCount={maxMeetingCount} />
      }
      textRole={interviewer.position}
      textName={getFullName(interviewer.first_name, interviewer.last_name)}
    />
  );
};
