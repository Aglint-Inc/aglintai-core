'use strict';

import { Checkbox, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';

import { StatusBadge } from '@/devlink2/StatusBadge';
import { GlobalScheduleCard } from '@/devlink3/GlobalScheduleCard';
import InterviewerAcceptDeclineIcon from '@/src/components/Common/Icons/InterviewerAcceptDeclineIcon';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';
import IconSessionType from '@/src/components/Scheduling/CandidateDetails/RightPanel/IconSessionType';
import IconScheduleType from '@/src/components/Scheduling/Candidates/ListCard/Icon/IconScheduleType';
import { getScheduleType } from '@/src/components/Scheduling/Candidates/utils';
import { formatTimeWithTimeZone } from '@/src/components/Scheduling/utils';
import { applicationQuery, StageWithSessions } from '@/src/queries/application';
import { useAllIntegrations } from '@/src/queries/intergrations';

import {
  setSelectedSessionIds,
  useApplicationDetailStore,
} from '../../../../store';
import BadgesRight from './BadgesRight';
import ButtonGroupRight from './ButtonGroupRight';
import CollapseContent from './Collapse';
import RequestStatusUnconfirmed from './RequestStatusUnconfirmed';

function ScheduleIndividualCard({
  session,
  application_id,
  job_id,
}: {
  session: StageWithSessions[0]['sessions'][0];
  application_id: string;
  job_id: string;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const { data: allIntegrations } = useAllIntegrations();
  const { selectedSessionIds } = useApplicationDetailStore((state) => ({
    selectedSessionIds: state.selectedSessionIds,
  }));

  const users = session.users;
  const interview_meeting = session.interview_meeting;
  const interview_session = session.interview_session;
  const usersWithErrors = users.filter(
    (user) =>
      !!user?.interview_module_relation?.pause_json ||
      !(
        (!!allIntegrations?.service_json &&
          allIntegrations?.google_workspace_domain?.split('//')[1] ===
            user.user_details.email.split('@')[1]) ||
        !!(user.user_details.schedule_auth as any)?.access_token
      ),
  );

  const { data: detail } = useQuery(
    applicationQuery.meta({
      application_id,
      job_id,
    }),
  );


  const onClickCheckBox = ({ session_id }: { session_id: string }) => {
    if (selectedSessionIds.includes(session_id)) {
      return setSelectedSessionIds(
        selectedSessionIds.filter((id) => id !== session_id),
      );
    }
    return setSelectedSessionIds([...selectedSessionIds, session_id]);
  };

  return (
    <GlobalScheduleCard
      isCandidateVisible={false}
      slotStatus={
        interview_meeting?.status === 'confirmed' && (
          <Stack direction={'row'} spacing={'4px'} alignContent={'center'}>
            {users
              .filter((user) => user.interview_session_relation.is_confirmed)
              .map((user, i) => (
                <InterviewerAcceptDeclineIcon
                  key={i}
                  isIcon={true}
                  type={user.interview_session_relation.accepted_status}
                />
              ))}
          </Stack>
        )
      }
      isCheckboxVisible={
        !interview_meeting ||
        interview_meeting.status === 'not_scheduled' ||
        interview_meeting.status === 'cancelled' ||
        interview_meeting.status === 'reschedule'
      }
      slotCheckbox={
        <Checkbox
          size='small'
          disabled={
            usersWithErrors.length === users.length ||
            (session?.interview_module
              ? session.interview_module.is_archived
              : false)
          }
          checked={selectedSessionIds.includes(interview_session.id)}
          onClick={(e) => {
            e.stopPropagation();
            onClickCheckBox({ session_id: interview_session.id });
          }}
        />
      }
      isSelectedVisible={selectedSessionIds.includes(interview_session.id)}
      isDropdownIconVisible={true}
      isDateVisible={
        interview_meeting?.status === 'confirmed' ||
        interview_meeting?.status === 'completed'
      }
      isTimeVisible={
        interview_meeting?.status === 'confirmed' ||
        interview_meeting?.status === 'completed'
      }
      iconPanel={<IconSessionType type={interview_session.session_type} />}
      iconMeetingPlatform={
        <IconScheduleType type={interview_session.schedule_type} />
      }
      isRoleVisible={false}
      slotGlobalBadge={
        interview_meeting?.status ? (
          <StatusBadge
            isCancelledVisible={interview_meeting.status === 'cancelled'}
            isConfirmedVisible={interview_meeting.status === 'confirmed'}
            isWaitingVisible={interview_meeting.status === 'waiting'}
            isCompletedVisible={interview_meeting.status === 'completed'}
            isNotScheduledVisible={
              interview_meeting.status === 'not_scheduled' || false
            }
          />
        ) : (
          <StatusBadge
            isNotScheduledVisible={true}
            isCancelledVisible={false}
            isConfirmedVisible={false}
            isWaitingVisible={false}
            isCompletedVisible={false}
          />
        )
      }
      textDate={
        interview_meeting?.end_time
          ? dayjs(interview_meeting.end_time).format('ddd, MMM DD, YYYY')
          : '--'
      }
      textTime={
        interview_meeting?.start_time
          ? formatTimeWithTimeZone({
              start_time: interview_meeting.start_time,
              end_time: interview_meeting.end_time,
              timeZone: null,
            })
          : '--'
      }
      textCandidateName={detail.name}
      textDuration={getBreakLabel(interview_session.session_duration)}
      textPlaformName={getScheduleType(interview_session.schedule_type)}
      textRole={detail.current_job_title || '--'}
      textPanelName={interview_session.name}
      onClickDropdown={{
        onClick: (e) => {
          e.stopPropagation();
          setCollapsed(!collapsed);
        },
      }}
      slotDropdownContent={
        <CollapseContent
          collapsed={collapsed}
          currentSession={session}
          application_id={application_id}
          job_id={job_id}
        />
      }
      slotButtonViewDetail={
        <ButtonGroupRight
          isViewDetailVisible={true}
          isEditIconVisible={true}
          currentSession={session}
        />
      }
      styleGrid={{
        style: {
          gridTemplateColumns: '1fr 1.8fr 0.8fr',
        },
      }}
      slotRequestStatus={
        <RequestStatusUnconfirmed interview_meeting={interview_meeting} />
      }
      slotRequestDetail={<BadgesRight session={session} />}
    />
  );
}

export default ScheduleIndividualCard;
