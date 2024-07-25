/* eslint-disable security/detect-object-injection */
import {
  DatabaseTable,
  DatabaseTableInsert,
  SessionsCombType,
} from '@aglint/shared-types';
import { CandidateResponseSelfSchedule } from '@aglint/shared-types/src/db/tables/application_logs.types';
import { SINGLE_DAY_TIME } from '@aglint/shared-utils';
import {
  Container,
  Dialog,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { ButtonSurface } from '@/devlink/ButtonSurface';
import { CandidateConfirmationPage } from '@/devlink/CandidateConfirmationPage';
import { CandidateScheduleCard } from '@/devlink/CandidateScheduleCard';
import { DcPopup } from '@/devlink/DcPopup';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { IconButtonGhost } from '@/devlink/IconButtonGhost';
import { IconButtonSoft } from '@/devlink/IconButtonSoft';
import { Page404 } from '@/devlink/Page404';
import { SelectedDateAndTime } from '@/devlink/SelectedDateAndTime';
import { SessionAndTime } from '@/devlink/SessionAndTime';
import { SessionInfo } from '@/devlink/SessionInfo';
import { GlobalBanner } from '@/devlink2/GlobalBanner';
import { InterviewConfirmed } from '@/devlink2/InterviewConfirmed';
import { InterviewConfirmedCard } from '@/devlink2/InterviewConfirmedCard';
import { RequestReschedule } from '@/devlink2/RequestReschedule';
import CandidateSlotLoad from '@/public/lottie/CandidateSlotLoad';
import { useCandidateInvite } from '@/src/context/CandidateInviteContext';
import { API_get_scheduling_reason } from '@/src/pages/api/get_scheduling_reason/types';
import { useInviteSlots } from '@/src/queries/candidate-invite';
import { supabase } from '@/src/utils/supabase/client';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';
import toast from '@/src/utils/toast';

import CompanyLogo from '../../Common/CompanyLogo';
import Footer from '../../Common/Footer';
import Loader from '../../Common/Loader';
import { getBreakLabel } from '../../Jobs/Job/Interview-Plan/utils';
import IconScheduleType from '../Candidates/ListCard/Icon/IconScheduleType';
import { addScheduleActivity } from '../Candidates/queries/utils';
import { getScheduleType } from '../Candidates/utils';
import { SessionIcon } from '../Common/ScheduleProgress/ScheduleProgressPillComp';
import { TimezoneObj, TimezoneSelector } from '../Settings';
import { DateIcon } from '../Settings/Components/DateSelector';
import CandidateInviteCalendar, {
  CandidateInviteCalendarProps,
} from './calender';
import { dayJS, getCalenderEventUrl, getDurationText } from './utils';

const CandidateInviteNew = () => {
  const load = useCandidateInvite();

  return (
    <Stack
      height={'100vh'}
      width={'100%'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      {load === undefined ? (
        <Stack>
          <Loader />
        </Stack>
      ) : load === null ? (
        <Stack width={'100%'} height={'100vh'}>
          <Page404 text404='The requested page was not found' />
          <Stack bgcolor={'var(--neutral-2)'} height={'48px'}>
            <Footer brand={true} />
          </Stack>
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

type ScheduleCardProps = {
  round: ScheduleCardsProps['rounds'][number];
  index: number;
  showTitle: boolean;
};

const CandidateInvitePlanPage = () => {
  const {
    setDetailsPop,
    meta: {
      data: { candidate, meetings, filter_json, schedule, recruiter },
    },
    timezone,
    setSelectedSlots,
    setTimezone,
    handleViewedOn,
  } = useCandidateInvite();

  useEffect(() => {
    if (filter_json?.id) {
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

  if (meetings.length === 0)
    return (
      <Stack width={'100%'} height={'100vh'}>
        <Page404 />
        <Stack bgcolor={'var(--neutral-2)'} height={'48px'}>
          <Footer brand={true} />
        </Stack>
      </Stack>
    );

  if (!waiting)
    return (
      <ConfirmedInvitePage
        rounds={rounds}
        candidate={candidate}
        filter_json={filter_json}
        meetings={meetings}
        schedule={schedule}
        recruiter={recruiter}
        timezone={timezone}
      />
    );

  return (
    <Stack
      sx={{
        backgroundColor: 'var(--sand-3)',
        width: '100%',
        minHeight: '100vh',
        overflow: 'auto',
        paddingBottom: '24px',
      }}
    >
      <CandidateConfirmationPage
        slotCompanyLogo={
          <Logo companyName={recruiter.name} logo={recruiter.logo} />
        }
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
      <Footer brand={true} />
    </Stack>
  );
};

type ScheduleCardsProps = {
  rounds: {
    title: string;
    sessions: ReturnType<typeof useCandidateInvite>['meta']['data']['meetings'];
  }[];
};

export const ConfirmedInvitePage = (
  props: ScheduleCardsProps &
    Pick<
      Awaited<ReturnType<typeof useCandidateInvite>>['meta']['data'],
      'candidate' | 'schedule' | 'meetings' | 'filter_json' | 'recruiter'
    > &
    Pick<Awaited<ReturnType<typeof useCandidateInvite>>, 'timezone'>,
) => {
  const { candidate, filter_json, meetings, schedule, recruiter, timezone } =
    props;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (schedule?.id && candidate?.recruiter_id) {
      get_scheduling_reason(candidate.recruiter_id).then((data) => {
        setSchedulingReason(data);
      });
      getCancelRescheduleData({
        schedule_id: schedule.id,
        session_ids: meetings.flatMap((ses) => ses.interview_session.id),
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

        setLoading(false);
      });
    }
  }, [props]);

  const handleCancelReschedule = async (
    detail: Omit<DatabaseTableInsert['interview_session_cancel'], 'session_id'>,
  ) => {
    // return true;

    if (filter_json?.id) {
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
    }

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

  const reasons = cancelReschedulingDetails?.sessions.map(
    (session) => session.reason,
  );

  return (
    <>
      {!loading && (
        <Stack
          sx={{
            backgroundColor: 'var(--sand-3)',
            width: '100%',
            minHeight: '100vh',
            overflow: 'auto',
            paddingBottom: '24px',
          }}
        >
          <Stack
            sx={{
              backgroundColor: 'white',
              maxWidth: '760px',
              width: '100%',
              marginInline: 'auto',
              marginTop: '10px',
              zIndex: '10',
              transform: 'translateY(50px)',
            }}
          >
            {cancelReschedulingDetails?.all && (
              <GlobalBanner
                iconName='info'
                textTitle=''
                slotButtons={<></>}
                color={'info'}
                textDescription={
                  <>
                    <Typography>
                      {'Request to '}
                      {capitalizeFirstLetter(
                        cancelReschedulingDetails.type == 'declined'
                          ? 'cancel'
                          : 'reschedule',
                      )}
                      {' all sessions'}
                      {cancelReschedulingDetails.type == 'reschedule' &&
                        ` from ${dayjs(cancelReschedulingDetails.other_details.dateRange.start).format('MMMM DD')} to ${dayjs(cancelReschedulingDetails.other_details.dateRange.end).format('MMMM DD, YYYY')}`}
                      {' received,'} and under review.
                    </Typography>
                    {reasons.length && (
                      <Typography>
                        <span style={{ fontWeight: '500' }}>Reason: </span>
                        {reasons.join(', ')}
                      </Typography>
                    )}
                    {cancelReschedulingDetails.other_details.note && (
                      <Typography>
                        <span style={{ fontWeight: '500' }}>
                          Additional Notes:{' '}
                        </span>
                        {cancelReschedulingDetails.other_details.note}
                      </Typography>
                    )}
                  </>
                }
              />
            )}
          </Stack>
          <InterviewConfirmed
            isBannerVisible={Boolean(cancelReschedulingDetails?.all)}
            slotCompanyLogo={
              <Logo companyName={recruiter.name} logo={recruiter.logo} />
            }
            slotInterviewConfirmedCard={
              <ConfirmedScheduleCards
                rounds={props.rounds}
                isValid={!cancelReschedulingDetails?.all}
                timezone={timezone}
              />
            }
            textDesc={
              'Your interview has been scheduled, and we look forward to talking with you. Your calendar invite should be in your email.'
            }
            textMailSent={candidate.email}
            slotButton={
              <Stack direction={'row'} gap={2}>
                {(!cancelReschedulingDetails ||
                  cancelReschedulingDetails.all == false) && (
                  <Stack direction={'row'} gap={'var(--space-2)'}>
                    <ButtonSoft
                      textButton={'Reschedule'}
                      size={2}
                      color={'neutral'}
                      iconName='event_repeat'
                      isLeftIcon
                      onClickButton={{
                        onClick: () => setCancelReschedule('reschedule'),
                      }}
                    />
                    <ButtonSoft
                      textButton={'Cancel'}
                      size={2}
                      color={'error'}
                      iconName='event_busy'
                      isLeftIcon
                      onClickButton={{
                        onClick: () => setCancelReschedule('cancel'),
                      }}
                    />
                  </Stack>
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
                cancelReschedule === 'reschedule'
                  ? 'Reschedule'
                  : 'Cancel Interview'
              }
              type={cancelReschedule}
            />
          )}
          <Footer brand={true} />
        </Stack>
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
        slotButton={
          <IconButtonGhost
            color={'neutral'}
            size={1}
            iconName={'close'}
            onClickButton={{
              onClick: () => {
                setDetailsPop(false);
              },
            }}
          />
        }
        isSlotButtonVisible={true}
        textDuration={getDurationText(duration)}
        onClickClose={{ onClick: () => setDetailsPop(false) }}
        textPopupTitle={schedule_name}
        slotSessionInfo={<Sessions sessions={meetings} showBreak={true} />}
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
  const [formData, setFormData] = useState<{
    type;
    dateRange: { start: string; end: string };
    reason: string;
    additionalNote: string;
  }>({
    type,
    reason: options[0],
    dateRange: {
      start: dayjs().toISOString(),
      end: dayjs().add(7, 'day').toISOString(),
    },
    additionalNote: null,
  });
  const [selectedDateRangeError, setSelectedDateRangeError] = useState(false);
  const handleSubmit = () => {
    if (type === 'reschedule') {
      const error = !formData.dateRange.start || !formData.dateRange.end;
      if (selectedDateRangeError || error) return;
      setSelectedDateRangeError(error);
    }
    onSubmit({
      reason: formData.reason,
      type: type === 'cancel' ? 'declined' : type,
      other_details: {
        dateRange: type === 'cancel' ? null : formData.dateRange,
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
        !formData.dateRange.start || !formData.dateRange.end,
      ),
    [formData.dateRange.start, formData.dateRange.end],
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
        slotCancelButton={
          <ButtonSoft
            textButton='Close'
            size={2}
            onClickButton={{ onClick: onClose }}
            color={'neutral'}
          />
        }
        slotDateRangeInput={
          <Stack spacing={2} direction={'row'}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dayjs(formData.dateRange.start)}
                onChange={(newValue) => {
                  if (dayjs(newValue) < dayjs(formData.dateRange.end)) {
                    setFormData((pre) => {
                      pre.dateRange.start = dayjs(newValue).toISOString();
                      return pre;
                    });
                  } else {
                    setFormData((pre) => {
                      pre.dateRange.start = dayjs(newValue).toISOString();
                      pre.dateRange.end = null;
                      return pre;
                    });
                  }
                }}
                minDate={dayjs()}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    margin: 'none',
                    placeholder: 'Start Date',
                  },
                }}
                slots={{
                  openPickerIcon: DateIcon,
                }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dayjs(formData.dateRange.end)}
                minDate={dayjs(formData.dateRange.start)}
                maxDate={dayjs(formData.dateRange.start).add(1, 'month')}
                onChange={(newValue) => {
                  setFormData((pre) => {
                    pre.dateRange.end = dayjs(newValue).toISOString();
                    return pre;
                  });
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    margin: 'none',
                    placeholder: 'End Date',
                  },
                }}
                slots={{
                  openPickerIcon: DateIcon,
                }}
              />
            </LocalizationProvider>
          </Stack>
        }
        slotRadioText={
          <FormControl>
            <RadioGroup
              name='radio-buttons-group'
              value={formData.reason}
              onChange={(e) => {
                setFormData((pre) => ({
                  ...pre,
                  reason: e.currentTarget.value,
                }));
              }}
              sx={{ gap: '4px' }}
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
          </FormControl>
        }
        slotPrimaryButton={
          <Stack>
            {type === 'reschedule' && (
              <ButtonSolid
                textButton='Request Reschedule'
                size={2}
                onClickButton={{ onClick: handleSubmit }}
              />
            )}
            {type === 'cancel' && (
              <ButtonSolid
                textButton='Cancel Interview'
                size={2}
                color={'error'}
                onClickButton={{ onClick: handleSubmit }}
              />
            )}
          </Stack>
        }
        slotInputAdditionalNotes={
          <TextField
            multiline
            placeholder='Add additional notes.'
            rows={6}
            value={formData.additionalNote}
            fullWidth
            onChange={(e) =>
              setFormData((pre) => ({
                ...pre,
                additionalNote: e.target.value,
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
      <DcPopup
        popupName={'Confirm your interview'}
        slotBody={
          <Stack>
            <Typography mb={2}>
              Before we finalize your schedule, please take a moment to confirm
              the chosen option. Your interview is crucial, and we want to
              ensure it aligns perfectly with your availability.
            </Typography>
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
          </Stack>
        }
        onClickClosePopup={{ onClick: handleClose }}
        slotButtons={
          <>
            <ButtonSoft
              textButton='Cancel'
              size={2}
              color={'neutral'}
              onClickButton={{
                onClick: () => handleClose(),
              }}
            />
            <ButtonSolid
              size={2}
              textButton={'Confirm'}
              onClickButton={{ onClick: handleSubmit }}
            />
          </>
        }
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

const ConfirmedScheduleCards = (
  props: ScheduleCardsProps & { isValid: boolean } & { timezone: TimezoneObj },
) => {
  const scheduleCards = props.rounds.map((round, index) => (
    <ConfirmedScheduleCard
      key={index}
      round={round}
      index={index}
      showTitle={props.rounds.length !== 1}
      isValid={props.isValid}
      timezone={props.timezone}
    />
  ));

  return <>{scheduleCards}</>;
};

const ConfirmedScheduleCard = (
  props: ScheduleCardProps & { isValid: boolean } & { timezone: TimezoneObj },
) => {
  const { timezone } = props;
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
        isAddtoCalenderVisible={props.isValid}
        isJoinMeetingButtonVisible={props.isValid}
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
          size={2}
          onClickButton={{
            onClick: () => {
              setOpen(true);
            },
          }}
          isDisabled={!enabled}
        />
      </Stack>
      <MultiDayConfirmation
        rounds={props.rounds}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

type MultiDayConfirmationProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  rounds: ScheduleCardsProps['rounds'];
};
const MultiDayConfirmation = (props: MultiDayConfirmationProps) => {
  const { handleSubmit } = useCandidateInvite();
  const handleClose = () => {
    props.setOpen(false);
  };
  const { selectedSlots, timezone } = useCandidateInvite();

  type SelectedDateAndSessionsType = {
    date: string;
    sessions: SessionsCombType['sessions'] | null;
  }[];
  const [selectedDateAndSessions, setSelectedDateAndSessions] =
    useState<SelectedDateAndSessionsType>([]);

  function getSelectedDateAndSessions() {
    const sessions = selectedSlots.map((round, i) => {
      return {
        date: dayJS(
          round?.sessions?.[0]?.start_time ?? null,
          timezone.tzCode,
        ).format('MMMM DD'),
        sessions: selectedSlots?.[i]?.sessions,
      };
      //@ts-ignore
    });
    setSelectedDateAndSessions(sessions);
  }
  useEffect(() => {
    getSelectedDateAndSessions();
  }, [props.rounds]);

  return (
    <Dialog open={props.open} onClose={() => handleClose()}>
      <DcPopup
        popupName={'Confirm your interview'}
        slotBody={
          <Stack gap={'10px'}>
            <Stack>
              {selectedDateAndSessions.map((item, index) => (
                <>
                  <Typography variant='subtitle1'>
                    Day-{index + 1} -{' '}
                    {item.sessions.map((ele) => ele.session_name).join(' ,')} on{' '}
                    {item.date}
                  </Typography>
                </>
              ))}
            </Stack>
            <Typography>
              Please review and confirm your selected time slot before we
              finalize your schedule. It’s important that your interview time
              aligns with your availability.
            </Typography>
          </Stack>
        }
        onClickClosePopup={{ onClick: handleClose }}
        slotButtons={
          <>
            <ButtonSoft
              textButton='Cancel'
              size={2}
              color={'neutral'}
              onClickButton={{
                onClick: () => handleClose(),
              }}
            />
            <ButtonSolid
              size={2}
              textButton={'Confirm'}
              onClickButton={{ onClick: handleSubmit }}
            />
          </>
        }
      />
    </Dialog>
  );
};

const ScheduleCards = (props: ScheduleCardsProps) => {
  const scheduleCards = props.rounds.map((round, index) => (
    <ScheduleCard key={index} round={round} index={index} showTitle={true} />
  ));

  return <>{scheduleCards}</>;
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
      iconName={
        interview_session.schedule_type === 'google_meet' ||
        interview_session.schedule_type === 'zoom'
          ? 'videocam'
          : interview_session.schedule_type === 'phone_call'
            ? 'call'
            : 'person'
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
      iconName={''}
    />
  );
};

const Logo = ({ companyName, logo }: { companyName: string; logo: string }) => {
  return (
    <Stack height={'60px'}>
      <CompanyLogo companyName={companyName} companyLogo={logo} />
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
  session_ids,
  schedule_id,
}: {
  session_ids: string[];
  schedule_id: string;
}) => {
  return supabase
    .from('interview_session_cancel')
    .select('reason, session_id, type, other_details')
    .eq('is_resolved', false)
    .eq('is_ignored', false)
    .in('session_id', session_ids)
    .eq('schedule_id', schedule_id)
    .then(({ data, error }) => {
      if (error) {
        return [];
      }
      return data;
    });
};
