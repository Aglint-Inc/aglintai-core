'use strict';

import { Checkbox, Stack } from '@mui/material';
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
import { StageWithSessions } from '@/src/queries/application';
import { useAllIntegrations } from '@/src/queries/intergrations';

import BadgesRight from './BadgesRight';
import ButtonGroupRight from './ButtonGroupRight';
import CollapseContent from './Collapse';
import RequestStatusUnconfirmed from './RequestStatusUnconfirmed';

function ScheduleIndividualCard({
  session,
  selectedSessionIds,
  onClickCheckBox,
  isCheckboxVisible = false,
  candidate,
  isEditIconVisible = false,
  isViewDetailVisible = false,
  isStatusVisible = true,
  hideDateAndTime = false,
}: {
  session: StageWithSessions[0]['sessions'][0];
  selectedSessionIds: string[];
  // eslint-disable-next-line no-unused-vars
  onClickCheckBox: ({ session_id }: { session_id: string }) => void;
  isCheckboxVisible?: boolean;
  candidate?: {
    name: string;
    current_job_title: string;
    timezone: string;
  };
  isEditIconVisible?: boolean;
  isViewDetailVisible?: boolean;
  isStatusVisible?: boolean;
  hideDateAndTime?: boolean;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const { data: allIntegrations } = useAllIntegrations();

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
      isCheckboxVisible={isCheckboxVisible}
      slotCheckbox={
        isCheckboxVisible && (
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
        )
      }
      isSelectedVisible={selectedSessionIds.includes(interview_session.id)}
      isDropdownIconVisible={true}
      iconPanel={<IconSessionType type={interview_session.session_type} />}
      iconMeetingPlatform={
        <IconScheduleType type={interview_session.schedule_type} />
      }
      isRoleVisible={false}
      slotGlobalBadge={
        isStatusVisible &&
        (interview_meeting?.status ? (
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
        ))
      }
      isDateVisible={
        !hideDateAndTime &&
        (interview_meeting?.status === 'confirmed' ||
          interview_meeting?.status === 'completed')
      }
      isTimeVisible={
        !hideDateAndTime &&
        (interview_meeting?.status === 'confirmed' ||
          interview_meeting?.status === 'completed')
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
      textCandidateName={candidate?.name}
      textDuration={getBreakLabel(interview_session.session_duration)}
      textPlaformName={getScheduleType(interview_session.schedule_type)}
      textRole={candidate?.current_job_title || '--'}
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
          candidate={candidate}
        />
      }
      slotButtonViewDetail={
        <ButtonGroupRight
          isViewDetailVisible={isViewDetailVisible}
          isEditIconVisible={isEditIconVisible}
          currentSession={session}
        />
      }
      styleGrid={{
        style: {
          gridTemplateColumns: hideDateAndTime
            ? '0fr 1.8fr 0.8fr'
            : '1fr 1.8fr 0.8fr',
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
