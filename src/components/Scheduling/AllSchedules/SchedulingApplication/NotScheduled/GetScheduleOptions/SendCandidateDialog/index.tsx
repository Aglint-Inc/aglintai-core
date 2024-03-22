import { Dialog, Stack, Typography } from '@mui/material';
import { useState } from 'react';

import { ToggleButton } from '@/devlink2';
import { ConfirmationPopup } from '@/devlink3';

import { useSendInviteForCandidate } from '../../../hooks';
import {
  setIsSendToCandidateOpen,
  useSchedulingApplicationStore,
} from '../../../store';

function SendCandidateDialog() {
  const { selectedApplication, isSendToCandidateOpen } =
    useSchedulingApplicationStore((state) => ({
      selectedApplication: state.selectedApplication,
      dateRange: state.dateRange,
      isSendToCandidateOpen: state.isSendToCandidateOpen,
    }));
  const [isGetMoreOptions, setIsGetMoreOptions] = useState(false);

  const { sendToCandidate } = useSendInviteForCandidate();

  const allPlans = selectedApplication?.public_jobs?.interview_plan?.plan;

  const onClickReschedule = async () => {
    sendToCandidate({
      allPlans,
      is_get_more_option: isGetMoreOptions,
    });
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          background: 'transparent',
          border: 'none',
          borderRadius: '10px',
        },
      }}
      open={isSendToCandidateOpen}
      onClose={() => {
        setIsSendToCandidateOpen(false);
      }}
    >
      <ConfirmationPopup
        textPopupTitle={'Send to Candidate'}
        textPopupDescription={
          'Selected options will be sent to candidate via email. Interview will be confirmed once the candidate picks one of the option'
        }
        isIcon={false}
        isWidget={true}
        slotWidget={
          <Stack direction={'row'} spacing={1}>
            <Stack pt={'4px'}>
              <ToggleButton
                isActive={isGetMoreOptions}
                isInactive={!isGetMoreOptions}
                onclickToggle={{
                  onClick: () => {
                    setIsGetMoreOptions(!isGetMoreOptions);
                  },
                }}
              />
            </Stack>

            <Typography variant='caption'>
              {`Include get more options. Based on interviewers availibilities candidate can choose any options other than what you send`}
            </Typography>
          </Stack>
        }
        onClickCancel={{
          onClick: () => {
            setIsSendToCandidateOpen(false);
          },
        }}
        onClickAction={{
          onClick: onClickReschedule,
        }}
        textPopupButton={'Confirm'}
      />
    </Dialog>
  );
}

export default SendCandidateDialog;
