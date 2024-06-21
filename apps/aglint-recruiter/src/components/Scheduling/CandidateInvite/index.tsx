/* eslint-disable security/detect-object-injection */
import { DatabaseTable, DatabaseTableInsert } from '@aglint/shared-types';
import { CandidateResponseSelfSchedule } from '@aglint/shared-types/src/db/tables/application_logs.types';
import { SINGLE_DAY_TIME } from '@aglint/shared-utils';
import {
  Alert,
  Box,
  Container,
  Dialog,
  FormControlLabel,
  InputAdornment,
  Menu,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { CandidateConfirmationPage } from '@/devlink/CandidateConfirmationPage';
import { CandidateScheduleCard } from '@/devlink/CandidateScheduleCard';
import { IconButtonSoft } from '@/devlink/IconButtonSoft';
import { SelectedDateAndTime } from '@/devlink/SelectedDateAndTime';
import { SessionAndTime } from '@/devlink/SessionAndTime';
import { SessionInfo } from '@/devlink/SessionInfo';
import { ButtonDanger } from '@/devlink2/ButtonDanger';
import { ButtonPrimary } from '@/devlink2/ButtonPrimary';
import { ButtonSurface } from '@/devlink2/ButtonSurface';
import { CancelButton } from '@/devlink2/CancelButton';
import { InterviewConfirmed } from '@/devlink2/InterviewConfirmed';
import { InterviewConfirmedCard } from '@/devlink2/InterviewConfirmedCard';
import { RequestReschedule } from '@/devlink2/RequestReschedule';
import { ConfirmationPopup } from '@/devlink3/ConfirmationPopup';
import { GlobalIcon } from '@/devlink3/GlobalIcon';
import { ScheduleButton } from '@/devlink3/ScheduleButton';
import CandidateSlotLoad from '@/public/lottie/CandidateSlotLoad';
import { useCandidateInvite } from '@/src/context/CandidateInviteContext';
import NotFoundPage from '@/src/pages/404';
import { API_get_scheduling_reason } from '@/src/pages/api/get_scheduling_reason/types';
import { useInviteSlots } from '@/src/queries/candidate-invite';
import { supabase } from '@/src/utils/supabase/client';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';
import toast from '@/src/utils/toast';

import CompanyLogo from '../../Common/CompanyLogo';
import Loader from '../../Common/Loader';
import { getBreakLabel } from '../../Jobs/Job/Interview-Plan/utils';
import DateRange from '../../Tasks/Components/DateRange';
import IconScheduleType from '../Candidates/ListCard/Icon';
import { addScheduleActivity } from '../Candidates/queries/utils';
import { getScheduleType } from '../Candidates/utils';
import { SessionIcon } from '../Common/ScheduleProgress/scheduleProgressPill';
import { TimezoneSelector } from '../Settings';
import CandidateInviteCalendar, {
  CandidateInviteCalendarProps,
} from './calender';
import { dayJS, getCalenderEventUrl, getDurationText } from './utils';

const CandidateInviteNew = () => {
  const load = useCandidateInvite();

  return (
    <Stack
      height={'100%'}
      width={'100%'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      {load === undefined ? (
        <Stack width={'100%'} height={'100%'}>
          <Loader />
        </Stack>
      ) : load === null ? (
        <Stack style={{ transform: 'translateY(-50%)' }}>
          <NotFoundPage />
        </Stack>
      ) : (
        <>
          <CandidateInvitePlanPage key={load.timezone.tzCode} />
          <DetailsPopup />
        </>
      )}
    </Stack>
  );
};
export default CandidateInviteNew;

const CandidateInvitePlanPage = () => {
  const {
    setDetailsPop,
    meta: {
      data: { meetings, filter_json },
    },
    timezone,
    setSelectedSlots,
    setTimezone,
    handleViewedOn,
  } = useCandidateInvite();

  useEffect(() => {
    if (filter_json?.id && !filter_json.viewed_on) {
      handleViewedOn();
    }
  }, [filter_json]);

  const waiting = meetings.some(
    ({ interview_meeting: { status } }) => status === 'waiting',
  );
  const { rounds } = meetings.reduce(
    (acc, curr) => {
      const count = acc.rounds.length;
      if (
        count === 0 ||
        acc.rounds[count - 1].sessions[
          acc.rounds[count - 1].sessions.length - 1
        ].interview_session.break_duration >= SINGLE_DAY_TIME
      )
        acc.rounds.push({
          title: `Day ${acc.rounds.length + 1}`,
          sessions: [curr],
        });
      else acc.rounds[count - 1].sessions.push(curr);
      return acc;
    },
    { rounds: [] as ScheduleCardProps['round'][] },
  );

  if (meetings.length === 0) return <NotFoundPage />;

  if (!waiting) return <ConfirmedPage rounds={rounds} />;
  return (
    <CandidateConfirmationPage
      slotCompanyLogo={<Logo />}
      onClickView={{
        onClick: () => {
          setDetailsPop(true);
        },
      }}
      slotCandidateCalender={
        <>
          <TimezoneSelector
            disabled={false}
            value={timezone}
            setValue={(e) => {
              setTimezone(e);
              setSelectedSlots([]);
            }}
          />
          <Container maxWidth='md'>
            <Stack spacing={'var(--space-4)'}>
              <Invite rounds={rounds} />
            </Stack>
          </Container>
        </>
      }
    />
  );
};

const ConfirmedPage = (props: ScheduleCardsProps) => {
  const {
    meta: {
      data: { candidate, schedule, meetings, filter_json },
    },
  } = useCandidateInvite();
  const [cancelReschedule, setCancelReschedule] = useState<
    'reschedule' | 'cancel'
  >(null);
  const [scheduling_reason, setSchedulingReason] =
    useState<DatabaseTable['recruiter']['scheduling_reason']>(null);
  const [cancelReschedulingDetails, setCancelReschedulingDetails] = useState<{
    all: boolean;
    type: 'reschedule' | 'declined';
    other_details: Awaited<
      ReturnType<typeof getCancelRescheduleData>
    >[number]['other_details'];
    sessions: Awaited<ReturnType<typeof getCancelRescheduleData>>;
  }>(null);

  useEffect(() => {
    get_scheduling_reason(candidate.recruiter_id).then((data) => {
      setSchedulingReason(data);
    });
    if (
      props.rounds[0]?.sessions[0]?.interview_meeting?.interview_schedule_id
    ) {
      getCancelRescheduleData({
        schedule_id:
          props.rounds[0]?.sessions[0]?.interview_meeting
            ?.interview_schedule_id,
      }).then((data) => {
        const temp = new Set(
          props.rounds
            .map((round) =>
              round.sessions.map((ses) => ses.interview_session.id),
            )
            .flat(2),
        );

        data.length &&
          setCancelReschedulingDetails({
            all:
              data.length == temp.size ||
              data.every((item) => temp.has(item.session_id)),
            type: data[0]?.type,
            other_details: data[0]?.other_details,
            sessions: data,
          });
      });
    }
  }, [props.rounds[0]?.sessions[0]?.interview_meeting?.interview_schedule_id]);

  const handleCancelReschedule = async (
    detail: Omit<DatabaseTableInsert['interview_session_cancel'], 'session_id'>,
  ) => {
    // return true;

    const metadata: CandidateResponseSelfSchedule = {
      action: 'waiting',
      type: 'candidate_response_self_schedule',
      reason: detail.reason,
      other_details: detail.other_details,
      response_type: detail.type === 'declined' ? 'cancel' : 'reschedule',
      filter_id: filter_json.id,
      session_ids: meetings.map((ses) => ses.interview_session.id),
    };

    addScheduleActivity({
      title:
        detail.type === 'declined'
          ? `Canceled ${meetings?.map((ses) => ses.interview_session.name).join(' , ')}`
          : `Requested reschedule for ${meetings?.map((ses) => ses.interview_session.name).join(' , ')}`,
      application_id: schedule.application_id,
      logged_by: 'candidate',
      supabase: supabase,
      created_by: null,
      metadata,
    });

    const details = props.rounds
      .reduce(
        (prev, curr) => [...prev, ...curr.sessions],
        [] as (typeof props.rounds)[number]['sessions'],
      )
      .map((session) => ({
        ...detail,
        session_id: session.interview_session.id,
        schedule_id: session.interview_meeting.interview_schedule_id,
      }));
    return saveCancelReschedule({ details }).then(() => {
      setCancelReschedulingDetails({
        all: true,
        type: detail.type,
        other_details: detail.other_details,
        sessions: details.map((item) => ({
          session_id: item.session_id,
          reason: item.reason,
          other_details: item.other_details,
          type: item.type,
        })),
      });
      return true;
    });
  };

  return (
    <>
      <InterviewConfirmed
        slotBanner={
          <>
            {cancelReschedulingDetails?.all && (
              <Alert
                variant='outlined'
                severity='warning'
                sx={{
                  '& .MuiAlert-icon, & .MuiAlert-action': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                }}
              >
                {'Request to '}
                {capitalizeFirstLetter(
                  cancelReschedulingDetails.type == 'declined'
                    ? 'cancel'
                    : 'reschedule',
                )}
                {' all Sessions'}
                {cancelReschedulingDetails.type == 'reschedule' &&
                  ` from ${dayjs(cancelReschedulingDetails.other_details.dateRange.start).format('MMMM DD')} to ${dayjs(cancelReschedulingDetails.other_details.dateRange.end).format('MMMM DD, YYYY')}`}
                {' received.'}
              </Alert>
            )}
          </>
        }
        slotCompanyLogo={<Logo />}
        slotInterviewConfirmedCard={
          <ConfirmedScheduleCards rounds={props.rounds} />
        }
        textDesc={
          'Your interview has been scheduled and we look forwarding to talking with you. A copy of your itinerary and calendar invites should be in your email.'
        }
        textMailSent={candidate.email}
        slotButton={
          <Stack direction={'row'} gap={2}>
            {(!cancelReschedulingDetails ||
              cancelReschedulingDetails.all == false) && (
              <>
                <ScheduleButton
                  textLabel={'Reschedule'}
                  onClickProps={{
                    onClick: () => setCancelReschedule('reschedule'),
                  }}
                />
                <ScheduleButton
                  textLabel={'Cancel Schedule'}
                  textColorProps={{
                    style: { color: '#D93F4C' },
                  }}
                  onClickProps={{
                    onClick: () => setCancelReschedule('cancel'),
                    style: { background: '#FFF0F1' },
                  }}
                  slotIcon={
                    <Box
                      display={'flex'}
                      height={'100%'}
                      justifyContent={'center'}
                      alignItems={'center'}
                    >
                      <GlobalIcon iconName='event_busy' color={'inherit'} />
                      {/* <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='13'
                        height='16'
                        viewBox='0 0 13 13'
                        fill='none'
                      >
                        <path
                          d='M4 0.498047V1.62305H8.5V0.498047C8.51562 0.263672 8.64062 0.138672 8.875 0.123047C9.10938 0.138672 9.23438 0.263672 9.25 0.498047V1.62305H10C10.4219 1.63867 10.7734 1.78711 11.0547 2.06836C11.3359 2.34961 11.4844 2.70117 11.5 3.12305V3.87305V4.62305V10.623C11.4844 11.0449 11.3359 11.3965 11.0547 11.6777C10.7734 11.959 10.4219 12.1074 10 12.123H2.5C2.07812 12.1074 1.72656 11.959 1.44531 11.6777C1.16406 11.3965 1.01562 11.0449 1 10.623V4.62305V3.87305V3.12305C1.01562 2.70117 1.16406 2.34961 1.44531 2.06836C1.72656 1.78711 2.07812 1.63867 2.5 1.62305H3.25V0.498047C3.26562 0.263672 3.39062 0.138672 3.625 0.123047C3.85938 0.138672 3.98438 0.263672 4 0.498047ZM1.75 4.62305V10.623C1.75 10.8418 1.82031 11.0215 1.96094 11.1621C2.10156 11.3027 2.28125 11.373 2.5 11.373H10C10.2188 11.373 10.3984 11.3027 10.5391 11.1621C10.6797 11.0215 10.75 10.8418 10.75 10.623V4.62305H1.75ZM2.5 2.37305C2.28125 2.37305 2.10156 2.44336 1.96094 2.58398C1.82031 2.72461 1.75 2.9043 1.75 3.12305V3.87305H10.75V3.12305C10.75 2.9043 10.6797 2.72461 10.5391 2.58398C10.3984 2.44336 10.2188 2.37305 10 2.37305H2.5ZM8.00781 6.75586L6.78906 7.99805L8.00781 9.24023C8.16406 9.41211 8.16406 9.58398 8.00781 9.75586C7.83594 9.91211 7.66406 9.91211 7.49219 9.75586L6.25 8.53711L5.00781 9.75586C4.83594 9.91211 4.66406 9.91211 4.49219 9.75586C4.33594 9.58398 4.33594 9.41211 4.49219 9.24023L5.71094 7.99805L4.49219 6.75586C4.33594 6.58398 4.33594 6.41211 4.49219 6.24023C4.66406 6.08398 4.83594 6.08398 5.00781 6.24023L6.25 7.45898L7.49219 6.24023C7.66406 6.08398 7.83594 6.08398 8.00781 6.24023C8.16406 6.41211 8.16406 6.58398 8.00781 6.75586Z'
                          fill='#D93F4C'
                        />
                      </svg> */}
                    </Box>
                  }
                />
              </>
            )}
          </Stack>
        }
      />
      {Boolean(cancelReschedule) && (
        <CancelRescheduleDialog
          onClickTryRescheduling={() => {
            setCancelReschedule('reschedule');
          }}
          onSubmit={handleCancelReschedule}
          onClose={() => {
            setCancelReschedule(null);
          }}
          options={
            (cancelReschedule === 'cancel'
              ? scheduling_reason?.candidate?.cancellation
              : scheduling_reason?.candidate?.rescheduling) || ['other']
          }
          title={
            cancelReschedule === 'reschedule' ? 'Reschedule' : 'Cancel Schedule'
          }
          type={cancelReschedule}
        />
      )}
    </>
  );
};

const DetailsPopup = () => {
  const {
    detailsPop,
    setDetailsPop,
    meta: {
      data: {
        meetings,
        schedule: { schedule_name },
      },
    },
  } = useCandidateInvite();

  const duration = meetings.reduce((acc, curr) => {
    acc += curr.interview_session.session_duration;
    return acc;
  }, 0);

  return (
    <Dialog
      open={detailsPop}
      onClose={() => setDetailsPop(false)}
      maxWidth='md'
    >
      <CandidateScheduleCard
        isPopup={true}
        isSelected={false}
        slotButton={''}
        textDuration={getDurationText(duration)}
        onClickClose={{ onClick: () => setDetailsPop(false) }}
        textPopupTitle={schedule_name}
        slotSessionInfo={<Sessions sessions={meetings} showBreak={true} />}
        isSlotButtonVisible={false}
        isTitle={false}
      />
    </Dialog>
  );
};

const Invite = ({ rounds }: ScheduleCardsProps) => {
  if (rounds.length === 1) return <SingleDay />;
  return <MultiDay rounds={rounds} />;
};
const CancelRescheduleDialog = ({
  title,
  type,
  options,
  onClose,
  onClickTryRescheduling,
  onSubmit,
}: {
  title: string;
  type: 'reschedule' | 'cancel';
  options: string[];
  onClose: () => void;
  onClickTryRescheduling: () => void;
  onSubmit: (
    // eslint-disable-next-line no-unused-vars
    x: Omit<DatabaseTableInsert['interview_session_cancel'], 'session_id'>,
  ) => Promise<boolean>;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [formData, setFormData] = useState<{
    type;
    dateRange: [ReturnType<typeof dayjs>, ReturnType<typeof dayjs>];
    reason: string;
    additionalNote: string;
  }>({
    type,
    reason: options[0],
    dateRange: [dayjs(), dayjs().add(7, 'day')],
    additionalNote: null,
  });
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    !selectedDateRangeError && setAnchorEl(null);
  };

  const selectedDateRange = useMemo(
    () =>
      `${dayjs(formData.dateRange[0]).format(
        'ddd, MMMM DD',
      )} to ${dayjs(formData.dateRange[1]).format('ddd, MMMM DD')}`,
    [formData.dateRange],
  );
  const [selectedDateRangeError, setSelectedDateRangeError] = useState(false);

  const handleSubmit = () => {
    if (type === 'reschedule') {
      const error = !formData.dateRange[1] || !formData.dateRange[0];
      if (selectedDateRangeError || error) return;
      setSelectedDateRangeError(error);
    }
    onSubmit({
      reason: formData.reason,
      type: type === 'cancel' ? 'declined' : type,
      other_details: {
        dateRange:
          type === 'cancel'
            ? null
            : {
                start: formData.dateRange[0].toDate().toUTCString(),
                end: formData.dateRange[1].toDate().toUTCString(),
              },
        note: formData.additionalNote,
      },
    }).then(() => {
      toast.success(
        `${capitalizeFirstLetter(type)} request submitted successfully`,
      );
      onClose();
    });
  };

  useEffect(
    () =>
      setSelectedDateRangeError(
        !formData.dateRange[1] || !formData.dateRange[0],
      ),
    [formData.dateRange],
  );
  useEffect(
    () => setFormData((pre) => ({ ...pre, reason: options[0] })),
    [options],
  );

  return (
    <Dialog open={true}>
      <RequestReschedule
        textHeader={title}
        isCancelWarningVisible={type === 'cancel'}
        isRangeVisible={type === 'reschedule'}
        slotCancelButton={<CancelButton onClickButton={{ onClick: onClose }} />}
        slotDateRangeInput={
          <div>
            <Stack
              id='demo-customized-button'
              aria-controls={open ? 'customized-calendar' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              sx={{ cursor: 'pointer' }}
              onClick={handleClick}
            >
              <TextField
                placeholder='Choose a Date Range'
                value={selectedDateRange}
                fullWidth
                // disabled
                error={selectedDateRangeError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <GlobalIcon iconName='calendar_month' />
                    </InputAdornment>
                  ),
                }}
              >
                Options
              </TextField>
            </Stack>
            <Menu
              elevation={0}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              id='customized-calendar'
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <DateRange
                value={formData.dateRange}
                onChange={(range) => {
                  setFormData((pre) => ({ ...pre, dateRange: range }));
                }}
              />
              <Stack px={1}>
                <ButtonSolid
                  textButton='Done'
                  size={2}
                  onClickButton={{ onClick: handleClose }}
                />
              </Stack>
            </Menu>
          </div>
        }
        slotRadioText={
          // <FormControl>
          <RadioGroup
            name='radio-buttons-group'
            value={formData.reason}
            onChange={(e) => {
              setFormData((pre) => ({ ...pre, reason: e.currentTarget.value }));
            }}
          >
            {options.map((item) => (
              <FormControlLabel
                key={item}
                value={item}
                control={<Radio />}
                label={capitalizeFirstLetter(item)}
                sx={{
                  ml: 0,
                  '& .MuiRadio-root': {
                    p: 0.5,
                  },
                  '& .MuiTypography-root': { fontSize: '14px' },
                }}
              />
            ))}
          </RadioGroup>
          // {/* </FormControl> */}
        }
        slotPrimaryButton={
          <Stack>
            {type === 'reschedule' && (
              <ButtonPrimary
                textLabel={'Reschedule'}
                onClickButton={{ onClick: handleSubmit }}
              />
            )}
            {type === 'cancel' && (
              <ButtonDanger
                textLabel={'Cancel Schedule'}
                onClickButton={{ onClick: handleSubmit }}
              />
            )}
          </Stack>
        }
        slotInputAdditionalNotes={
          <TextField
            multiline
            placeholder='Add additional notes.'
            minRows={4}
            value={formData.additionalNote}
            fullWidth
            onChange={(e) =>
              setFormData((pre) => ({
                ...pre,
                additionalNote: e.target.value.trim(),
              }))
            }
          />
        }
        onClickClose={{
          onClick: onClose,
        }}
        onClickTryReschedulingNow={{
          onClick: onClickTryRescheduling,
        }}
      />
    </Dialog>
  );
};

const SingleDay = () => {
  const { params } = useCandidateInvite();
  const { status } = useInviteSlots(params);
  if (status === 'error') return <SingleDayError />;
  if (status === 'pending') return <SingleDayLoading />;
  return <SingleDaySuccess />;
};

const SingleDayError = () => {
  const { params } = useCandidateInvite();
  const { refetch } = useInviteSlots(params);
  useEffect(() => {
    toast.error('Something went wrong. Please try again.');
  }, []);
  return (
    <ButtonSolid
      textButton='Try again'
      size={2}
      onClickButton={{ onClick: () => refetch() }}
    />
  );
};

const SingleDayLoading = () => {
  return (
    <Stack direction={'row'} justifyContent={'center'}>
      <Stack width={'120px'}>
        <CandidateSlotLoad />
      </Stack>
    </Stack>
  );
};

const SingleDaySuccess = () => {
  const { params, selectedSlots, handleSelectSlot, timezone } =
    useCandidateInvite();
  const { data } = useInviteSlots(params);
  const sessions = data.reduce(
    (acc, curr) => {
      const { start_time } = curr[0][0].sessions[0];
      acc.push({
        date: start_time,
        slots: curr[0],
      });
      return acc;
    },
    [] as CandidateInviteCalendarProps['sessions'],
  );
  return (
    <>
      <CandidateInviteCalendar
        sessions={sessions}
        selections={selectedSlots}
        handleSelect={(id) => handleSelectSlot(0, id)}
        tz={timezone.tzCode}
      />
      <SingleDayConfirmation />
    </>
  );
};

const SingleDayConfirmation = () => {
  const { selectedSlots, setSelectedSlots, handleSubmit, timezone } =
    useCandidateInvite();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (selectedSlots.length !== 0) setOpen(true);
  }, [selectedSlots.length]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setSelectedSlots([]), 200);
  };
  const [month, date, day] = dayJS(
    selectedSlots?.[0]?.sessions?.[0]?.start_time ?? null,
    timezone.tzCode,
  )
    .format('MMMM DD dddd')
    .split(' ');
  // calculate total duration of each session
  let totalHours = 0;
  let totalMinutes = 0;

  selectedSlots[0]?.sessions.forEach((session) => {
    const start = dayJS(session.start_time, timezone.tzCode);
    const end = dayJS(session.end_time, timezone.tzCode);
    const duration = end.diff(start, 'minutes');

    totalHours += Math.floor(duration / 60);
    totalMinutes += duration % 60;
  });

  totalHours += Math.floor(totalMinutes / 60);
  totalMinutes %= 60;

  const totalTimeDifference = `${
    totalHours ? totalHours + ' hour' : ''
  } ${totalMinutes} minutes`;
  // end

  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <ConfirmationPopup
        isIcon={false}
        textPopupTitle={'Confirm your interview'}
        isDescriptionVisible={true}
        textPopupDescription={
          'Before we finalize your schedule, please take a moment to confirm the chosen option. Your interview is crucial, and we want to ensure it aligns perfectly with your availability.'
        }
        isWidget={true}
        slotWidget={
          <CandidateScheduleCard
            isTitle={false}
            textDuration={totalTimeDifference}
            slotButton={<></>}
            slotSessionInfo={
              <SelectedDateAndTime
                slotSessionAndTime={<SingleDaySessions index={0} />}
                textDate={date}
                textDay={day}
                textMonth={month}
              />
            }
          />
        }
        textPopupButton={'Confirm'}
        onClickAction={{ onClick: () => handleSubmit() }}
        onClickCancel={{ onClick: () => handleClose() }}
      />
    </Dialog>
  );
};

type SingleDaySessionsProps = {
  index: number;
};
const SingleDaySessions = (props: SingleDaySessionsProps) => {
  const { selectedSlots } = useCandidateInvite();
  const sessions = (selectedSlots?.[props.index]?.sessions ?? []).map(
    (session) => (
      <SingleDaySession key={session.session_id} session={session} />
    ),
  );
  return <>{sessions}</>;
};

type SingleDaySessionProps = {
  session: ReturnType<
    typeof useCandidateInvite
  >['selectedSlots'][number]['sessions'][number];
};
const SingleDaySession = (props: SingleDaySessionProps) => {
  const { timezone } = useCandidateInvite();
  const name = props.session.session_name;
  const duration = `${dayJS(props.session.start_time, timezone.tzCode).format(
    'hh:mm A',
  )} to ${dayJS(props.session.end_time, timezone.tzCode).format('hh:mm A')}`;
  return <SessionAndTime textSessionName={name} textTime={duration} />;
};

const ConfirmedScheduleCards = (props: ScheduleCardsProps) => {
  const scheduleCards = props.rounds.map((round, index) => (
    <ConfirmedScheduleCard
      key={index}
      round={round}
      index={index}
      showTitle={props.rounds.length !== 1}
    />
  ));

  return <>{scheduleCards}</>;
};

const ConfirmedScheduleCard = (props: ScheduleCardProps) => {
  const { timezone } = useCandidateInvite();
  const [month, date, day, year] = dayJS(
    props?.round?.sessions?.[0].interview_meeting?.start_time ?? null,
    timezone.tzCode,
  )
    .format('MMMM DD ddd YYYY')
    .split(' ');
  // const duration = (props?.round?.sessions ?? []).reduce((acc, curr) => {
  //   acc += curr.interview_session.session_duration;
  //   return acc;
  // }, 0);

  const sessions = props.round.sessions.map((session, i) => {
    const name = session.interview_session.name;
    const tz = String(new Date(session.interview_meeting.start_time))
      .match(/\(([^)]+)\)$/)[1]
      ?.split(' ')
      .map((item) => item.slice(0, 1))
      .join('');
    const duration = `${dayJS(
      session.interview_meeting.start_time,
      timezone.tzCode,
    ).format('hh:mm A')} to ${dayJS(
      session.interview_meeting.end_time,
      timezone.tzCode,
    ).format('hh:mm A')} ${tz}`;

    return (
      <InterviewConfirmedCard
        key={i}
        slotMeetingIcon={
          <IconScheduleType type={session.interview_session.schedule_type} />
        }
        onClickAddCalendar={{
          onClick: () =>
            window.open(
              getCalenderEventUrl({
                start_time: session.interview_meeting.start_time,
                end_time: session.interview_meeting.end_time,
                title: session.interview_session.name,
                description: `Meeting ${session.interview_session.schedule_type != 'in_person_meeting' ? 'Link' : 'Address'}: ${session.interview_meeting.meeting_link}`,
                location: capitalizeFirstLetter(
                  session.interview_session.schedule_type,
                ),
              }),
              '_blank',
            ),
        }}
        textDate={`${day}, ${month} ${date}, ${year}`}
        textDuration={getBreakLabel(session.interview_session.session_duration)}
        textPanel={name}
        textPlatformName={capitalizeFirstLetter(
          session.interview_session.schedule_type,
        )}
        onClickJoinGoogleMeet={{
          onClick: () =>
            window.open(session.interview_meeting.meeting_link, '_blank'),
        }}
        textTime={duration}
      />
      // <SessionAndTime key={i} textSessionName={name} textTime={duration} />
    );
  });

  return sessions;
  // <CandidateScheduleCard
  //   isTitle={props.showTitle}
  //   textDay={props.round.title}
  //   isSelected={true}
  //   slotButton={<></>}
  //   textDuration={getDurationText(duration)}
  //   slotSessionInfo={
  //     <SelectedDateAndTime
  //       slotSessionAndTime={sessions}
  //       textDate={date}
  //       textDay={day}
  //       textMonth={month}
  //     />
  //   }
  // />
};

const MultiDay = ({ rounds }: ScheduleCardsProps) => {
  const { params } = useCandidateInvite();
  const { status } = useInviteSlots(params);
  if (status === 'error') return <MultiDayError />;
  if (status === 'pending') return <MultiDayLoading />;
  return <MultiDaySuccess rounds={rounds} />;
};

const MultiDayError = () => {
  const { params } = useCandidateInvite();
  const { refetch } = useInviteSlots(params);
  useEffect(() => {
    toast.error('Something went wrong. Please try again.');
  }, []);
  return (
    <ButtonSolid
      size={2}
      textButton='Try again'
      onClickButton={{ onClick: () => refetch() }}
    />
  );
};

const MultiDayLoading = () => {
  return (
    <Stack direction={'row'} justifyContent={'center'}>
      <Stack width={'120px'}>
        <CandidateSlotLoad />
      </Stack>
    </Stack>
  );
};

const MultiDaySuccess = (props: ScheduleCardsProps) => {
  const { selectedSlots } = useCandidateInvite();
  const [open, setOpen] = useState(false);
  const enabled = selectedSlots.length === props.rounds.length;
  return (
    <>
      <ScheduleCards rounds={props.rounds} />
      <Stack direction={'row'} justifyContent={'center'}>
        <ButtonSolid
          isLeftIcon={false}
          isRightIcon={false}
          textButton='Proceed'
          size={3}
          onClickButton={{
            onClick: () => {
              setOpen(true);
            },
          }}
          isDisabled={!enabled}
        />
      </Stack>
      <MultiDayConfirmation open={open} setOpen={setOpen} />
    </>
  );
};

type MultiDayConfirmationProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const MultiDayConfirmation = (props: MultiDayConfirmationProps) => {
  const { handleSubmit } = useCandidateInvite();
  const handleClose = () => {
    props.setOpen(false);
  };
  return (
    <Dialog open={props.open} onClose={() => handleClose()}>
      <ConfirmationPopup
        isIcon={false}
        textPopupTitle={'Confirm Your Interview'}
        isDescriptionVisible={true}
        textPopupDescription={
          'Please review and confirm your selected time slot before we finalize your schedule. It’s important that your interview time aligns with your availability.'
        }
        isWidget={false}
        textPopupButton={'Confirm'}
        onClickAction={{ onClick: () => handleSubmit() }}
        onClickCancel={{ onClick: () => handleClose() }}
      />
    </Dialog>
  );
};

type ScheduleCardsProps = {
  rounds: {
    title: string;
    sessions: ReturnType<typeof useCandidateInvite>['meta']['data']['meetings'];
  }[];
};

const ScheduleCards = (props: ScheduleCardsProps) => {
  const scheduleCards = props.rounds.map((round, index) => (
    <ScheduleCard key={index} round={round} index={index} showTitle={true} />
  ));

  return <>{scheduleCards}</>;
};

type ScheduleCardProps = {
  round: ScheduleCardsProps['rounds'][number];
  index: number;
  showTitle: boolean;
};

const ScheduleCard = (props: ScheduleCardProps) => {
  const { params, selectedSlots, handleSelectSlot, timezone } =
    useCandidateInvite();
  const { data } = useInviteSlots(params);

  const [open, setOpen] = useState(false);

  const isSelected = !!selectedSlots[props.index];
  const enabled = props.index <= selectedSlots.length;

  const [month, date, day] = dayJS(
    selectedSlots?.[props.index]?.sessions?.[0]?.start_time ?? null,
    timezone.tzCode,
  )
    .format('MMMM DD dddd')
    .split(' ');

  const sessions =
    props.index === 0
      ? data.reduce(
          (acc, curr) => {
            const { start_time } = curr[props.index][0].sessions[0];
            acc.push({
              date: start_time,
              slots: curr[props.index],
            });
            return acc;
          },
          [] as CandidateInviteCalendarProps['sessions'],
        )
      : data.reduce(
          (acc, curr) => {
            if (
              selectedSlots.length !== 0 &&
              curr[0].includes(selectedSlots[0])
            ) {
              const { start_time } = curr[props.index][0].sessions[0];
              acc.push({
                date: start_time,
                slots: curr[props.index],
              });
            }
            return acc;
          },
          [] as CandidateInviteCalendarProps['sessions'],
        );

  const handleSelect = (session: Parameters<typeof handleSelectSlot>['1']) => {
    handleSelectSlot(props.index, session);
    setOpen(false);
  };

  const duration = (props?.round?.sessions ?? []).reduce((acc, curr) => {
    acc += curr.interview_session.session_duration;
    return acc;
  }, 0);

  return (
    <Stack
      style={{
        pointerEvents: enabled ? 'auto' : 'none',
        opacity: enabled ? 1 : 0.4,
      }}
    >
      <CandidateScheduleCard
        textDay={props.round.title}
        isSelected={isSelected}
        slotButton={
          enabled ? (
            isSelected ? (
              <IconButtonSoft
                color={'neutral'}
                onClickButton={{
                  onClick: () => setOpen(true),
                }}
                iconName='repeat'
                highContrast={true}
              />
            ) : (
              <ButtonSurface
                slotIcon={<GlobalIcon iconName='add' size={'sm'} />}
                isLeftIcon={true}
                isRightIcon={false}
                size={1}
                onClickButton={{ onClick: () => setOpen(true) }}
                textButton='Select Option'
              />
            )
          ) : (
            <></>
          )
        }
        textDuration={getDurationText(duration)}
        slotSessionInfo={
          isSelected ? (
            <SelectedDateAndTime
              slotSessionAndTime={<SingleDaySessions index={props.index} />}
              textDate={date}
              textDay={day}
              textMonth={month}
            />
          ) : (
            <Sessions sessions={props.round.sessions} showBreak={false} />
          )
        }
        onClickCard={{ onClick: () => setOpen(true) }}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        sx={{ '& .MuiPaper-root': { maxWidth: 'none !important' } }}
      >
        <CandidateInviteCalendar
          sessions={sessions}
          selections={selectedSlots}
          handleSelect={handleSelect}
          tz={timezone.tzCode}
        />
      </Dialog>
    </Stack>
  );
};

type SessionsProps = Pick<ScheduleCardProps['round'], 'sessions'> & {
  showBreak: boolean;
};

const Sessions = (props: SessionsProps) => {
  const sessions = props.sessions.reduce((acc, curr) => {
    acc.push(
      <SessionCard
        key={curr.interview_session.id + curr.interview_session.id}
        session={curr}
      />,
    );
    if (curr.interview_session.break_duration !== 0 && props.showBreak)
      acc.push(
        <BreakCard break_duration={curr.interview_session.break_duration} />,
      );
    return acc;
  }, [] as React.JSX.Element[]);
  return <>{sessions}</>;
};

type SessionCardProps = {
  session: SessionsProps['sessions'][number];
};

const SessionCard = ({ session: { interview_session } }: SessionCardProps) => {
  const duration = getBreakLabel(interview_session.session_duration);
  const scheduleType = getScheduleType(interview_session.schedule_type);
  return (
    <SessionInfo
      textSessionName={interview_session.name}
      textSessionDuration={duration}
      textMeetingType={scheduleType}
      slotMeetingTypeIcon={
        <IconScheduleType type={interview_session.schedule_type} />
      }
      slotInterviewtypeIcon={
        <SessionIcon session_type={interview_session.session_type} />
      }
    />
  );
};

const BreakCard = ({ break_duration }: { break_duration: number }) => {
  const duration = getBreakLabel(break_duration);
  return (
    <SessionInfo
      textSessionName={'Break'}
      textSessionDuration={duration}
      textMeetingType={''}
      slotMeetingTypeIcon={<></>}
      slotInterviewtypeIcon={<BreakIcon />}
    />
  );
};

const Logo = () => {
  const {
    meta: {
      data: { recruiter },
    },
  } = useCandidateInvite();
  return (
    <Stack height={'60px'}>
      <CompanyLogo companyName={recruiter.name} companyLogo={recruiter.logo} />
    </Stack>
  );
};

const BreakIcon = () => {
  return (
    <GlobalIcon iconName='emoji_food_beverage' />
    // <svg
    //   width='14'
    //   height='14'
    //   viewBox='0 0 12 12'
    //   fill='none'
    //   xmlns='http://www.w3.org/2000/svg'
    // >
    //   <path
    //     d='M2.0625 0C2.40625 0.03125 2.59375 0.21875 2.625 0.5625C2.625 0.75 2.67188 0.90625 2.76562 1.03125C2.85938 1.15625 3 1.29687 3.1875 1.45312L3.21094 1.47656C3.41406 1.63281 3.60938 1.84375 3.79688 2.10938C4 2.375 4.10938 2.73438 4.125 3.1875C4.09375 3.53125 3.90625 3.71875 3.5625 3.75C3.21875 3.71875 3.03125 3.53125 3 3.1875C3 3 2.95312 2.84375 2.85938 2.71875C2.76562 2.59375 2.625 2.45313 2.4375 2.29688L2.41406 2.27344C2.21094 2.11719 2.01562 1.90625 1.82812 1.64062C1.625 1.375 1.51562 1.01562 1.5 0.5625C1.53125 0.21875 1.71875 0.03125 2.0625 0ZM1.125 9.75C1.14062 10.0625 1.25 10.3281 1.45312 10.5469C1.67188 10.75 1.9375 10.8594 2.25 10.875H6.75C7.0625 10.8594 7.32812 10.75 7.54688 10.5469C7.75 10.3281 7.85938 10.0625 7.875 9.75V5.625H1.125V9.75ZM0 5.25C0 5.03125 0.0703125 4.85156 0.210938 4.71094C0.351562 4.57031 0.53125 4.5 0.75 4.5H8.25H9.375C10.125 4.51562 10.7422 4.77344 11.2266 5.27344C11.7266 5.75781 11.9844 6.375 12 7.125C11.9844 7.875 11.7266 8.49219 11.2266 8.97656C10.7422 9.47656 10.125 9.73438 9.375 9.75H9C8.98438 10.3906 8.76562 10.9219 8.34375 11.3438C7.92188 11.7656 7.39062 11.9844 6.75 12H2.25C1.60938 11.9844 1.07812 11.7656 0.65625 11.3438C0.234375 10.9219 0.015625 10.3906 0 9.75L0 5.25ZM9 8.625H9.375C9.79688 8.60938 10.1484 8.46094 10.4297 8.17969C10.7109 7.89844 10.8594 7.54688 10.875 7.125C10.8594 6.70312 10.7109 6.35156 10.4297 6.07031C10.1484 5.78906 9.79688 5.64062 9.375 5.625H9V8.625ZM5.25 0.5625C5.25 0.75 5.29688 0.90625 5.39062 1.03125C5.48438 1.15625 5.625 1.29687 5.8125 1.45312L5.83594 1.47656C6.03906 1.63281 6.23438 1.84375 6.42188 2.10938C6.625 2.375 6.73438 2.73438 6.75 3.1875C6.71875 3.53125 6.53125 3.71875 6.1875 3.75C5.84375 3.71875 5.65625 3.53125 5.625 3.1875C5.625 3 5.57812 2.84375 5.48438 2.71875C5.39062 2.59375 5.25 2.45313 5.0625 2.29688L5.03906 2.27344C4.83594 2.11719 4.64062 1.90625 4.45312 1.64062C4.25 1.375 4.14062 1.01562 4.125 0.5625C4.15625 0.21875 4.34375 0.03125 4.6875 0C5.03125 0.03125 5.21875 0.21875 5.25 0.5625Z'
    //     fill='#49545C'
    //   ></path>
    // </svg>
  );
};

const get_scheduling_reason = async (id: string) => {
  return axios
    .post<
      API_get_scheduling_reason['response']
    >('/api/get_scheduling_reason', { id })
    .then(({ data }) => {
      return data.data;
    });
};

const saveCancelReschedule = async ({
  details,
}: {
  details: DatabaseTableInsert['interview_session_cancel'][];
}) => {
  return supabase
    .from('interview_session_cancel')
    .insert(details)
    .then(({ error }) => {
      if (error) {
        throw new Error(error.message);
      }
      return true;
    });
};

const getCancelRescheduleData = async ({
  schedule_id,
}: {
  schedule_id: string;
}) => {
  return supabase
    .from('interview_session_cancel')
    .select('reason, session_id, type, other_details')
    .eq('schedule_id', schedule_id)
    .then(({ data, error }) => {
      if (error) {
        return [];
      }
      return data;
    });
};
