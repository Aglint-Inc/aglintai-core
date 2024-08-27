import { getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Box, Checkbox, Stack, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { useJobs } from '@/src/context/JobsContext';
import { initUser } from '@/src/pages/api/interviewers';
import { useAllDepartments } from '@/src/queries/departments';
import { useAllOfficeLocations } from '@/src/queries/officeLocations';
import dayjs from '@/src/utils/dayjs';

import Loader from '../../Common/Loader';
import { useAllInterviewModules } from '../../Scheduling/InterviewTypes/queries/hooks';
import { Filter } from '../components/Filter';
import { useAvailabilty } from '../Hook';
import { Event, EventFilling, groupByDate } from './utils';

const timeToPx = (hours, minutes) => {
  return hours * 60 * 0.133 + minutes * 0.133;
};

const TimeLineCalendar = () => {
  const dayCount = 10;

  const startDate = dayjsLocal().startOf('day').add(0, 'day');
  const endDate = dayjsLocal().endOf('day').add(dayCount, 'day');
  const { data: allInterviewers, isLoading } = useAvailabilty({
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  });

  const {
    jobs: { data: Jobs },
  } = useJobs();
  const { data: departments } = useAllDepartments();
  const { data: locations } = useAllOfficeLocations();

  const [selectedJobs, setJobs] = useState<string[]>([]);
  const [selectedDepartments, setDepartments] = useState<number[]>([]);
  const [selectedLocations, setLocations] = useState<number[]>([]);
  const [selectedInterviewTypes, setInterviewTypes] = useState<string[]>([]);
  const { data: InterivewTypes } = useAllInterviewModules();

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

  const isFilterApplied =
    !!selectedDepartments.length ||
    !!selectedJobs.length ||
    !!selectedLocations.length ||
    !!selectedInterviewTypes.length;

  const filteredInterviewers = isFilterApplied
    ? allInterviewers.filter((interviewer) => {
        const isInterviewType = selectedInterviewTypes?.length
          ? selectedInterviewTypeUserIds.includes(interviewer.user_id)
          : true;

        const isDepartment = selectedDepartments?.length
          ? selectedDepartments.includes(interviewer.department_id)
          : true;

        const isJobs = selectedJobs?.length
          ? selectedJobs.some((job_id) =>
              interviewer?.job_ids?.includes(job_id),
            )
          : true;

        const isLocation = selectedLocations.length
          ? selectedLocations.includes(interviewer.office_location_id)
          : true;

        return isDepartment && isLocation && isJobs && isInterviewType;
      })
    : allInterviewers;

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
    <Stack>
      <Stack p={2}>
        <Stack direction={'row'} gap={1} alignItems={'center'}>
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
            itemList={InterviewTypeOptions?.length ? InterviewTypeOptions : []}
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
                  setLocations([]);
                  setDepartments([]);
                  setJobs([]);
                },
              }}
            />
          )}
        </Stack>
      </Stack>
      <AvailabilityView
        allInterviewers={filteredInterviewers}
        dayCount={dayCount}
      />
    </Stack>
  );
};

export default TimeLineCalendar;

const AvailabilityView = ({
  allInterviewers,
  dayCount,
}: {
  allInterviewers: initUser[];
  dayCount: number;
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      {/* Left Column for Interviewer Names and Timezones */}
      <Box
        sx={{
          minWidth: 120,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {allInterviewers.map((interviewer) => (
          <Box
            key={getFullName(interviewer.first_name, interviewer.last_name)}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 1,
              gap: 1,
            }}
          >
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 1,
              }}
            >
              <Checkbox />
              <Typography variant='body1'>
                {getFullName(interviewer.first_name, interviewer.last_name)}
              </Typography>
              <Typography variant='caption'>
                (
                {dayjsLocal()
                  .tz(interviewer.scheduling_settings.timeZone.tzCode)
                  .format('z')}
                )
              </Typography>
            </Stack>
            <StatusGlyph isConnected={interviewer.isCalenderConnected} />
          </Box>
        ))}
      </Box>

      {/* Scrollable View for Time Blocks */}
      <Box
        sx={{
          // position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'auto',
          gap: 2,
          marginRight: '20px',
        }}
      >
        {allInterviewers.map((interviewer, index) => {
          if (!interviewer.isCalenderConnected)
            return <Box key={index} minHeight={'36px'}></Box>;
          const timeZoneOffset = dayjsLocal()
            .tz(interviewer.scheduling_settings.timeZone.tzCode)
            .utcOffset(); // Time zone offset in minutes
          const referenceOffset = dayjsLocal.utc().utcOffset(); // UTC offset in minutes (0 for UTC)
          const totalOffset = timeZoneOffset - referenceOffset; // Difference in minutes

          const timeZoneLeftOffset = (totalOffset / 60) * 8; // Convert offset from minutes to pixels (1 hour = 8px)

          const intervierEvents = interviewer.all_events
            .filter((event) => event.start.dateTime)
            .map((event) => ({
              start: {
                ...event.start,
                startPx: timeToPx(
                  dayjs(event.start.dateTime).format('H'),
                  dayjs(event.start.dateTime).format('m'),
                ),
              },
              end: {
                ...event.end,
                endPx: timeToPx(
                  dayjs(event.end.dateTime).format('H'),
                  dayjs(event.end.dateTime).format('m'),
                ),
              },
              type: event.type,
            }));

          const dateGrouped = groupByDate(
            intervierEvents,
            dayCount,
          ) as Event[][];

          const interviewerEvent = dateGrouped.map((dg, index) =>
            EventFilling(
              dg,
              interviewer.scheduling_settings.timeZone.tzCode,
              index,
            ),
          );

          return (
            <TimeLineList
              key={index}
              timeZoneLeftOffset={timeZoneLeftOffset}
              interviewerEvent={interviewerEvent}
            />
          );
        })}
      </Box>
    </Box>
  );
};

const StatusGlyph = ({ isConnected }) => (
  <Tooltip
    title={isConnected ? 'Calendar Connected' : 'Calendar Not Connected'}
  >
    <Stack>
      <GlobalIcon
        size={4}
        color={isConnected ? 'success' : 'error'}
        iconName={isConnected ? 'check_circle' : 'cancel'}
      />
    </Stack>
  </Tooltip>
);

const TimeLineList = ({ timeZoneLeftOffset, interviewerEvent }) => {
  return (
    // whole box
    <Box
      sx={{
        display: 'flex',
        padding: 1,
        position: 'relative',
        left: `-${timeZoneLeftOffset}px`,
      }}
    >
      {/* each day */}
      {interviewerEvent.map((events, i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Typography
            variant='body2'
            sx={{
              position: 'absolute',
              top: '-8px',
              color: 'var(--neutral-9)',
            }}
          >
            {dayjsLocal().add(i, 'day').format('DD MMMM')}
          </Typography>
          <Box
            sx={{
              width: 192,
              height: 20,
              borderRadius: 5,
              display: 'flex',
              overflow: 'hidden',
            }}
          >
            {events.map((event, hour) => {
              return (
                <>
                  <Box
                    key={hour}
                    sx={{
                      width:
                        event.type === 'morning_sleep'
                          ? `${event.end.endPx}px`
                          : event.type === 'night_sleep'
                            ? `${192 - event.start.startPx}px`
                            : `${event.end.endPx - event.start.startPx}px`,
                      height: '100%',
                      backgroundColor: eventColor(event.type),
                    }}
                  />
                </>
              );
            })}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

const eventColor = (type) => {
  const calendarEvent = 'var(--neutral-4)';
  const Available = 'var(--success-a6)';
  const morningSleep = 'var(--neutral-4)';
  const nightSleep = 'var(--neutral-4)';

  const soft = 'var(--warning-a6)';
  const freeTime = 'var(--success-a6)';
  const outStand = 'var(--error-a6)';
  const recruitingBlocks = 'var(--success-a6)';

  return type === 'cal_event'
    ? calendarEvent
    : type === 'soft'
      ? soft
      : type === 'free_time'
        ? freeTime
        : type === 'ooo'
          ? outStand
          : type === 'recruiting_blocks'
            ? recruitingBlocks
            : type === 'empty_event'
              ? Available
              : type === 'morning_sleep'
                ? morningSleep
                : type === 'night_sleep'
                  ? nightSleep
                  : 'var(--neutral-11)';
};
