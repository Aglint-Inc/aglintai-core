import { Popover } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import { AgentPopoverBlock } from '@/devlink3/AgentPopoverBlock';
import { ScheduleTypeButton } from '@/devlink3/ScheduleTypeButton';

import {
  setIsScheduleNowOpen,
  setScheduleFlow,
  useSchedulingApplicationStore,
} from '../store';

function TopBarButtons() {
  const router = useRouter();
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
    .filter((ses) => selectedSessionIds.includes(ses.id))
    .some((ses) => ses.session_type === 'debrief');

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
              setIsScheduleNowOpen(true);
            },
          }}
          textButton={'Send Self Scheduling Link'}
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
              setScheduleFlow('request_availibility');
              const currentPath = router.pathname; // '/scheduling/application/[application_id]'
              const currentQuery = router.query; // { application_id: '84caebfb-8db6-4881-a88f-400726884504' }
              const updatedQuery = {
                ...currentQuery,
                candidate_request_availability: 'true',
              };
              router.replace({
                pathname: currentPath,
                query: updatedQuery,
              });
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
              borderRadius: '10px',
              boxShadow: '0px 4px 8px 0px rgba(4, 68, 77, 0.15)',
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
