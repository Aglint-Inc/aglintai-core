import { DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Stack } from '@mui/material';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { ConfirmScheduleList } from '@/devlink3/ConfirmScheduleList';
import { ConfirmScheduleListCard } from '@/devlink3/ConfirmScheduleListCard';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import IconScheduleType from '../../../Candidates/ListCard/Icon/IconScheduleType';
import { getScheduleType } from '../../../Candidates/utils';
import { formatTimeWithTimeZone } from '../../../utils';
import {
  setIsScheduleNowOpen,
  setStepScheduling,
} from '../../SchedulingDrawer/store';
import {
  SchedulingApplication,
  setCancelSessions,
  setMultipleCancelOpen,
  setRescheduleSessionIds,
  setSelectedApplicationLog,
  useSchedulingApplicationStore,
} from '../../store';
import IconSessionType from '../IconSessionType';

function BookingConfirmation({
  act,
}: {
  act: DatabaseTable['application_logs'];
}) {
  const { selectedApplication, initialSessions } =
    useSchedulingApplicationStore((state) => ({
      selectedApplication: state.selectedApplication,
      initialSessions: state.initialSessions,
    }));

  const handleMultipleCancel = async ({
    filter_id,
    availability_request_id,
  }) => {
    try {
      if (filter_id) {
        const { data: checkFilterJson, error: errMeetFilterJson } =
          await supabase
            .from('interview_filter_json')
            .select('*')
            .eq('id', filter_id)
            .single();

        if (errMeetFilterJson || checkFilterJson?.session_ids?.length === 0)
          throw new Error(errMeetFilterJson.message);

        const selectedSessions: SchedulingApplication['cancelSessions'] =
          initialSessions
            .filter((ses) =>
              checkFilterJson.session_ids.includes(ses.interview_session.id),
            )
            .map((ses) => ({
              application_id: selectedApplication.id,
              meeting_id: ses.interview_meeting.id,
              session_id: ses.interview_session.id,
              session_name: ses.interview_session.name,
            }));

        setCancelSessions(selectedSessions);
        setMultipleCancelOpen(true);
      } else if (availability_request_id) {
        const { data: reqAva, error: errReqAva } = await supabase
          .from('candidate_request_availability')
          .select('*')
          .eq('id', availability_request_id)
          .single();

        if (errReqAva || reqAva?.session_ids?.length === 0)
          throw new Error(errReqAva.message);

        const selectedSessions = reqAva.session_ids
          .map((reqses) => {
            const session = initialSessions.find(
              (ses) => ses.interview_session.id === reqses.id,
            );
            return session;
          })
          .map((ses) => ({
            application_id: selectedApplication.id,
            meeting_id: ses.interview_meeting.id,
            session_id: ses.interview_session.id,
            session_name: ses.interview_session.name,
          }));

        setCancelSessions(selectedSessions);
        setMultipleCancelOpen(true);
      }
    } catch (err) {
      toast.error('Failed to cancel the schedule. Please contact support.');
    }
  };

  if (act.metadata.type === 'booking_confirmation') {
    const sessions = act.metadata.sessions;
    const filter_id = act.metadata.filter_id;
    const availability_request_id = act.metadata.availability_request_id;

    const isButtonVisible = act.metadata.sessions.every(
      (session) =>
        initialSessions.find((ses) => ses.interview_session.id === session.id)
          ?.interview_meeting?.status === 'confirmed',
    );

    return (
      <Stack spacing={2} width={'100%'}>
        <Stack spacing={1} width={'100%'}>
          {sessions.map((session) => {
            return (
              <ConfirmScheduleList
                key={session.id}
                textDate={dayjsLocal(
                  session.interview_meeting.start_time,
                ).format('DD MMMM YYYY')}
                slotConfirmScheduleList={
                  <ConfirmScheduleListCard
                    textDuration={getBreakLabel(session.session_duration)}
                    textPanelName={session.name}
                    textMeetingPlatformName={getScheduleType(
                      session.schedule_type,
                    )}
                    textTime={formatTimeWithTimeZone({
                      start_time: session.interview_meeting.start_time,
                      end_time: session.interview_meeting.end_time,
                      timeZone: dayjsLocal.tz.guess(),
                    })}
                    slotIconPanel={
                      <IconSessionType type={session.session_type} />
                    }
                    slotMeetingIcon={
                      <IconScheduleType type={session.schedule_type} />
                    }
                  />
                }
              />
            );
          })}
        </Stack>

        {isButtonVisible &&
          (filter_id || availability_request_id) &&
          act?.metadata?.action === 'waiting' && (
            <Stack direction={'row'} spacing={2}>
              <Stack width={'50%'}>
                <ButtonSoft
                  color={'neutral'}
                  size={1}
                  textButton={'Reschedule'}
                  slotIcon={
                    <Stack>
                      <GlobalIcon iconName={'refresh'} />
                    </Stack>
                  }
                  isLeftIcon={true}
                  onClickButton={{
                    onClick: () => {
                      const session_ids = sessions.map((session) => session.id);
                      setRescheduleSessionIds(session_ids);
                      setStepScheduling('reschedule');
                      setSelectedApplicationLog(act);
                      setIsScheduleNowOpen(true);
                    },
                  }}
                />
              </Stack>

              <Stack width={'50%'}>
                <ButtonSoft
                  size={1}
                  color={'error'}
                  textButton={'Cancel'}
                  onClickButton={{
                    style: { background: '#FFF0F1' },
                    onClick: () => {
                      setMultipleCancelOpen(true);
                      setSelectedApplicationLog(act);
                      handleMultipleCancel({
                        filter_id,
                        availability_request_id,
                      });
                    },
                  }}
                  slotIcon={
                    <Stack>
                      <GlobalIcon iconName={'event_busy'} />
                    </Stack>
                  }
                  isLeftIcon={true}
                />
              </Stack>
            </Stack>
          )}
      </Stack>
    );
  }
}

export default BookingConfirmation;
