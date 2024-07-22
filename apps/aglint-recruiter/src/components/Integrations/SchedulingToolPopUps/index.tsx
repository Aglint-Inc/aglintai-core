/* eslint-disable no-unused-vars */
import { Dialog } from '@mui/material';
import { ReactNode } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { DcPopup } from '@/devlink/DcPopup';
import { DeletePopup } from '@/devlink3/DeletePopup';

import Loader from '../../Common/Lotties/Integration_Loader';
import { ShowCode } from '../../Common/ShowCode';
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
    <Dialog open={isOpen} onClose={close} maxWidth={'md'}>
      <ShowCode>
        <ShowCode.When isTrue={isLoading}>
          <Loader />
        </ShowCode.When>
        <ShowCode.When
          isTrue={
            reason === 'disconnect_google_workSpace' ||
            reason === 'disconnect_zoom'
          }
        >
          <DeletePopup
            textTitle={
              <ShowCode>
                <ShowCode.When
                  isTrue={reason === 'disconnect_google_workSpace'}
                >
                  Disconnect Google workspace
                </ShowCode.When>
                <ShowCode.When isTrue={reason === 'disconnect_zoom'}>
                  Disconnect Zoom
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
                <ShowCode.When isTrue={reason === 'disconnect_zoom'}>
                  By clicking {'"Disconnect"'}, Zoom will be disconnected from
                  Aglint and will no longer be accessible in this application.
                  You can reconnect again on the Integrations page.
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
          <DcPopup
            popupName={
              reason === 'connect_google_workSpace'
                ? 'Connect Google Workspace'
                : reason === 'connect_zoom'
                  ? 'Connect Zoom'
                  : reason === 'disconnect_google_workSpace'
                    ? 'Disconnect Google Workspace'
                    : reason === 'disconnect_zoom'
                      ? 'Disconnect Zoom'
                      : reason === 'update_google_workspace'
                        ? 'Google Workspace'
                        : reason === 'update_zoom'
                          ? 'Zoom'
                          : ''
            }
            slotBody={popUpBody}
            onClickClosePopup={{ onClick: close }}
            slotButtons={
              <>
                <ButtonSoft
                  textButton='Cancel'
                  size={2}
                  color={'neutral'}
                  onClickButton={{
                    onClick: close,
                  }}
                />
                <ButtonSolid
                  size={2}
                  textButton={
                    reason === 'connect_google_workSpace' ||
                    reason === 'connect_zoom'
                      ? 'Connect'
                      : (reason === 'update_google_workspace' ||
                          reason === 'update_zoom') &&
                        'Update'
                  }
                  onClickButton={{ onClick: action }}
                />
              </>
            }
          />
        </ShowCode.Else>
      </ShowCode>
    </Dialog>
  );
}

export default SchedulingPopUps;
