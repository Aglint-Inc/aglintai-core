import { Popover, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { AgentPopoverBlock } from '@/devlink3/AgentPopoverBlock';
import { ScheduleTypeButton } from '@/devlink3/ScheduleTypeButton';
import toast from '@/src/utils/toast';

import ScheduleIndividualCard from '../FullSchedule/ScheduleIndividual';
import {
  SchedulingApplication,
  setRequestSessionIds,
  setSelectedSessionIds,
  useSchedulingApplicationStore,
} from '../store';
import { setScheduleFlow, setStepScheduling } from './store';

function RescheduleSlot() {
  const { initialSessions, selectedApplication, rescheduleSessionIds } =
    useSchedulingApplicationStore((state) => ({
      initialSessions: state.initialSessions,
      selectedApplication: state.selectedApplication,
      rescheduleSessionIds: state.rescheduleSessionIds,
    }));

  const [selectedLocalSessionIds, setLocalselectedLocalSessionIds] = useState<
    string[]
  >([]);

  useEffect(() => {
    setLocalselectedLocalSessionIds(rescheduleSessionIds);
  }, [rescheduleSessionIds]);

  let selectedSessions: SchedulingApplication['initialSessions'] = [];

  selectedSessions = initialSessions.filter((ses) =>
    rescheduleSessionIds?.includes(ses.id),
  );

  const selectSession = ({
    session,
  }: {
    session: SchedulingApplication['initialSessions'][0];
  }) => {
    if (selectedLocalSessionIds.includes(session.id)) {
      setLocalselectedLocalSessionIds(
        selectedLocalSessionIds.filter((id) => id !== session.id),
      );
    } else {
      setLocalselectedLocalSessionIds([...selectedLocalSessionIds, session.id]);
    }
  };

  //popopver
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedLocalSessionIds.length === 0) {
      toast.warning('Please select a session to schedule.');
      return;
    }
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  //popopver

  return (
    <Stack position={'absolute'} width={'100%'} overflow={'hidden'}>
      <Stack
        position={'relative'}
        height={'calc(100vh - 48px)'}
        zIndex={10}
        width={'100%'}
      >
        <Stack
          spacing={2}
          p={2}
          height={'calc(100vh - 110px)'}
          width={'100%'}
          overflow={'scroll'}
        >
          {selectedSessions.map((ses) => {
            return (
              <ScheduleIndividualCard
                session={ses}
                key={ses.id}
                isCheckboxVisible={true}
                isThreeDotVisible={false}
                onClickCheckBox={selectSession}
                selectedSessionIds={selectedLocalSessionIds}
                isOnclickCard={false}
              />
            );
          })}
        </Stack>
        <Stack
          display={'grid'}
          gridTemplateColumns={'1fr 1fr 1fr'}
          spacing={2}
          direction={'row'}
          p={2}
        >
          <ScheduleTypeButton
            isSelfScheduleIcon={true}
            isAgentIcon={false}
            isDebriefIcon={false}
            isRequestAvailabilityIcon={false}
            onClickButton={{
              onClick: () => {
                if (selectedLocalSessionIds.length === 0) {
                  toast.warning('Please select a session to schedule.');
                  return;
                }
                setSelectedSessionIds(selectedLocalSessionIds);
                setScheduleFlow('self_scheduling');
                setStepScheduling('pick_date');
              },
            }}
            textButton={'Send Self Scheduling Link'}
          />

          <ScheduleTypeButton
            isSelfScheduleIcon={false}
            isAgentIcon={false}
            isDebriefIcon={false}
            isRequestAvailabilityIcon={true}
            onClickButton={{
              onClick: () => {
                if (selectedLocalSessionIds.length === 0) {
                  toast.warning('Please select a session to schedule.');
                  return;
                }
                setScheduleFlow('create_request_availibility');
                setStepScheduling('pick_date');
                setRequestSessionIds(selectedLocalSessionIds);
              },
            }}
            textButton={'Request Availability'}
          />
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
                  setSelectedSessionIds(selectedLocalSessionIds);
                  setScheduleFlow('email_agent');
                  setStepScheduling('pick_date');
                },
              }}
              onClickPhoneAgent={{
                onClick: (e) => {
                  e.stopPropagation();
                  handleClose();
                  setSelectedSessionIds(selectedLocalSessionIds);
                  setScheduleFlow('phone_agent');
                  setStepScheduling('pick_date');
                },
              }}
            />
          </Popover>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default RescheduleSlot;
