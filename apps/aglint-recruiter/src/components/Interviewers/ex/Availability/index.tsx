/* eslint-disable security/detect-object-injection */
import { getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import { ProgressHoverCard } from '@devlink/ProgressHoverCard';
import { Skeleton, Tooltip } from '@mui/material';
import { CheckCircle, RotateCcw, XCircle } from 'lucide-react';
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Loader } from '@/components/Common/Loader';
import { UIBadge } from '@/components/Common/UIBadge';
import { useAllInterviewModules } from '@/components/Scheduling/InterviewTypes/_common/hooks/useAllInterviewModules';
import { useJobs } from '@/jobs/hooks';
import {
  type initUser,
  type initUserUIGroupedByDate,
} from '@/pages/api/interviewers';
import { useAllDepartments } from '@/queries/departments';
import { useAllOfficeLocations } from '@/queries/officeLocations';
import dayjs from '@/utils/dayjs';
import { capitalizeAll } from '@/utils/text/textUtils';

import { Filter } from '../components/Filter';
import { useAvailabilty } from '../Hook';
import { type CalendarEventWithType, type EventType } from '../types';
import {
  afterWorkingEndTime,
  color,
  earlyMorningstartTime,
  oneDayPx,
} from './constant';
import {
  eventAbbrivation,
  eventColor,
  getLocalSortedInterviewerIds,
  groupByDate,
  joinUsersEvents,
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
      <div className='flex h-full flex-col items-center justify-center'>
        <Loader />
      </div>
    );

  const calconnectedInterviewers = filteredInterviewers.filter(
    (interviewer) => interviewer?.isCalenderConnected,
  );
  const NotCalconnectedInterviewers = filteredInterviewers.filter(
    (interviewer) => !interviewer?.isCalenderConnected,
  );

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col p-2'>
        <div className='flex flex-row items-center justify-between'>
          <div className='flex flex-row items-center gap-1'>
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
              <Button
                variant='ghost'
                size='sm'
                onClick={() => {
                  setLocations([]);
                  setDepartments([]);
                  setJobs([]);
                }}
              >
                <RotateCcw className='mr-2 h-4 w-4' />
                Reset All
              </Button>
            )}
          </div>
          {/* Legent */}
          <div className='flex flex-row gap-1'>
            {Object.keys(color).map((name, i) => {
              return (
                <div key={i} className='flex flex-row items-center gap-1'>
                  <div
                    className='h-2 w-2 rounded-full'
                    style={{
                      backgroundColor: color[name],
                    }}
                  ></div>
                  <span className="text-sm">{capitalizeAll(name)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <AvailabilityView
        allInterviewers={calconnectedInterviewers}
        fetchNextPage={fetchNextPage}
        daysCountUI={dayCount}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
      />
      <h3 className="font-medium pl-2 mt-3 mb-2 text-base">
        Calendar Not Connect Interviewers
      </h3>
      <AvailabilityView allInterviewers={NotCalconnectedInterviewers} />
    </div>
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
    <div className='flex flex-row'>
      {/* Left Column for Interviewer Names and Timezones */}
      <div className='flex min-w-[120px] flex-shrink-0 flex-col gap-2'>
        {sortedInterviewers.map((interviewer) => (
          <MemberList
            key={interviewer.user_id}
            interviewer={interviewer}
            checkedInterviewers={checkedInterviewers}
            setCheckedInterviewers={setCheckedInterviewers}
          />
        ))}
      </div>

      {/* Scrollable View for Time Blocks */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className='mr-5 flex flex-col gap-2 overflow-x-auto'
      >
        {sortedInterviewers.map((interviewer, index) => {
          if (!interviewer.isCalenderConnected)
            return <div key={index} className='h-9'></div>;

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
      </div>
    </div>
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
    <div
      key={getFullName(interviewer.first_name, interviewer.last_name)}
      className='flex min-w-[290px] flex-row items-center justify-between gap-1 p-1'
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      <div className='flex cursor-pointer flex-row gap-1' onClick={checkHandle}>
        <div className='w-20'>
          {isCheckBoxVisible && (
            <Checkbox
              checked={checkedInterviewers.includes(interviewer.user_id)}
            />
          )}
        </div>
        <p className="text-base">
          {getFullName(interviewer.first_name, interviewer.last_name)}
        </p>
        <span className="text-xs text-gray-500">
          (
          {dayjsLocal()
            .tz(interviewer.scheduling_settings.timeZone.tzCode)
            .format('z')}
          )
        </span>
      </div>
      <StatusGlyph isConnected={interviewer.isCalenderConnected} />
    </div>
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
    <div
      className='relative flex flex-col'
      style={{ left: `-${timeZoneLeftOffset}px` }}
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
          <div key={i} className='relative flex flex-col items-center'>
            <span
              className="absolute top-[-8px] z-10 bg-white p-0 text-[10px] leading-none text-sm"
            >
              {dayjsLocal().add(i, 'day').format('ddd DD MMM')}
            </span>
            <div
              className='flex overflow-hidden rounded-[5px]'
              style={{
                width: oneDayPx,
                height: 20,
                backgroundColor: eventColor('bg'),
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
                <div
                  className='z-1 absolute top-0'
                  style={{
                    width:
                      timeToPx(workingendHour, workingendMinute) -
                      timeToPx(workingstartHour, workingstartMinute),
                    height: '20px',
                    backgroundColor: eventColor(
                      isHoliday ? 'company_off' : 'working_hour',
                    ),
                    left: timeToPx(workingstartHour, workingstartMinute),
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
                <div
                  className='z-2 absolute top-0'
                  style={{
                    width:
                      timeToPx(workingstartHour, workingstartMinute) -
                      timeToPx(earlyMorningStartHour, earlyMorningStartMinute),
                    height: '20px',
                    backgroundColor: eventColor(
                      isHoliday ? 'company_off' : 'early_morning',
                    ),
                    left: timeToPx(
                      earlyMorningStartHour,
                      earlyMorningStartMinute,
                    ),
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
                <div
                  className='z-2 absolute top-0'
                  style={{
                    width:
                      timeToPx(afterWorkingEndHour, afterWorkingEndMinute) -
                      timeToPx(workingendHour, workingendMinute),
                    height: '20px',
                    backgroundColor: eventColor(
                      isHoliday ? 'company_off' : 'after_work',
                    ),
                    left: timeToPx(workingendHour, workingendMinute),
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
                  <div
                    className='z-3 absolute top-0'
                    style={{
                      width: breakWidth,
                      height: '20px',
                      backgroundColor: eventColor('break'),
                      left: timeToPx(breakStartHour, breakStartMinute),
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
                      <div
                        className='z-4 absolute top-0'
                        style={{
                          width:
                            timeToPx(eventEndHour, eventEndMinute) -
                            timeToPx(eventStartHour, eventStartMinute),
                          height: '20px',
                          backgroundColor: eventColor(event.type as EventType),
                          left: timeToPx(eventStartHour, eventStartMinute),
                        }}
                      />
                    </Tooltip>
                  </>
                );
              })}
            </div>
          </div>
        );
      })}

      {hasNextPage && (
        <div className='relative flex flex-col items-center'>
          <Skeleton
            variant='rectangular'
            width={oneDayPx}
            height={20}
            className='rounded-[10px]'
            style={{
              animation: `${pulse} 1.5s infinite`,
              backgroundColor: '#c0c0c0',
            }}
          />
        </div>
      )}
    </div>
  );
};

const StatusGlyph = ({ isConnected }) => (
  <Tooltip
    title={isConnected ? 'Calendar Connected' : 'Calendar Not Connected'}
  >
    <div className='flex flex-col'>
      {isConnected ? (
        <CheckCircle size={16} className='text-green-500' />
      ) : (
        <XCircle size={16} className='text-red-500' />
      )}
    </div>
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
    <div className='flex flex-col'>
      <ProgressHoverCard
        textScheduleName={title}
        textDuration={result}
        textMeetingType={''}
        isScheduleDate={true}
        textScheduleDate={`${dayjsLocal(start_time).format('ddd, MMM DD, YYYY hh:mm A')} - ${dayjsLocal(end_time).format(' hh:mm A')}`}
        slotScheduleStatus={
          <UIBadge
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
    </div>
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
    <div className='flex flex-col'>
      <p className="text-sm">{title}</p>
      <p className="text-sm">
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
      </p>
    </div>
  );
};
