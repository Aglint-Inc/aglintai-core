import { Drawer, Stack } from '@mui/material';
import React from 'react';

import EmailOutReach from '../../Database/EmailOutReach/EmailOutReach';
import { OutReachCtxProvider } from '../../Database/EmailOutReach/OutReachCtx';

function EmailOutReachComp({
  emailOutReach,
  selectedCandidate,
  setSelectedCandidate,
  setEmailOutReach,
}) {
  return (
    <Drawer
      anchor={'right'}
      open={emailOutReach && selectedCandidate?.id}
      onClose={() => {
        setEmailOutReach(false);
        setSelectedCandidate(null);
      }}
    >
      <Stack width={'745px'}>
        <OutReachCtxProvider
          selcandidate={
            !emailOutReach
              ? null
              : {
                  candidateId: selectedCandidate.id,
                  candOverview: selectedCandidate.title,
                  email: selectedCandidate.email,
                  firstName: selectedCandidate.first_name,
                  lastName: selectedCandidate.last_name,
                }
          }
        >
          <EmailOutReach
            onClose={() => {
              setEmailOutReach(false);
            }}
          />
        </OutReachCtxProvider>
      </Stack>
    </Drawer>
  );
}

export default EmailOutReachComp;
