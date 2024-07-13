import { Dialog, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useRef, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { IntegrationThanks } from '@/devlink2/IntegrationThanks';
import { ConfirmationPopup } from '@/devlink3/ConfirmationPopup';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

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
    if (tool_name) {
      supabase
        .from('request_integration_tool')
        .insert({ recruiter_id, tool_name, description })
        .select()
        .then(async () => {
          await axios.post('/api/sendgrid', {
            fromEmail: recruiter.email,
            fromName: recruiter?.name,
            email: ['raj@aglinthq.com', 'ravi@aglinthq.com'],
            subject: 'Integration Tool Request',
            text: `
                  <body>
                  <h1>Integration Tool Request</h1>
                  <p>We urgently need <b>${tool_name}</b> integration tool for improved team communication and collaboration. Can we discuss this further in a meeting?</p>
                  <p>Description : ${description}</p>
                  <p>Best regards,<br>
                  ${recruiter?.name}</p>
                  </body>
              `,
          });
        });
      setShowThanks(true);
    } else {
      toast.error('Please enter the name of the integration!');
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      maxWidth={'md'}
    >
      <ShowCode.When isTrue={showThanks}>
        <IntegrationThanks
          slotButtonClose={
            <ButtonSoft
              onClickButton={{
                onClick: () => {
                  close();
                  setTimeout(() => {
                    setShowThanks(false);
                  }, 500);
                },
              }}
              size={2}
              textButton={'Close'}
            />
            // <ButtonPrimaryDefaultRegular
            //   buttonText={'Close'}
            //   buttonProps={{
            //     onClick: () => {
            //       close();
            //       setTimeout(() => {
            //         setShowThanks(false);
            //       }, 500);
            //     },
            //   }}
            // />
          }
        />
      </ShowCode.When>
      <ShowCode.When isTrue={!showThanks}>
        <ConfirmationPopup
          isIcon={false}
          
          textPopupTitle={'Request Integration'}
          textPopupDescription={
            <Stack direction={'column'} spacing={'16px'}>
              <Stack direction={'column'} spacing={'var(--space-2)'}>
                <Typography fontSize={'14px'} variant='body1'>
                  Integration Name
                </Typography>
                <TextField
                  inputRef={nameRef}
                  placeholder='Enter the name of the integration'
                />
              </Stack>
              <Stack direction={'column'} spacing={'var(--space-2)'}>
                <Typography fontSize={'14px'} variant='body1'>
                  Description (Optional)
                </Typography>
                <TextField
                  multiline
                  minRows={5}
                  placeholder='Add a brief description (optional)'
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
          isGreyButtonVisible={true}
          textPopupButton={'Request'}
        />
      </ShowCode.When>
    </Dialog>
  );
}

export default RequestNew;
