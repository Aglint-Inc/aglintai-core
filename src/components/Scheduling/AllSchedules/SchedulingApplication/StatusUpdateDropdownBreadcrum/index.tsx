import { capitalize, Popover } from '@mui/material';
import React from 'react';

import { CandidateInterviewButton, CandidateInterviewOption } from '@/devlink3';
import SectionIcons from '@/src/components/JobApplicationsDashboard/Common/SectionIcons';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { addScheduleActivity } from '../../queries/utils';
import { useAllActivities, useGetScheduleApplication } from '../hooks';
import { useSchedulingApplicationStore } from '../store';
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
          logger: recruiterUser.user_id,
          type: 'schedule',
          supabase: supabase,
          created_by: recruiterUser.user_id,
        });
        fetchInterviewDataByApplication();
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
          '& .MuiPaper-root': {
            border: 'none !important',
            overflow: 'visible !important',
          },
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
      <CandidateInterviewButton
        slotIcon={<SectionIcons section={selectedApplication.status as any} />}
        textButton={capitalize(selectedApplication.status)}
        onClickButton={{
          onClick: handleClick,
        }}
      />
    </>
  );
}

export default StatusUpdateDropdownBreadcrum;
