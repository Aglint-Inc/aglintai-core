/* eslint-disable no-unused-vars */
import { Dialog, Typography } from '@mui/material';
import React from 'react';

import { DeletePopup } from '@/devlink3/DeletePopup';
import { ResumePop } from '@/devlink3/ResumePop';
import { ShowCode } from '@/src/components/Common/ShowCode';

function DeleteMemberDialog({
  name,
  openForDelete,
  openForCancel,
  action,
  warning,
  close,
}: {
  name: string;
  openForDelete: boolean;
  openForCancel: boolean;
  action: (x: null) => void;
  warning?: string;
  close: () => void;
}) {
  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          background: 'transparent',
          border: 'none',
          borderRadius: '10px',
        },
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
            textTitle={
              <Typography variant='subtitle1' fontWeight={500}>
                Delete the member:{' '}
                <span style={{ fontWeight: 700 }}>{name}</span>
              </Typography>
            }
            textDescription={
              <>
                <Typography variant='body2'>
                  By clicking delete the member will be permanently deleted.
                </Typography>
                {warning && (
                  <>
                    <br />
                    <Typography variant='subtitle2' color={'yellow.500'}>
                      Warning: {warning}
                    </Typography>
                  </>
                )}
              </>
            }
            isIcon={false}
            isWidget={true}
            onClickCancel={{ onClick: close }}
            onClickDelete={{
              onClick: action,
            }}
            buttonText={'Delete'}
          />
        </ShowCode.When>
        <ShowCode.When isTrue={openForCancel}>
          <DeletePopup
            textTitle={
              <Typography variant='subtitle1' fontWeight={500}>
                Cancel invitation to:{' '}
                <span style={{ fontWeight: 700 }}>{name}</span>
              </Typography>
            }
            textDescription={
              <Typography variant='body2'>
                By clicking cancel invitation will be cancelled and removed from
                the members list.
              </Typography>
            }
            isIcon={false}
            isWidget={true}
            onClickCancel={{ onClick: close }}
            onClickDelete={{
              onClick: action,
            }}
            buttonText={'Cancel Invite'}
          />
        </ShowCode.When>
      </ShowCode>
    </Dialog>
  );
}

export default DeleteMemberDialog;
