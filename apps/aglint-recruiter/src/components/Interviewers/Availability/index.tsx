/* eslint-disable security/detect-object-injection */
import { getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import {
  Box,
  Checkbox,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { GlobalBadge } from '@/devlink/GlobalBadge';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { ProgressHoverCard } from '@/devlink/ProgressHoverCard';
import { useJobs } from '@/src/context/JobsContext';
import {
  initUser,
  initUserUIGroupedByDate,
} from '@/src/pages/api/interviewers';
import { useAllDepartments } from '@/src/queries/departments';
import { useAllOfficeLocations } from '@/src/queries/officeLocations';
import dayjs from '@/src/utils/dayjs';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import Loader from '../../Common/Loader';
import { useAllInterviewModules } from '../../Scheduling/InterviewTypes/queries/hooks';
import { Filter } from '../components/Filter';
import { useAvailabilty } from '../Hook';
import { CalendarEventWithType, EventType } from '../types';
import {
  afterWorkingEndTime,
  color,
  earlyMorningstartTime,
  eventAbbrivation,
  eventColor,
  getLocalSortedInterviewerIds,
  groupByDate,
  joinUsersEvents,
  oneDayPx,
  pulse,
  setLocalSortedInterviewerIds,
  sortedUserByChecked,
  splitHourAndMin,
  timeToPx,
} from './utils';

const TimeLineCalendar = () => {
  const {
    data: allInterviewerPages,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useAvailabilty();

  const Interviewers = allInterviewerPages?.pages;

  const allInterviewers = Interviewers?.length
    ? joinUsersEvents(Interviewers)
    : [];

  const dayCount = allInterviewerPages?.pageParams.length * 10;
  const [allInter, setAllInter] = useState<initUser[]>(allInterviewers);

  useEffect(() => {
    if (allInterviewers?.length && dayCount === 10) {
      setAllInter(allInterviewers);
    } else if (allInterviewers?.length && dayCount > 10 && !isLoading) {
      const oldInterviewerEvent = allInter.sort((a, b) =>
        a.user_id.toLowerCase().localeCompare(b.user_id.toLowerCase()),
      );
      const newInterviewerEvent = allInterviewers.sort((a, b) =>
        a.user_id.toLowerCase().localeCompare(b.user_id.toLowerCase()),
      );

      const InterviewerAddedEvents = oldInterviewerEvent.map((ini, i) => ({
        ...ini,
        // eslint-disable-next-line security/detect-object-injection
        all_events: [...ini.all_events, ...newInterviewerEvent[i].all_events],
      }));

      setAllInter(InterviewerAddedEvents);
    }
  }, [allInterviewerPages]);

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
    ? allInter.filter((interviewer) => {
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
    : allInter;

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

  const calconnectedInterviewers = filteredInterviewers.filter(
    (interviewer) => interviewer?.isCalenderConnected,
  );
  const NotCalconnectedInterviewers = filteredInterviewers.filter(
    (interviewer) => !interviewer?.isCalenderConnected,
  );

  return (
    <Stack>
      <Stack p={2}>
        <Stack
          direction={'row'}
          gap={1}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Stack direction={'row'} gap={1} alignItems={'center'}>
            {isLoading && <p>loading </p>}
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
                    setLocations([]);
                    setDepartments([]);
                    setJobs([]);
                  },
                }}
              />
            )}
          </Stack>
          {/* Legent */}
          <Stack direction={'row'} gap={1}>
            {Object.keys(color).map((name, i) => {
              return (
                <Stack key={i} direction={'row'} gap={1} alignItems={'center'}>
                  <Box
                    sx={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '8px',
                      // eslint-disable-next-line security/detect-object-injection
                      bgcolor: color[name],
                    }}
                  ></Box>
                  <Typography>{capitalizeAll(name)}</Typography>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </Stack>
      <AvailabilityView
        allInterviewers={calconnectedInterviewers}
        fetchNextPage={fetchNextPage}
        daysCountUI={dayCount}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
      />
      <Typography fontWeight={500} pl={2} mt={3} mb={2}>
        Calendar Not Connect Interviewers
      </Typography>
      <AvailabilityView allInterviewers={NotCalconnectedInterviewers} />
    </Stack>
  );
};

export default TimeLineCalendar;

const AvailabilityView = ({
  allInterviewers,
  daysCountUI,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
}: {
  allInterviewers: initUser[];
  daysCountUI?: number;
  fetchNextPage?: any;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  isLoading?: boolean;
}) => {
  const [checkedInterviewers, setCheckedInterviewers] = useState<string[]>([]);

  const sortedInterviewers = sortedUserByChecked(allInterviewers);

  useEffect(() => {
    const ids = getLocalSortedInterviewerIds();
    setCheckedInterviewers(ids);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const handleScroll = () => {
    if (!containerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

    if (
      scrollLeft + clientWidth >= scrollWidth - 100 &&
      !isLoading &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

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
        {sortedInterviewers.map((interviewer) => (
          <MemberList
            key={interviewer.user_id}
            interviewer={interviewer}
            checkedInterviewers={checkedInterviewers}
            setCheckedInterviewers={setCheckedInterviewers}
          />
        ))}
      </Box>

      {/* Scrollable View for Time Blocks */}
      <Box
        ref={containerRef}
        onScroll={handleScroll}
        sx={{
          // position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'auto',
          gap: 2,
          marginRight: '20px',
          // bgcolor: 'red',
        }}
      >
        {sortedInterviewers.map((interviewer, index) => {
          if (!interviewer.isCalenderConnected)
            return <Box key={index} minHeight={'36px'}></Box>;

          const timeZoneOffset = dayjsLocal()
            .tz(interviewer.scheduling_settings.timeZone.tzCode)
            .utcOffset(); // Time zone offset in minutes
          const referenceOffset = dayjsLocal.utc().utcOffset(); // UTC offset in minutes (0 for UTC)
          const totalOffset = timeZoneOffset - referenceOffset; // Difference in minutes

          const timeZoneLeftOffset = (totalOffset / 60) * 8; // Convert offset from minutes to pixels (1 hour = 8px)

          //filter only start time is present
          const intervierEvents = interviewer.all_events.filter(
            (event) => event.start.dateTime,
          ) as CalendarEventWithType;

          const interviewerWithFilteredEvent = {
            ...interviewer,
            all_events: groupByDate({
              events: intervierEvents,
              dayCount: daysCountUI,
            }),
          } as initUserUIGroupedByDate;

          return (
            <TimeLineList
              key={index}
              timeZoneLeftOffset={timeZoneLeftOffset}
              interviewer={interviewerWithFilteredEvent}
              hasNextPage={hasNextPage}
            />
          );
        })}
      </Box>
    </Box>
  );
};

const MemberList = ({
  interviewer,
  setCheckedInterviewers,
  checkedInterviewers,
}: {
  interviewer: initUser;
  setCheckedInterviewers: Dispatch<SetStateAction<string[]>>;
  checkedInterviewers: string[];
}) => {
  const [isHover, setIsHover] = useState(false);

  const isCheckBoxVisible =
    checkedInterviewers.includes(interviewer.user_id) || isHover;

  const checkHandle = () => {
    const newIds = checkedInterviewers.includes(interviewer.user_id)
      ? checkedInterviewers.filter((p) => p !== interviewer.user_id)
      : [...checkedInterviewers, interviewer.user_id];

    setCheckedInterviewers(newIds);
    setLocalSortedInterviewerIds(newIds);
  };
  return (
    <Box
      key={getFullName(interviewer.first_name, interviewer.last_name)}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: 290,
        padding: 1,
        gap: 1,
      }}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
        }}
        onClick={checkHandle}
      >
        <Stack width={20}>
          {isCheckBoxVisible && (
            <Checkbox
              checked={checkedInterviewers.includes(interviewer.user_id)}
            />
          )}
        </Stack>
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
  );
};

const TimeLineList = ({
  timeZoneLeftOffset,
  interviewer,
  hasNextPage,
}: {
  timeZoneLeftOffset: number;
  hasNextPage?: boolean;
  interviewer: initUserUIGroupedByDate;
}) => {
  const [breakStartHour, breakStartMinute, breakEndHour, breakEndMinute] =
    splitHourAndMin({
      startTime:
        interviewer.scheduling_settings?.break_hour?.start_time || '0:0',
      endTime: interviewer.scheduling_settings?.break_hour?.end_time || '0:0',
    });

  const breakWidth =
    timeToPx(breakEndHour, breakEndMinute) -
    timeToPx(breakStartHour, breakStartMinute);

  const [earlyMorningStartHour, earlyMorningStartMinute] =
    earlyMorningstartTime;
  const [afterWorkingEndHour, afterWorkingEndMinute] = afterWorkingEndTime;

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
      {/* each loop is each day */}
      {interviewer.all_events.map((day, i) => {
        const todayIndex = dayjs().add(i, 'day').day();

        const [
          workingstartHour,
          workingstartMinute,
          workingendHour,
          workingendMinute,
        ] = splitHourAndMin({
          ...interviewer.scheduling_settings.workingHours[todayIndex].timeRange,
        });

        const isHoliday =
          // eslint-disable-next-line security/detect-object-injection
          !interviewer.scheduling_settings.workingHours[todayIndex].isWorkDay;

        return (
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
                zIndex: 6,
                fontSize: 10,
                backgroundColor: 'white',
                padding: 0,
                lineHeight: 0,
              }}
            >
              {dayjsLocal().add(i, 'day').format('ddd DD MMM')}
            </Typography>
            <Box
              sx={{
                width: oneDayPx,
                height: 20,
                borderRadius: 5,
                display: 'flex',
                overflow: 'hidden',
                bgcolor: eventColor('bg'),
                position: 'relative',
              }}
            >
              {/* working hour */}
              <Tooltip
                title={
                  <TimeHoverCard
                    title={isHoliday ? 'Holiday' : 'Working Hour'}
                    index={i}
                    start_time={{
                      hour: workingstartHour,
                      min: workingstartMinute,
                    }}
                    end_time={{
                      hour: workingendHour,
                      min: workingendMinute,
                    }}
                  />
                }
              >
                <Box
                  sx={{
                    width:
                      timeToPx(workingendHour, workingendMinute) -
                      timeToPx(workingstartHour, workingstartMinute),
                    height: '20px',
                    bgcolor: eventColor(
                      isHoliday ? 'company_off' : 'working_hour',
                    ),
                    position: 'absolute',
                    top: 0,
                    left: timeToPx(workingstartHour, workingstartMinute),
                    zIndex: 1,
                  }}
                />
              </Tooltip>
              {/* Early morning */}
              <Tooltip
                title={
                  <TimeHoverCard
                    title={isHoliday ? 'Holiday' : 'Early Morning'}
                    index={i}
                    start_time={{
                      hour: earlyMorningStartHour,
                      min: earlyMorningStartMinute,
                    }}
                    end_time={{
                      hour: workingstartHour,
                      min: workingstartMinute,
                    }}
                  />
                }
              >
                <Box
                  sx={{
                    width:
                      timeToPx(workingstartHour, workingstartMinute) -
                      timeToPx(earlyMorningStartHour, earlyMorningStartMinute),
                    height: '20px',
                    bgcolor: eventColor(
                      isHoliday ? 'company_off' : 'early_morning',
                    ),
                    position: 'absolute',
                    top: 0,
                    left: timeToPx(
                      earlyMorningStartHour,
                      earlyMorningStartMinute,
                    ),
                    zIndex: 2,
                  }}
                />
              </Tooltip>
              {/* After working */}
              <Tooltip
                title={
                  <TimeHoverCard
                    title={isHoliday ? 'Holiday' : 'After Working'}
                    index={i}
                    start_time={{
                      hour: workingendHour,
                      min: workingendMinute,
                    }}
                    end_time={{
                      hour: afterWorkingEndHour,
                      min: afterWorkingEndMinute,
                    }}
                  />
                }
              >
                <Box
                  sx={{
                    width:
                      timeToPx(afterWorkingEndHour, afterWorkingEndMinute) -
                      timeToPx(workingendHour, workingendMinute),
                    height: '20px',
                    bgcolor: eventColor(
                      isHoliday ? 'company_off' : 'after_work',
                    ),
                    position: 'absolute',
                    top: 0,
                    left: timeToPx(workingendHour, workingendMinute),
                    zIndex: 2,
                  }}
                />
              </Tooltip>
              {/* Break time */}
              {breakWidth && !isHoliday ? (
                <Tooltip
                  title={
                    <TimeHoverCard
                      title={isHoliday ? 'Holiday' : 'Break'}
                      index={i}
                      start_time={{
                        hour: breakStartHour,
                        min: breakStartMinute,
                      }}
                      end_time={{
                        hour: breakEndHour,
                        min: breakEndMinute,
                      }}
                    />
                  }
                >
                  <Box
                    sx={{
                      width: breakWidth,
                      height: '20px',
                      bgcolor: eventColor('break'),
                      position: 'absolute',
                      top: 0,
                      left: timeToPx(breakStartHour, breakStartMinute),
                      zIndex: 3,
                    }}
                  />
                </Tooltip>
              ) : (
                <></>
              )}
              {day.map((event) => {
                const eventStartHour = dayjsLocal(event.start.dateTime).hour();
                const eventStartMinute = dayjsLocal(
                  event.start.dateTime,
                ).minute();
                const eventEndHour = dayjsLocal(event.end.dateTime).hour();
                const eventEndMinute = dayjsLocal(
                  event.start.dateTime,
                ).minute();

                return (
                  <>
                    <Tooltip
                      title={
                        <TooltipComp
                          start_time={event.start.dateTime}
                          end_time={event.end.dateTime}
                          status={eventAbbrivation(event.type as EventType)}
                          title={event.summary}
                        />
                      }
                    >
                      <Box
                        sx={{
                          width:
                            timeToPx(eventEndHour, eventEndMinute) -
                            timeToPx(eventStartHour, eventStartMinute),
                          height: '20px',
                          bgcolor: eventColor(event.type as EventType),
                          position: 'absolute',
                          top: 0,
                          left: timeToPx(eventStartHour, eventStartMinute),
                          zIndex: 4,
                        }}
                      />
                    </Tooltip>
                  </>
                );
              })}
            </Box>
          </Box>
        );
      })}

      {hasNextPage && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Stack>
            <Skeleton
              variant='rectangular'
              width={oneDayPx}
              height={20}
              sx={{
                borderRadius: 10,
                animation: `${pulse} 1.5s infinite`, // Adjust the speed here
                backgroundColor: '#c0c0c0', // Change the color here
              }}
            />
          </Stack>
        </Box>
      )}
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

const TooltipComp = ({ title, start_time, end_time, status }) => {
  const startTime = dayjs(start_time);
  const endTime = dayjs(end_time);

  const differenceInMinutes = endTime.diff(startTime, 'minute');
  let result;
  if (differenceInMinutes >= 60) {
    const hours = Math.floor(differenceInMinutes / 60);
    const minutes = differenceInMinutes % 60;
    result = `${hours} hour${hours > 1 ? 's' : ''}${minutes > 0 ? ` and ${minutes} minute${minutes > 1 ? 's' : ''}` : ''}`;
  } else {
    result = `${differenceInMinutes} Minute${differenceInMinutes > 1 ? 's' : ''}`;
  }

  return (
    <Stack>
      <ProgressHoverCard
        textScheduleName={title}
        textDuration={result}
        textMeetingType={''}
        isScheduleDate={true}
        textScheduleDate={`${dayjsLocal(start_time).format('ddd, MMM DD, YYYY hh:mm A')} - ${dayjsLocal(end_time).format(' hh:mm A')}`}
        slotScheduleStatus={
          <GlobalBadge
            textBadge={capitalizeAll(status)}
            color={
              status === 'completed'
                ? 'success'
                : status === 'cancelled'
                  ? 'error'
                  : status === 'confirmed'
                    ? 'info'
                    : null
            }
          />
        }
      />
    </Stack>
  );
};

const TimeHoverCard = ({
  title,
  index,
  start_time,
  end_time,
}: {
  title: string;
  index: number;
  start_time: { hour: number; min: number };
  end_time: { hour: number; min: number };
}) => {
  return (
    <Stack>
      <Typography>{title}</Typography>
      <Typography>
        {dayjsLocal()
          .add(index, 'day')
          .hour(start_time.hour)
          .minute(start_time.min)
          .format('ddd DD MMM, YYYY hh:mm A')}{' '}
        -
        {dayjsLocal()
          .add(index, 'day')
          .hour(end_time.hour)
          .minute(end_time.min)
          .format(' hh:mm A')}
      </Typography>
    </Stack>
  );
};
