import { ConfirmationPopup, DeletePopup } from '@/devlink3';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { capitalizeAll } from '@/src/utils/text/textUtils';
import { Dialog, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { ToolPopUpReason } from '../utils';
import { useTaskStatesContext } from '../../../TaskStatesContext';

function PopUps({
  isOpen,
  reason,
  close,
  action,
  popUpBody,
}: {
  isOpen: boolean;
  reason: ToolPopUpReason;
  close: () => void;
  action: () => void;
  popUpBody: ReactNode;
}) {
  const { selectedTasksIds } = useTaskStatesContext();
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
                    <Typography fontSize={'14px'} variant='caption'>
                      {`${selectedTasksIds.length} tasks selected`}
                    </Typography>
                    <Typography variant='body2'>
                      {'By clicking close Button will close the task progress '}
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
            textPopupTitle={capitalizeAll(String(reason).replace('_', ' '))}
            onClickCancel={{ onClick: close }}
            onClickAction={{ onClick: action }}
            textPopupButton={capitalizeAll(String(reason).split('_')[0])}
            textPopupDescription={
              <ShowCode>
                <ShowCode.When isTrue={reason === 'update_tasks'}>
                  {`${selectedTasksIds.length} tasks selected`}
                </ShowCode.When>
                <ShowCode.When isTrue={reason === 'update_priority'}>
                  {`${selectedTasksIds.length} tasks selected`}
                </ShowCode.When>
                <ShowCode.When isTrue={reason === 'change_assignee'}>
                  {`${selectedTasksIds.length} tasks selected`}
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
