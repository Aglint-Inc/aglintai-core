import { Checkbox } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';

import { StatusBadge } from '@/devlink2/StatusBadge';
import { GlobalScheduleCard } from '@/devlink3/GlobalScheduleCard';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import IconScheduleType from '../../../Candidates/ListCard/Icon/IconScheduleType';
import { getScheduleType } from '../../../Candidates/utils';
import { formatTimeWithTimeZone } from '../../../utils';
import IconSessionType from '../../RightPanel/IconSessionType';
import BadgesRight from './BadgesRight';
import ButtonGroupRight from './ButtonGroupRight';
import CollapseContent from './CollapseContent';
import RequestStatusUnconfirmed from './RequestStatusUnconfirmed';
import { ScheduleIndividualCardType } from './types';

function ScheduleIndividualCard({
  interview_session,
  candidate,
  jobTitle = null,
  selectedSessionIds = [],
  isCheckboxVisible = false,
  onClickCheckBox = () => {},
  users = [],
  interview_meeting = null,
  isCollapseNeeded = false,
  isEditIconVisible = false,
  isViewDetailVisible = false,
  cancelReasons = [],
  gridStyle = '1fr 1.8fr 0.8fr',
  isCollapseButtonsVisible = false,
  currentSession, // this is there only in candidate schedule page
}: ScheduleIndividualCardType) {
  const { recruiter } = useAuthDetails();
  const [collapsed, setCollapsed] = useState(false);

  const usersWithErrors = users.filter(
    (user) =>
      !!user?.interview_module_relation?.pause_json ||
      !(
        (!!recruiter.service_json &&
          recruiter.email.split('@')[1] ===
            user.user_details.email.split('@')[1]) ||
        !!(user.user_details.schedule_auth as any)?.access_token
      ),
  );

  return (
    <GlobalScheduleCard
      isCheckboxVisible={
        isCheckboxVisible &&
        (!interview_meeting ||
          interview_meeting.status === 'not_scheduled' ||
          interview_meeting.status === 'cancelled' ||
          interview_meeting.status === 'reschedule')
      }
      slotCheckbox={
        <Checkbox
          size='small'
          disabled={
            usersWithErrors.length === users.length ||
            (currentSession?.interview_module
              ? currentSession.interview_module.is_archived
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
      isDropdownIconVisible={isCollapseNeeded}
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
      isRoleVisible={!!jobTitle}
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
              timeZone: candidate.timezone,
            })
          : '--'
      }
      textCandidateName={candidate.fullname}
      textDuration={getBreakLabel(interview_session.session_duration)}
      textPlaformName={getScheduleType(interview_session.schedule_type)}
      textRole={jobTitle}
      textPanelName={interview_session.name}
      onClickDropdown={{
        onClick: (e) => {
          e.stopPropagation();
          setCollapsed(!collapsed);
        },
      }}
      slotDropdownContent={
        isCollapseNeeded && (
          <CollapseContent
            candidate={candidate}
            collapsed={collapsed}
            allUsers={users || []}
            currentSession={currentSession}
            jobTitle={jobTitle}
            isCollapseButtonsVisible={isCollapseButtonsVisible}
          />
        )
      }
      slotButtonViewDetail={
        <ButtonGroupRight
          isViewDetailVisible={isViewDetailVisible}
          isEditIconVisible={isEditIconVisible}
          currentSession={currentSession}
          interview_meeting={interview_meeting}
        />
      }
      styleGrid={{
        style: {
          gridTemplateColumns: gridStyle,
        },
      }}
      slotRequestStatus={
        <RequestStatusUnconfirmed interview_meeting={interview_meeting} />
      }
      slotRequestDetail={
        currentSession ? (
          <BadgesRight
            cancelReasons={cancelReasons}
            users={users}
            interview_meeting={interview_meeting}
            interview_module={currentSession.interview_module}
          />
        ) : (
          ''
        )
      }
    />
  );
}

export default ScheduleIndividualCard;
