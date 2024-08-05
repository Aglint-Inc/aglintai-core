import { Stack } from '@mui/material';
import React, { useState } from 'react';

import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { ConfirmationPopup } from '@/devlink3/ConfirmationPopup';
import MuiPopup from '@/src/components/Common/MuiPopup';

function SessionsCardAndActions({
  requestTitle,
  requestId,
  sessions,
}: {
  requestTitle: string;
  requestId: string;
  sessions: {
    id: string;
    name: string;
  }[];
}) {
  const [openCancelRequest, setOpenCancelRequest] = useState(false);
  return (
    <>
      <MuiPopup
        props={{
          open: openCancelRequest,
          onClose: () => setOpenCancelRequest(false),
        }}
      >
        <>
          <ConfirmationPopup
            onClickCancel={{ onClick: () => setOpenCancelRequest(false) }}
            isIcon={false}
            textPopupTitle={'Cancel Request'}
            textPopupDescription={
              'Are you sure you want to cancel this the request?'
            }
            isWidget={true}
            slotWidget={'Request: ' + requestTitle}
            textPopupButton={'Yes, Cancel'}
            onClickAction={{
              onClick: async () => {
                // eslint-disable-next-line no-console
                console.log(requestId);
                setOpenCancelRequest(false);
              },
            }}
          />
        </>
      </MuiPopup>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <Stack direction={'row'} spacing={1}>
          {sessions.map(({ name, id }, i) => {
            return (
              <ButtonSoft
                key={id ?? i}
                size={1}
                color={`neutral`}
                textButton={name}
                isRightIcon={true}
                iconName={'north_east'}
              />
            );
          })}
        </Stack>
        <ButtonSoft
          onClickButton={{
            onClick: () => setOpenCancelRequest(true),
          }}
          size={1}
          color={`error`}
          textButton={'Cancel Request'}
        />
      </Stack>
    </>
  );
}

export default SessionsCardAndActions;
