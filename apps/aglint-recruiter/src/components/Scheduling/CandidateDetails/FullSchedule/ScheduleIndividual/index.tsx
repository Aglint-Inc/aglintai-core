import { Checkbox } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';

import { StatusBadge } from '@/devlink2/StatusBadge';
import { GlobalScheduleCard } from '@/devlink3/GlobalScheduleCard';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';

import IconScheduleType from '../../../Candidates/ListCard/Icon/IconScheduleType';
import { getScheduleType } from '../../../Candidates/utils';
import { formatTimeWithTimeZone } from '../../../utils';
import IconSessionType from '../../RightPanel/IconSessionType';
import { useSchedulingApplicationStore } from '../../store';
import ButtonGroupRight from './ButtonGroupRight';
import CancelRescheduleBadges from './CancelRescheduleBadges';
import CollapseContent from './CollapseContent';
import RequestStatusUnconfirmed from './RequestStatusUnconfirmed';
import { ScheduleIndividualCardType } from './types';

function ScheduleIndividualCard({
  isCheckboxVisible = false,
  interview_session,
  onClickCheckBox,
  selectedSessionIds,
  candidate,
  jobTitle,
  users = [],
  interview_meeting = null,
  isCollapseNeeded = false,
  isEditIconVisible = false,
  isViewDetailVisible = false,
  cancelReasons = [],
  gridStyle = '1.1fr 1.7fr 0.6fr',
}: ScheduleIndividualCardType) {
  const [collapsed, setCollapsed] = useState(false);
  const { initialSessions } = useSchedulingApplicationStore((state) => ({
    initialSessions: state.initialSessions,
  }));
  const currentSession = initialSessions.find(
    (session) => session.interview_session.id === interview_session.id,
  );
  const confirmedUsers =
    users?.filter((user) => user.interview_session_relation.is_confirmed) || [];

  return (
    <GlobalScheduleCard
      isCheckboxVisible={
        (!interview_meeting ||
          interview_meeting.status === 'not_scheduled' ||
          interview_meeting.status === 'cancelled' ||
          interview_meeting.status === 'reschedule') &&
        isCheckboxVisible
      }
      slotCheckbox={
        <Checkbox
          size='small'
          checked={selectedSessionIds.includes(interview_session.id)}
          onClick={(e) => {
            e.stopPropagation();
            onClickCheckBox({ session_id: interview_session.id });
          }}
        />
      }
      isSelectedVisible={selectedSessionIds.includes(interview_session.id)}
      isDropdownIconVisible={
        isCollapseNeeded &&
        (interview_meeting?.status === 'confirmed' ||
          interview_meeting?.status === 'completed' ||
          interview_meeting?.status === 'waiting')
      }
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
            confirmedUsers={confirmedUsers}
            currentSession={currentSession}
            interview_meeting={interview_meeting}
            jobTitle={jobTitle}
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
        <CancelRescheduleBadges cancelReasons={cancelReasons} />
      }
    />
  );
}

export default ScheduleIndividualCard;
