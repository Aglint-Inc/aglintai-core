import { useToast } from '@components/hooks/use-toast';

import { IntegrationThanks } from '@devlink2/IntegrationThanks';
import { Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useRef, useState } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { supabase } from '@/utils/supabase/client';

import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';

function RequestNew({ isOpen, close }: { isOpen: boolean; close: () => void }) {
  const { recruiter } = useAuthDetails();
  const { toast } = useToast();
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
            email: 'ravi@aglinthq.com',
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
      toast({
        variant: 'destructive',
        title: 'Please enter the name of the integration!',
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='sm:max-w-[425px]'>
        {showThanks ? (
          <IntegrationThanks
            slotButtonClose={
              <Button
                onClick={() => {
                  close();
                  setTimeout(() => {
                    setShowThanks(false);
                  }, 500);
                }}
                size='sm'
              >
                Close
              </Button>
            }
          />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Request Integration</DialogTitle>
            </DialogHeader>
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
                  Description
                </Typography>
                <TextField
                  multiline
                  minRows={5}
                  placeholder='Add a brief description (Optional)'
                  inputRef={descriptionRef}
                />
              </Stack>
            </Stack>
            <DialogFooter>
              <Button
                variant='outline'
                onClick={() => {
                  close();
                  setShowThanks(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={requestTool}>Request</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default RequestNew;
