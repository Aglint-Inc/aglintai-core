import { capitalize, Popover } from '@mui/material';
import React from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { CandidateInterviewOption } from '@/devlink3/CandidateInterviewOption';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { addScheduleActivity } from '../../Candidates/queries/utils';
import { useAllActivities, useGetScheduleApplication } from '../hooks';
import { setSelectedSessionIds, useSchedulingApplicationStore } from '../store';
import { updateApplicationStatus } from '../utils';

function StatusUpdateDropdownBreadcrum() {
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
  const id = open ? 'simple-popover' : undefined;

  const { recruiterUser } = useAuthDetails();
  const { selectedApplication } = useSchedulingApplicationStore((state) => ({
    selectedApplication: state.selectedApplication,
  }));

  const { fetchInterviewDataByApplication } = useGetScheduleApplication();

  const { refetch } = useAllActivities({
    application_id: selectedApplication?.id,
  });

  const onClickUpdateStatus = async ({
    status,
  }: {
    status: 'qualified' | 'disqualified';
  }) => {
    try {
      const res = await updateApplicationStatus({
        application_id: selectedApplication.id,
        status: status,
      });
      if (res) {
        await addScheduleActivity({
          title: `Moved to ${status}`,
          application_id: selectedApplication.id,
          logged_by: 'user',
          supabase: supabase,
          created_by: recruiterUser.user_id,
        });
        fetchInterviewDataByApplication();
        setSelectedSessionIds([]);
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Error updating status.');
    } finally {
      refetch();
      handleClose();
    }
  };

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{
          mt: 1,
        }}
      >
        <CandidateInterviewOption
          isQualifiedVisible={selectedApplication?.status !== 'qualified'}
          isDisqualifiedVisible={selectedApplication?.status !== 'disqualified'}
          onClickDisqualified={{
            onClick: () => {
              onClickUpdateStatus({
                status: 'disqualified',
              });
            },
          }}
          onClickQualified={{
            onClick: () => {
              onClickUpdateStatus({
                status: 'qualified',
              });
            },
          }}
          textCurrentStats={`Candidate currently in ${capitalize(selectedApplication?.status || '')} stage`}
        />
      </Popover>
      <ButtonSoft
        textButton={capitalize(selectedApplication.status || '')}
        color={'accent'}
        size={'1'}
        onClickButton={{
          onClick: handleClick,
        }}
      />
    </>
  );
}

export default StatusUpdateDropdownBreadcrum;
