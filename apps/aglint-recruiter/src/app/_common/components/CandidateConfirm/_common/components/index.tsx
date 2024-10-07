import { type DatabaseTable } from '@aglint/shared-types';
import {
  getBreakLabel,
  getFullName,
  getShortTimeZone,
} from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { UIAlert } from '@components/ui-alert';

import IconScheduleType from '@/components/Common/Icons/IconScheduleType';
import { UIButton } from '@/components/Common/UIButton';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';
import { type TimezoneObj } from '@/utils/timeZone';

import {
  type ScheduleCardProps,
  type ScheduleCardsProps,
} from '../../../../../(public)/self-scheduling/[filter]/_common/types/types';
import {
  dayJS,
  getCalenderEventUrl,
} from '../../../../../(public)/self-scheduling/[filter]/_common/utils/utils';
import { useGetReasons } from '../hooks/useGetReasons';
import { setIsRescheduleCancelOpen, setReason } from '../store/store';
import RequestCancelDialog from './RequestCancelDialog';
import RequestRescheduleDialog from './RequestRescheduleDialog';
import InterviewConfirmed from './ui/InterviewConfirmed';
import { InterviewConfirmedCard } from './ui/InterviewConfirmedCard';

export const ConfirmedInvitePage = (
  props: ScheduleCardsProps & {
    recruiter: {
      name: string;
      logo: string | null;
    };
    application_id: string;
    filter_json?: DatabaseTable['interview_filter_json'];
    meetings: {
      interview_session: DatabaseTable['interview_session'];
      interview_meeting: DatabaseTable['interview_meeting'];
    }[];
    candidate: DatabaseTable['candidates'];
    timezone: TimezoneObj;
    avail_request_id?: string;
  },
) => {
  const { candidate, meetings, timezone, application_id, filter_json } = props;
  const { data, isLoading } = useGetReasons({
    session_ids: meetings.map((ses) => ses.interview_session.id),
    application_id,
    recruiter_id: candidate.recruiter_id,
  });
  const scheduling_reason = data?.scheduling_reason['candidate'];
  const cancelData = data?.cancel_data[0] as Pick<
    DatabaseTable['interview_session_cancel'],
    'created_at' | 'type' | 'reason' | 'other_details' | 'session_id'
  >; // type can be removed when strict true

  return (
    <>
      {!isLoading && (
        <div className='h-full w-full bg-white p-4'>
          <div className='mx-auto w-full max-w-[600px]'>
            {cancelData && (
              <UIAlert
                type='info'
                title={
                  'Your interview has been scheduled, and we look forward to talking with you. Your calendar invite should be in your email.'
                }
              >
                {
                  <>
                    <span className='text-sm'>
                      {'Request to '}
                      {capitalizeFirstLetter(
                        cancelData.type == 'declined' ? 'cancel' : 'reschedule',
                      )}
                      {' all sessions'}
                      {cancelData.type == 'reschedule' &&
                        cancelData?.other_details?.dateRange?.start &&
                        ` from ${dayjsLocal(cancelData.other_details.dateRange.start).format('MMMM DD')} to ${dayjsLocal(cancelData.other_details.dateRange.end).format('MMMM DD, YYYY')}`}
                      {' received,'} and under review.
                    </span>
                    {cancelData && (
                      <p className='text-sm'>
                        <span className='font-medium'>Reason: </span>
                        {cancelData.reason}
                      </p>
                    )}
                    {cancelData.other_details?.note && (
                      <p className='text-sm'>
                        <span className='font-medium'>Additional Notes: </span>
                        {cancelData.other_details.note}
                      </p>
                    )}
                  </>
                }
              </UIAlert>
            )}
          </div>
          <InterviewConfirmed
            slotInterviewConfirmedCard={
              <ConfirmedScheduleCards
                rounds={props.rounds}
                timezone={timezone}
              />
            }
            slotButton={
              <div className='flex flex-row gap-2'>
                {!cancelData && (
                  <div className='flex gap-2'>
                    <UIButton
                      size={'md'}
                      color={'neutral'}
                      onClick={() => {
                        setReason(scheduling_reason['rescheduling'][0]);
                        setIsRescheduleCancelOpen('reschedule');
                      }}
                      type='submit'
                      variant='outline'
                    >
                      Reschedule Interview
                    </UIButton>
                    <UIButton
                      size={'md'}
                      variant='destructive'
                      onClick={() => {
                        setReason(scheduling_reason['cancellation'][0]);
                        setIsRescheduleCancelOpen('cancel');
                      }}
                    >
                      Cancel Interview
                    </UIButton>
                  </div>
                )}
              </div>
            }
          />
          <RequestCancelDialog
            reasons={scheduling_reason['cancellation'] || []}
            meetings={meetings}
            application_id={application_id}
            filter_json_id={filter_json?.id ?? null}
            candidate_name={getFullName(
              candidate.first_name,
              candidate.last_name,
            )}
          />
          <RequestRescheduleDialog
            reasons={scheduling_reason['rescheduling'] || []}
            meetings={meetings}
            application_id={application_id}
            filter_json_id={filter_json?.id ?? null}
            candidate_name={getFullName(
              candidate.first_name,
              candidate.last_name,
            )}
          />
        </div>
      )}
    </>
  );
};

const ConfirmedScheduleCards = (
  props: ScheduleCardsProps & { timezone: TimezoneObj },
) => {
  const scheduleCards = props.rounds.map((round, index) => (
    <ConfirmedScheduleCard
      key={index}
      round={round}
      index={index}
      showTitle={props.rounds.length !== 1}
      timezone={props.timezone}
    />
  ));

  return <>{scheduleCards}</>;
};

const ConfirmedScheduleCard = (
  props: ScheduleCardProps & { timezone: TimezoneObj },
) => {
  const { timezone } = props;
  const [month, date, day, year] = dayJS(
    props?.round?.sessions?.[0].interview_meeting?.start_time ?? '',
    timezone.tzCode,
  )
    .format('MMMM DD ddd YYYY')
    .split(' ');

  const sessions = props.round.sessions.map((session, i) => {
    const name = session.interview_session.name;
    const tz = getShortTimeZone(timezone.tzCode);
    const time =
      session.interview_meeting.start_time && session.interview_meeting.end_time
        ? `${dayJS(
            session.interview_meeting.start_time,
            timezone.tzCode,
          ).format('hh:mm A')} to ${dayJS(
            session.interview_meeting.end_time,
            timezone.tzCode,
          ).format('hh:mm A')} ${tz}`
        : '';

    return (
      <InterviewConfirmedCard
        key={i}
        slotMeetingIcon={
          <IconScheduleType type={session.interview_session.schedule_type} />
        }
        isAddtoCalenderVisible={true}
        isJoinMeetingButtonVisible={true}
        onClickAddCalendar={() => {
          if (
            session.interview_meeting.start_time &&
            session.interview_meeting.end_time
          ) {
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
            );
          }
        }}
        textDate={
          props?.round?.sessions?.[0].interview_meeting?.start_time
            ? `${day}, ${month} ${date}, ${year}`
            : ''
        }
        textDuration={getBreakLabel(session.interview_session.session_duration)}
        textPanel={name}
        textPlatformName={capitalizeFirstLetter(
          session.interview_session.schedule_type,
        )}
        onClickJoinGoogleMeet={() => {
          if (session.interview_meeting.meeting_link) {
            window.open(session.interview_meeting.meeting_link, '_blank');
          }
        }}
        textTime={time}
      />
    );
  });

  return sessions;
};
