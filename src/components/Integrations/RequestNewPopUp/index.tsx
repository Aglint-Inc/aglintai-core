import { Dialog, Stack, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';

import { IntegrationThanks } from '@/devlink2';
import { ButtonPrimaryDefaultRegular, ConfirmationPopup } from '@/devlink3';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';

import { ShowCode } from '../../Common/ShowCode';

function RequestNew({ isOpen, close }: { isOpen: boolean; close: () => void }) {
  const { recruiter } = useAuthDetails();
  const descriptionRef = useRef<HTMLInputElement>();
  const nameRef = useRef<HTMLInputElement>();
  const [showThanks, setShowThanks] = useState(false);
  async function requestTool() {
    const recruiter_id = recruiter.id;
    const tool_name = nameRef.current.value;
    const description = descriptionRef.current.value;
    supabase
      .from('request_integration_tool')
      .insert({ recruiter_id, tool_name, description })
      .select()
      .then(() => {});
    setShowThanks(true);
  }

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
      <ShowCode.When isTrue={showThanks}>
        <IntegrationThanks
          slotButtonClose={
            <ButtonPrimaryDefaultRegular
              buttonText={'Close'}
              buttonProps={{
                onClick: () => {
                  close();
                  setShowThanks(false);
                },
              }}
            />
          }
        />
      </ShowCode.When>
      <ShowCode.When isTrue={!showThanks}>
        <ConfirmationPopup
          isIcon={false}
          textPopupTitle={'Request Integration'}
          textPopupDescription={
            <Stack direction={'column'} spacing={'16px'}>
              <Stack direction={'column'} spacing={'10px'}>
                <Typography fontSize={'14px'} variant='body1'>
                  Integration Name
                </Typography>
                <TextField inputRef={nameRef} placeholder='Enter tool a name' />
              </Stack>
              <Stack direction={'column'} spacing={'10px'}>
                <Typography fontSize={'14px'} variant='body1'>
                  Description (If any)
                </Typography>
                <TextField
                  multiline
                  minRows={5}
                  placeholder='Enter description (if any)'
                  inputRef={descriptionRef}
                />
              </Stack>
            </Stack>
          }
          onClickCancel={{
            onClick: () => {
              close();
              setShowThanks(false);
            },
          }}
          onClickAction={{
            onClick: requestTool,
          }}
          isGreyButtonVisible={false}
          textPopupButton={'Send'}
        />
      </ShowCode.When>
    </Dialog>
  );
}

export default RequestNew;
