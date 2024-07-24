import { Popover } from '@mui/material';
import React from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { RescheduleOptions } from '@/devlink2/RescheduleOptions';
import toast from '@/src/utils/toast';

import {
  setRequestSessionIds,
  setSelectedSessionIds,
  useSchedulingApplicationStore,
} from '../../store';
import { setScheduleFlow, setStepScheduling } from '../store';

function ButtonAllOptions() {
  //popopver
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const { rescheduleSessionIds } = useSchedulingApplicationStore((state) => ({
    rescheduleSessionIds: state.rescheduleSessionIds,
  }));

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  //popopver

  return (
    <>
      <ButtonSolid
        size={2}
        onClickButton={{
          onClick: handleClick,
        }}
        textButton='Schedule'
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
        <RescheduleOptions
          onClickSelfScheduling={{
            onClick: () => {
              if (rescheduleSessionIds.length === 0) {
                toast.warning('Please select a session to schedule.');
                return;
              }
              setSelectedSessionIds(rescheduleSessionIds);
              setScheduleFlow('self_scheduling');
              setStepScheduling('pick_date');
            },
          }}
          onClickRequestAvailability={{
            onClick: () => {
              if (rescheduleSessionIds.length === 0) {
                toast.warning('Please select a session to schedule.');
                return;
              }
              setScheduleFlow('create_request_availibility');
              setStepScheduling('pick_date');
              setSelectedSessionIds(rescheduleSessionIds);
              setRequestSessionIds(rescheduleSessionIds);
            },
          }}
          onClickEmailAgent={{
            onClick: (e) => {
              e.stopPropagation();
              handleClose();
              setSelectedSessionIds(rescheduleSessionIds);
              setScheduleFlow('email_agent');
              setStepScheduling('pick_date');
            },
          }}
          onClickPhoneAgent={{
            onClick: (e) => {
              e.stopPropagation();
              handleClose();
              setSelectedSessionIds(rescheduleSessionIds);
              setScheduleFlow('phone_agent');
              setStepScheduling('pick_date');
            },
          }}
        />
      </Popover>
    </>
  );
}

export default ButtonAllOptions;
