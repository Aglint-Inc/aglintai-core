import { EmailAgentId, PhoneAgentId } from '@aglint/shared-utils';
import { Dialog, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

import { ConfirmationPopup } from '@/devlink3/ConfirmationPopup';
import { DeletePopup } from '@/devlink3/DeletePopup';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import { useTaskStatesContext } from '../../../TaskStatesContext';
import { ToolPopUpReason } from '../utils';

function PopUps({
  isOpen,
  reason,
  close,
  action,
  popUpBody,
  assigneeId,
}: {
  isOpen: boolean;
  reason: ToolPopUpReason;
  close: () => void;
  action: () => void;
  popUpBody: ReactNode;
  assigneeId?: string;
}) {
  const { selectedTasksIds, isImmediate } = useTaskStatesContext();
  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          background: 'transparent',
          border: 'none',
          borderRadius: '10px',
        },
      }}
      open={isOpen}
      onClose={close}
      maxWidth={'md'}
    >
      <ShowCode>
        <ShowCode.When isTrue={reason === 'close_tasks'}>
          <DeletePopup
            isIcon={false}
            isWidget={true}
            buttonText={'Close'}
            textTitle={capitalizeAll(String(reason).replace('_', ' '))}
            textDescription={
              <ShowCode>
                <ShowCode.When isTrue={reason === 'close_tasks'}>
                  <Stack direction={'column'} spacing={'5px'}>
                    <Typography variant='body2'>
                      {`You've selected ${selectedTasksIds.length} tasks.`}
                    </Typography>
                    <Typography fontSize={'14px'} variant='caption'>
                      {
                        'Closing these will end all current activity, including actions by agents.'
                      }
                    </Typography>
                  </Stack>
                </ShowCode.When>
              </ShowCode>
            }
            onClickCancel={{ onClick: close }}
            onClickDelete={{ onClick: action }}
          />
        </ShowCode.When>
        <ShowCode.When isTrue={reason !== 'close_tasks'}>
          <ConfirmationPopup
            isIcon={false}
            textPopupTitle={
              <ShowCode>
                <ShowCode.When isTrue={reason === 'change_status'}>
                  Change task status
                </ShowCode.When>
                <ShowCode.When isTrue={reason === 'change_assignee'}>
                  Reassign Tasks
                </ShowCode.When>
                <ShowCode.When isTrue={reason === 'update_priority'}>
                  Set new priority
                </ShowCode.When>
              </ShowCode>
            }
            onClickCancel={{ onClick: close }}
            onClickAction={{ onClick: action }}
            textPopupButton={
              <ShowCode>
                <ShowCode.When isTrue={reason === 'close_tasks'}>
                  Close
                </ShowCode.When>
                <ShowCode.When isTrue={reason === 'change_status'}>
                  Change
                </ShowCode.When>
                <ShowCode.When isTrue={reason === 'change_assignee'}>
                  <ShowCode>
                    <ShowCode.When isTrue={assigneeId === EmailAgentId}>
                      Assign & Email {isImmediate ? 'Now' : ''}
                    </ShowCode.When>
                    <ShowCode.When isTrue={assigneeId === PhoneAgentId}>
                      Assign & Call {isImmediate ? 'Now' : ''}
                    </ShowCode.When>
                    <ShowCode.Else>Assign</ShowCode.Else>
                  </ShowCode>
                </ShowCode.When>
                <ShowCode.When isTrue={reason === 'update_priority'}>
                  Set
                </ShowCode.When>
              </ShowCode>
            }
            textPopupDescription={
              <ShowCode>
                <ShowCode.When isTrue={reason === 'change_status'}>
                  <Stack direction={'column'} spacing={'5px'}>
                    <Typography variant='body2'>
                      {`You've selected ${selectedTasksIds.length} tasks.`}
                    </Typography>
                    <Typography fontSize={'14px'} variant='caption'>
                      Choose a new status from the dropdown menu to update them.
                    </Typography>
                  </Stack>
                </ShowCode.When>
                <ShowCode.When isTrue={reason === 'change_assignee'}>
                  <Stack direction={'column'} spacing={'5px'}>
                    <Typography variant='body2'>
                      {`You are reassigning ${selectedTasksIds.length} selected tasks. `}
                    </Typography>
                    <Typography fontSize={'14px'} variant='caption'>
                      Please choose an agent or a team member from the from the
                      dropdown menu to proceed with reassignment.
                    </Typography>
                  </Stack>
                </ShowCode.When>
                <ShowCode.When isTrue={reason === 'update_priority'}>
                  <Stack direction={'column'} spacing={'5px'}>
                    <Typography variant='body2'>
                      {`You've selected ${selectedTasksIds.length} tasks.`}
                    </Typography>
                    <Typography fontSize={'14px'} variant='caption'>
                      Choose a new priority level from the the from the dropdown
                      menu to proceed.
                    </Typography>
                  </Stack>
                </ShowCode.When>
              </ShowCode>
            }
            isWidget={true}
            slotWidget={popUpBody}
          />
        </ShowCode.When>
      </ShowCode>
    </Dialog>
  );
}

export default PopUps;
