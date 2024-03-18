/* eslint-disable no-unused-vars */
import { Dialog } from '@mui/material';
import React from 'react';

import { DeletePopup, ResumePop } from '@/devlink3';
import { ShowCode } from '@/src/components/Common/ShowCode';

function DeleteMemberDialog({
  openForDelete,
  openForCancel,
  action,
  close
}: {
  openForDelete: boolean;
  openForCancel: boolean;
  action: (x: null) => void;
  close: () => void;
}) {
  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          background: 'transparent',
          border: 'none',
          borderRadius: '10px'
        }
      }}
      open={openForDelete || openForCancel}
      onClose={() => {
        // resetState();
        close();
      }}
    >
      <ShowCode>
        <ShowCode.When isTrue={openForDelete}>
          <DeletePopup
            textTitle={`Delete the member`}
            textDescription={`By Clicking delete the member will be permanently deleted from the member list.`}
            isIcon={false}
            isWidget={true}
            onClickCancel={{ onClick: close }}
            onClickDelete={{
              onClick: action
            }}
            buttonText={'Delete'}
          />
        </ShowCode.When>
        <ShowCode.When isTrue={openForCancel}>
          <DeletePopup
            textTitle={`Cancel invitation`}
            textDescription={`By Clicking cancel invitation will be cancelled and deleted from the member list.`}
            isIcon={false}
            isWidget={true}
            onClickCancel={{ onClick: close }}
            onClickDelete={{
              onClick: action
            }}
            buttonText={'Delete'}
          />
        </ShowCode.When>
      </ShowCode>
    </Dialog>
  );
}

export default DeleteMemberDialog;
