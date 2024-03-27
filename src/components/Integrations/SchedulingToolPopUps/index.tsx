/* eslint-disable no-unused-vars */
import { Dialog } from '@mui/material';
import { ReactNode } from 'react';

import { ConfirmationPopup, DeletePopup } from '@/devlink3';

import { ShowCode } from '../../Common/ShowCode';
import Loader from '../Loader';
import { SchedulingReasonTypes } from '../types';

function SchedulingPopUps({
  isOpen,
  close,
  popUpBody,
  action,
  reason,
  isLoading,
}: {
  isOpen: boolean;
  close: () => void;
  popUpBody: ReactNode;
  action: () => void;
  reason: SchedulingReasonTypes;
  isLoading: boolean;
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
      open={isOpen}
      onClose={close}
      maxWidth={'md'}
    >
      <ShowCode>
        <ShowCode.When isTrue={isLoading}>
          <Loader />
        </ShowCode.When>
        <ShowCode.When isTrue={reason === 'disconnect_google_workSpace'}>
          <DeletePopup
            textTitle={
              <ShowCode>
                <ShowCode.When
                  isTrue={reason === 'disconnect_google_workSpace'}
                >
                  Disconnect Google workspace
                </ShowCode.When>
              </ShowCode>
            }
            textDescription={
              <ShowCode>
                <ShowCode.When
                  isTrue={reason === 'disconnect_google_workSpace'}
                >
                  By clicking {'"Disconnect"'}, Google workspace will be
                  disconnected from Aglint and will no longer be accessible in
                  this application. You can reconnect again on the Integrations
                  page.
                </ShowCode.When>
              </ShowCode>
            }
            onClickCancel={{
              onClick: close,
            }}
            buttonText={'Disconnect'}
            onClickDelete={{
              onClick: action,
            }}
            isIcon={false}
          />
        </ShowCode.When>
        <ShowCode.Else>
          <ConfirmationPopup
            isIcon={false}
            textPopupTitle={
              <ShowCode>
                <ShowCode.When isTrue={reason === 'connect_google_workSpace'}>
                  Connect Google Workspace
                </ShowCode.When>
                <ShowCode.When
                  isTrue={reason === 'disconnect_google_workSpace'}
                >
                  Disconnect Google Workspace
                </ShowCode.When>
                <ShowCode.When isTrue={reason === 'update_google_workspace'}>
                  Google Workspace
                </ShowCode.When>
              </ShowCode>
            }
            textPopupDescription={<>{popUpBody}</>}
            isGreyButtonVisible={reason !== 'connect_google_workSpace'}
            textPopupButton={
              <>
                <ShowCode>
                  <ShowCode.When isTrue={reason === 'connect_google_workSpace'}>
                    Connect
                  </ShowCode.When>
                  <ShowCode.When isTrue={reason === 'update_google_workspace'}>
                    Update changes
                  </ShowCode.When>
                </ShowCode>
              </>
            }
            onClickCancel={{ onClick: close }}
            onClickAction={{ onClick: action }}
          />
        </ShowCode.Else>
      </ShowCode>
    </Dialog>
  );
}

export default SchedulingPopUps;
