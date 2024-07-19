import { Popover } from '@mui/material';
import React from 'react';

import { AgentPopoverBlock } from '@/devlink3/AgentPopoverBlock';
import { ScheduleTypeButton } from '@/devlink3/ScheduleTypeButton';

import {
  setIsScheduleNowOpen,
  setScheduleFlow,
  setStepScheduling,
} from '../SchedulingDrawer/store';
import { setRequestSessionIds, useSchedulingApplicationStore } from '../store';

function TopBarButtons() {
  const { initialSessions, selectedSessionIds, selectedApplication } =
    useSchedulingApplicationStore((state) => ({
      initialSessions: state.initialSessions,
      selectedSessionIds: state.selectedSessionIds,
      selectedApplication: state.selectedApplication,
    }));

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const isDebrief = initialSessions
    .filter((ses) => selectedSessionIds.includes(ses.interview_session.id))
    .some((ses) => ses.interview_session.session_type === 'debrief');

  return (
    <>
      {!isDebrief && (
        <ScheduleTypeButton
          isSelfScheduleIcon={true}
          isAgentIcon={false}
          isDebriefIcon={false}
          isRequestAvailabilityIcon={false}
          onClickButton={{
            onClick: () => {
              setScheduleFlow('self_scheduling');
              setStepScheduling('pick_date');
              setIsScheduleNowOpen(true);
            },
          }}
          textButton={'Send Self-Scheduling Request'}
        />
      )}
      {!isDebrief && (
        <ScheduleTypeButton
          isSelfScheduleIcon={false}
          isAgentIcon={false}
          isDebriefIcon={false}
          isRequestAvailabilityIcon={true}
          onClickButton={{
            onClick: () => {
              setScheduleFlow('create_request_availibility');
              setStepScheduling('pick_date');
              setRequestSessionIds(selectedSessionIds);
              setIsScheduleNowOpen(true);
            },
          }}
          textButton={'Request Availability'}
        />
      )}
      {isDebrief && (
        <ScheduleTypeButton
          isSelfScheduleIcon={false}
          isAgentIcon={false}
          isDebriefIcon={true}
          isRequestAvailabilityIcon={false}
          onClickButton={{
            onClick: () => {
              setScheduleFlow('debrief');
              setIsScheduleNowOpen(true);
            },
          }}
          textButton={'Schedule Debrief'}
        />
      )}
      {!isDebrief && (
        <>
          <ScheduleTypeButton
            isSelfScheduleIcon={false}
            isAgentIcon={true}
            isDebriefIcon={false}
            isRequestAvailabilityIcon={false}
            onClickButton={{
              onClick: handleClick,
            }}
            textButton={'Schedule Via Agent'}
          />
        </>
      )}

      <Popover
        id='popover-agent'
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{ vertical: -6, horizontal: 0 }}
        slotProps={{
          paper: {
            style: {
              border: 'none',
              borderRadius: 'var(--radius-4)',
              boxShadow: 'var(--shadow-3)',
            },
          },
        }}
        onClose={handleClose}
      >
        <AgentPopoverBlock
          isMailAgent={Boolean(selectedApplication.candidates.email)}
          isPhoneAgent={Boolean(selectedApplication.candidates.phone)}
          onClickMailAgent={{
            onClick: (e) => {
              e.stopPropagation();
              handleClose();
              setScheduleFlow('email_agent');
              setIsScheduleNowOpen(true);
            },
          }}
          onClickPhoneAgent={{
            onClick: (e) => {
              e.stopPropagation();
              handleClose();
              setScheduleFlow('phone_agent');
              setIsScheduleNowOpen(true);
            },
          }}
        />
      </Popover>
    </>
  );
}

export default TopBarButtons;
