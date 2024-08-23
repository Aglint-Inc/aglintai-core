import { DatabaseTable, DatabaseTableInsert } from '@aglint/shared-types';
import { CandidateResponseSelfSchedule } from '@aglint/shared-types/src/db/tables/application_logs.types';
import { getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { GlobalBanner } from '@/devlink2/GlobalBanner';
import { InterviewConfirmed } from '@/devlink2/InterviewConfirmed';
import { InterviewConfirmedCard } from '@/devlink2/InterviewConfirmedCard';
import axios from '@/src/client/axios';
import CompanyLogo from '@/src/components/Common/CompanyLogo';
import Footer from '@/src/components/Common/Footer';
import { TimezoneObj } from '@/src/components/CompanyDetailComp/SettingsSchedule';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';
import { useCandidateInvite } from '@/src/context/CandidateInviteContext';
import { supabase } from '@/src/utils/supabase/client';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import IconScheduleType from '../../Candidates/ListCard/Icon/IconScheduleType';
import { addScheduleActivity } from '../../Candidates/queries/utils';
import CancelRescheduleDialog from '../CancelScheduleDialog';
import { ScheduleCardProps, ScheduleCardsProps } from '../types';
import { createRequest, dayJS, getCalenderEventUrl } from '../utils';

export const ConfirmedInvitePage = (
  props: ScheduleCardsProps &
    Pick<
      Awaited<ReturnType<typeof useCandidateInvite>>['meta']['data'],
      'candidate' | 'schedule' | 'meetings' | 'filter_json' | 'recruiter'
    > &
    Pick<Awaited<ReturnType<typeof useCandidateInvite>>, 'timezone'> & {
      avail_request_id?: string;
    },
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
            : `${getFullName(candidate.first_name, candidate.last_name)} requested to reschedule the ${meetings?.map((ses) => ses.interview_session.name).join(' , ')}`,
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

    if (details[0]?.other_details) {
      createRequest({
        application_id: schedule.application_id,
        session_ids: details.map((d) => d.session_id),
        new_dates: {
          start_date: details[0].other_details?.dateRange?.start ?? null,
          end_date: details[0].other_details?.dateRange?.end ?? null,
        },
        type: details[0].type,
      });
    }
    return saveCancelReschedule({
      details,
    }).then(() => {
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
                        ` from ${dayjsLocal(cancelReschedulingDetails.other_details.dateRange.start).format('MMMM DD')} to ${dayjsLocal(cancelReschedulingDetails.other_details.dateRange.end).format('MMMM DD, YYYY')}`}
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
  //NOTE: code for creating the request for newSchedule
  return supabase
    .from('interview_session_cancel')
    .insert(details)
    .then(async ({ error }) => {
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
    );
  });

  return sessions;
};

const Logo = ({ companyName, logo }: { companyName: string; logo: string }) => {
  return (
    <Stack height={'60px'}>
      <CompanyLogo companyName={companyName} companyLogo={logo} />
    </Stack>
  );
};
