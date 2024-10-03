import { type DatabaseTable } from '@aglint/shared-types';
import { type CandidateResponseSelfSchedule } from '@aglint/shared-types/src/db/tables/application_logs.types';
import { getBreakLabel, getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Building2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import axios from '@/client/axios';
import Footer from '@/components/Common/Footer';
import IconScheduleType from '@/components/Common/Icons/IconScheduleType';
import { UIAlert } from '@/components/Common/UIAlert';
import { UIButton } from '@/components/Common/UIButton';
import { type API_get_scheduling_reason } from '@/pages/api/get_scheduling_reason';
import { addScheduleActivity } from '@/utils/scheduling/utils';
import { supabase } from '@/utils/supabase/client';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';
import { type TimezoneObj } from '@/utils/timeZone';

import { type useInviteMeta } from '../../../(public)/scheduling/invite/[id]/_common/hooks/useInviteMeta';
import { type CandidateInviteType } from '../../../(public)/scheduling/invite/[id]/_common/store';
import {
  type ScheduleCardProps,
  type ScheduleCardsProps,
} from '../../../(public)/scheduling/invite/[id]/_common/types/types';
import {
  createRequest,
  dayJS,
  getCalenderEventUrl,
} from '../../../(public)/scheduling/invite/[id]/_common/utils/utils';
import CancelRescheduleDialog from './CancelScheduleDialog';
import InterviewConfirmed from './InterviewConfirmed';
import { InterviewConfirmedCard } from './InterviewConfirmedCard';

export const ConfirmedInvitePage = (
  props: ScheduleCardsProps &
    Pick<
      Awaited<ReturnType<typeof useInviteMeta>>['data'],
      'candidate' | 'meetings' | 'filter_json' | 'recruiter' | 'application_id'
    > & {
      timezone: CandidateInviteType['timezone'];
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
        <div className='h-full w-full bg-white p-4'>
          <div className='mx-auto w-full max-w-[600px]'>
            {cancelReschedulingDetails?.all && (
              <UIAlert
                iconName='Info'
                color={'info'}
                description={
                  <>
                    <span className='text-sm'>
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
                    </span>
                    {reasons.length && (
                      <p className='text-sm'>
                        <span className='font-medium'>Reason: </span>
                        {reasons.join(', ')}
                      </p>
                    )}
                    {cancelReschedulingDetails.other_details?.note && (
                      <p className='text-sm'>
                        <span className='font-medium'>Additional Notes: </span>
                        {cancelReschedulingDetails.other_details.note}
                      </p>
                    )}
                  </>
                }
              />
            )}
          </div>
          <InterviewConfirmed
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
              <div className='flex flex-row gap-2'>
                {(!cancelReschedulingDetails ||
                  cancelReschedulingDetails.all == false) && (
                  <div className='flex gap-2'>
                    <UIButton
                      size={'md'}
                      color={'neutral'}
                      onClick={() => setCancelReschedule('reschedule')}
                      type='submit'
                      variant='outline'
                    >
                      Reschedule
                    </UIButton>
                    <UIButton
                      size={'md'}
                      color={'neutral'}
                      onClick={() => setCancelReschedule('cancel')}
                      variant='default'
                    >
                      Cancel
                    </UIButton>
                  </div>
                )}
              </div>
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
        </div>
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
        onClickAddCalendar={() =>
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
          )
        }
        textDate={`${day}, ${month} ${date}, ${year}`}
        textDuration={getBreakLabel(session.interview_session.session_duration)}
        textPanel={name}
        textPlatformName={capitalizeFirstLetter(
          session.interview_session.schedule_type,
        )}
        onClickJoinGoogleMeet={() =>
          window.open(session.interview_meeting.meeting_link, '_blank')
        }
        textTime={duration}
      />
    );
  });

  return sessions;
};

const Logo = ({ companyName, logo }: { companyName: string; logo: string }) => {
  return (
    <div className={'relative max-h-[60px] max-w-[60px]'}>
      <div className='relative h-[60px] w-[60px]'>
        <Image
          src={logo}
          alt={companyName}
          width={60}
          height={60}
          className='object-contain'
          onError={(e) => {
            if (e.currentTarget instanceof HTMLImageElement) {
              e.currentTarget.style.display = 'none';
              const fallback =
                e.currentTarget.parentElement?.querySelector('.fallback');
              if (fallback instanceof HTMLElement)
                fallback.style.display = 'flex';
            }
          }}
        />
        <div className='fallback absolute inset-0 hidden items-center justify-center'>
          <Building2 className='h-10 w-10 text-neutral-400' />
        </div>
      </div>
    </div>
  );
};
