import { type DatabaseTable } from '@aglint/shared-types';
import { type CandidateResponseSelfSchedule } from '@aglint/shared-types/src/db/tables/application_logs.types';
import { getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { GlobalBanner } from '@devlink2/GlobalBanner';
import { InterviewConfirmed } from '@devlink2/InterviewConfirmed';
import { InterviewConfirmedCard } from '@devlink2/InterviewConfirmedCard';
import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import axios from '@/client/axios';
import CompanyLogo from '@/components/Common/CompanyLogo';
import Footer from '@/components/Common/Footer';
import IconScheduleType from '@/components/Common/Icons/IconScheduleType';
import { TimezoneObj } from '@/components/CompanyDetailComp/Scheduling';
import { getBreakLabel } from '@/components/Jobs/Job/Interview-Plan/utils';
import { type useCandidateInvite } from '@/context/CandidateInviteContext';
import { type API_get_scheduling_reason } from '@/pages/api/get_scheduling_reason';
import { addScheduleActivity } from '@/utils/scheduling/utils';
import { supabase } from '@/utils/supabase/client';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import CancelRescheduleDialog from '../CancelScheduleDialog';
import { type ScheduleCardProps, type ScheduleCardsProps } from '../types';
import { createRequest, dayJS, getCalenderEventUrl } from '../utils';
import { Button } from '@components/ui/button';

export const ConfirmedInvitePage = (
  props: ScheduleCardsProps &
    Pick<
      Awaited<ReturnType<typeof useCandidateInvite>>['meta']['data'],
      'candidate' | 'meetings' | 'filter_json' | 'recruiter' | 'application_id'
    > &
    Pick<Awaited<ReturnType<typeof useCandidateInvite>>, 'timezone'> & {
      avail_request_id?: string;
    },
) => {
  const {
    candidate,
    filter_json,
    meetings,
    recruiter,
    timezone,
    application_id,
  } = props;
  const [cancelReschedule, setCancelReschedule] = useState<
    'reschedule' | 'cancel'
  >(null);
  const [scheduling_reason, setSchedulingReason] =
    useState<DatabaseTable['recruiter']['scheduling_reason']>(null);
  const [cancelReschedulingDetails, setCancelReschedulingDetails] = useState<{
    all: boolean;
    type: 'reschedule' | 'declined';
    other_details: DatabaseTable['interview_session_cancel']['other_details'];
    sessions: {
      session_id: string;
      reason: string;
      other_details: DatabaseTable['interview_session_cancel']['other_details'];
      type: 'reschedule' | 'declined';
    }[];
  }>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (application_id && candidate?.recruiter_id) {
      const session_ids = meetings.map((ses) => ses.interview_session.id);
      get_scheduling_reason({
        application_id: application_id,
        recruiter_id: candidate.recruiter_id,
        session_ids,
      }).then((data) => {
        setSchedulingReason(data.scheduling_reason);
        const cancelData = data.cancel_data;
        const temp = new Set(
          props.rounds
            .map((round) =>
              round.sessions.map((ses) => ses.interview_session.id),
            )
            .flat(2),
        );

        cancelData.length &&
          setCancelReschedulingDetails({
            all:
              cancelData.length == temp.size ||
              cancelData.every((item) => temp.has(item.session_id)),
            type: data[0]?.type,
            other_details: data[0]?.other_details,
            sessions: cancelData,
          });

        setLoading(false);
      });
    }
  }, [props]);

  const handleCancelReschedule = async ({
    reason,
    other_details,
    type,
  }: {
    reason: string;
    other_details: DatabaseTable['interview_session_cancel']['other_details'];
    type: DatabaseTable['interview_session_cancel']['type'];
  }) => {
    // return true;

    if (filter_json?.id) {
      const metadata: CandidateResponseSelfSchedule = {
        action: 'waiting',
        type: 'candidate_response_self_schedule',
        reason: reason,
        other_details: other_details,
        response_type: type === 'declined' ? 'cancel' : 'reschedule',
        filter_id: filter_json.id,
        session_ids: meetings.map((ses) => ses.interview_session.id),
      };

      addScheduleActivity({
        title:
          type === 'declined'
            ? `Canceled ${meetings?.map((ses) => ses.interview_session.name).join(' , ')}`
            : `${getFullName(candidate.first_name, candidate.last_name)} requested to reschedule the ${meetings?.map((ses) => ses.interview_session.name).join(' , ')}`,
        application_id,
        logged_by: 'candidate',
        supabase: supabase,
        created_by: null,
        metadata,
      });
    }

    const session_ids = meetings.map((ses) => ses.interview_session.id);
    await createRequest({
      application_id,
      session_ids,
      new_dates: {
        start_date: other_details?.dateRange?.start ?? null,
        end_date: other_details?.dateRange?.end ?? null,
      },
      type,
      other_details,
      reason,
    });

    setCancelReschedulingDetails({
      all: true,
      type: type,
      other_details: other_details,
      sessions: session_ids.map((id) => ({
        session_id: id,
        reason: reason,
        other_details: other_details,
        type: type,
      })),
    });

    return true;
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
                    {cancelReschedulingDetails.other_details?.note && (
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
                  <div>
                    <Button
                      size={'md'}
                      color={'neutral'}
                      onClick={() => setCancelReschedule('reschedule')}
                      type='submit'
                      variant='outline'
                    >
                      Reschedule
                    </Button>
                    <Button
                      size={'md'}
                      color={'neutral'}
                      onClick={() => setCancelReschedule('cancel')}
                      variant='default'
                    >
                      Cancel
                    </Button>
                  </div>
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

const get_scheduling_reason = async (
  params: API_get_scheduling_reason['request'],
) => {
  return axios
    .post<
      API_get_scheduling_reason['response']
    >('/api/get_scheduling_reason', params)
    .then(({ data }) => {
      return data.data;
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
