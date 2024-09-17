import { Avatar, Stack } from '@mui/material';
import { HardDrive } from 'lucide-react';
import { useMemo, useState } from 'react';

import Loader from '@/components/Common/Loader';
import { HistoryPillShadcn } from '@/components/Common/Member/HistoryPill';
import { type SchedulingAnalyticsContextType } from '@/context/SchedulingAnalytics';
import { useJobs } from '@/jobs/hooks';
import { useAllDepartments } from '@/queries/departments';
import { useAllOfficeLocations } from '@/queries/officeLocations';

import { Filter } from '../components/Filter';
import { InterviewerTraining } from '../components/InterviewerTraining';
import { InterviewerTrainingList } from '../components/InterviewerTrainingList';
import { useTrainingProgress } from '../Hook';

function TrainingProgress() {
  const {
    jobs: { data: Jobs },
  } = useJobs();
  const { data: departments } = useAllDepartments();
  const { data: locations } = useAllOfficeLocations();

  const [selectedJobs, setJobs] = useState<string[]>([]);
  const [selectedDepartments, setDepartments] = useState<number[]>([]);
  const [selectedLocations, setLocations] = useState<number[]>([]);

  const { data, isLoading } = useTrainingProgress({
    departments: selectedDepartments,
    jobs: selectedJobs,
    locations: selectedLocations,
  });

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
      <InterviewerTraining
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
          </Stack>
        }
        textDateRange={<></>}
        slotInterviewerTrainnigList={
          data?.length ? (
            data.map((interviewer) => (
              <>
                <InterviewerTrainingList
                  key={interviewer.user_id}
                  textName={interviewer.name}
                  textRole={interviewer.position}
                  slotTrainingProgress={<Pills {...interviewer} />}
                  slotImage={
                    <Avatar
                      // src={interviewer.}
                      style={{ width: '32px', height: '32px' }}
                      alt={interviewer.name}
                    />
                  }
                />
              </>
            ))
          ) : (
            <div className='flex h-[200px] flex-col items-center justify-center bg-white p-4'>
              <div className='mb-2'>
                <HardDrive className='h-9 w-9 text-gray-500' />
              </div>
              <p className='text-sm text-gray-500'>No Data Available</p>
            </div>
          )
        }
      />
    </>
  );
}

export default TrainingProgress;

type Props = Pick<SchedulingAnalyticsContextType['training_progress'], 'data'>;

const Pills = ({
  noreverseshadow,
  noshadow,
  number_of_reverse_shadow,
  number_of_shadow,
}: Pick<
  Props['data'][number],
  | 'noreverseshadow'
  | 'noshadow'
  | 'number_of_reverse_shadow'
  | 'number_of_shadow'
>) => {
  const pillData = useMemo(
    () =>
      [
        ...[...new Array(number_of_shadow)].map(() => ({
          shadow: true,
          active: true,
        })),
        ...[...new Array(noshadow - number_of_shadow)].map(() => ({
          shadow: true,
          active: false,
        })),
        ...[...new Array(number_of_reverse_shadow)].map(() => ({
          shadow: false,
          active: true,
        })),
        ...[...new Array(noreverseshadow - number_of_reverse_shadow)].map(
          () => ({
            shadow: false,
            active: false,
          }),
        ),
      ] satisfies { shadow: boolean; active: boolean }[],
    [number_of_shadow, noshadow, number_of_reverse_shadow, number_of_shadow],
  );

  const maxLength = useMemo(() => pillData.length, [pillData]);

  return (
    <>
      {pillData.map(({ active, shadow }, index) => (
        <HistoryPillShadcn
          key={index}
          isActive={active}
          isShadow={shadow}
          isReverseShadow={!shadow}
          position={
            index === 0 ? 'start' : index === maxLength - 1 ? 'end' : ''
          }
        />
      ))}
    </>
  );
};
