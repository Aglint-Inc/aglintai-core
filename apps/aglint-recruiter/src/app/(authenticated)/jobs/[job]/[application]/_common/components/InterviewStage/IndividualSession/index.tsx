'use strict';

import { Checkbox } from '@components/ui/checkbox';
import dayjs from 'dayjs';
import { useState } from 'react';
import { MeetingStatusBadge } from 'src/app/_common/components/MeetingStatusBadge';

import IconScheduleType from '@/components/Common/Icons/IconScheduleType';
import IconSessionType from '@/components/Common/Icons/IconSessionType';
import InterviewerAcceptDeclineIcon from '@/components/Common/Icons/InterviewerAcceptDeclineIcon';
import { formatTimeWithTimeZone } from '@/components/Scheduling/utils';
import { useAllIntegrations } from '@/queries/intergrations';
import { getBreakLabel } from '@/utils/getBreakLabel';
import { getScheduleType } from '@/utils/scheduling/colors_and_enums';

import { type StageWithSessions } from '../../../hooks/useInterviewStages';
import { GlobalScheduleCard } from '../../ui/GlobalScheduleCard';
import RequestStatusUnconfirmed from '../RequestStatusUnconfirmed';
import BadgesRight from './BadgesRight';
import ButtonGroupRight from './ButtonGroupRight';
import CollapseContent from './Collapse';

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
            user.user_details?.email?.split('@')[1]) ||
        !!(user.user_details.schedule_auth as any)?.access_token
      ),
  );

  return (
    <GlobalScheduleCard
      isCandidateVisible={false}
      slotStatus={
        interview_meeting?.status === 'confirmed' && (
          <div className='flex flex-row items-center space-x-1'>
            {users
              .filter((user) => user.interview_session_relation.is_confirmed)
              .map((user, i) => (
                <InterviewerAcceptDeclineIcon
                  key={i}
                  type={user.interview_session_relation.accepted_status}
                />
              ))}
          </div>
        )
      }
      isCheckboxVisible={isCheckboxVisible}
      slotCheckbox={
        isCheckboxVisible && (
          <Checkbox
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
      iconPanel={
        <IconSessionType type={interview_session.session_type} size={16} />
      }
      iconMeetingPlatform={
        <IconScheduleType type={interview_session.schedule_type} />
      }
      isRoleVisible={false}
      slotGlobalBadge={
        isStatusVisible && (
          <MeetingStatusBadge
            status={interview_session.interview_meeting.status}
          />
        )
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
      textPlatformName={getScheduleType(interview_session.schedule_type)}
      textRole={candidate?.current_job_title || '--'}
      textPanelName={interview_session.name}
      onClickDropdown={(e) => {
        e.stopPropagation();
        setCollapsed(!collapsed);
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
      slotRequestStatus={
        <RequestStatusUnconfirmed interview_meeting={interview_meeting} />
      }
      slotRequestDetail={<BadgesRight session={session} />}
    />
  );
}

export default ScheduleIndividualCard;
