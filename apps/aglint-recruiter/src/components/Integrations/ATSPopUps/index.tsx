/* eslint-disable no-unused-vars */
import { Dialog, Stack, Typography } from '@mui/material';
import { type ReactNode } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { DcPopup } from '@/devlink/DcPopup';
import { IntegrationLoading } from '@/devlink2/IntegrationLoading';
import { DeletePopup } from '@/devlink3/DeletePopup';
import { LearnHowAshby } from '@/devlink3/LearnHowAshby';
import { LearnHowGreenhouse } from '@/devlink3/LearnHowGreenhouse';
import { LearnHowLever } from '@/devlink3/LearnHowLever';

import Loader from '../../Common/Lotties/Integration_Loader';
import { ShowCode } from '../../Common/ShowCode';
import { type PopUpReasonTypes } from '../types';

function ATSPopUps({
  isOpen,
  close,
  popUpBody,
  action,
  reason,
  isLoading,
  inputValue,
}: {
  isOpen: boolean;
  close: () => void;
  popUpBody: ReactNode;
  action: () => void;
  reason: PopUpReasonTypes;
  isLoading: boolean;
  inputValue: string;
}) {
  return (
    <Dialog open={isOpen} onClose={close} maxWidth={'md'}>
      <ShowCode>
        <ShowCode.When isTrue={isLoading}>
          <IntegrationLoading
            isText={
              reason === 'connect_lever' ||
              reason === 'connect_greenhouse' ||
              reason === 'connect_ashby'
            }
            textLoader={
              <Typography fontSize={'16px'} variant='caption'>
                <ShowCode.When isTrue={reason === 'connect_lever'}>
                  {`Connecting to Lever`}
                </ShowCode.When>
                <ShowCode.When isTrue={reason === 'connect_greenhouse'}>
                  {`Connecting to Greenhouse`}
                </ShowCode.When>
                <ShowCode.When isTrue={reason === 'connect_ashby'}>
                  {`Connecting to Ashby`}
                </ShowCode.When>
                <ShowCode.When isTrue={reason === 'update_lever'}>
                  {`Reconnecting to Lever`}
                </ShowCode.When>
                <ShowCode.When isTrue={reason === 'update_greenhouse'}>
                  {`Reconnecting to Greenhouse`}
                </ShowCode.When>
                <ShowCode.When isTrue={reason === 'update_ashby'}>
                  {`Reconnecting to Ashby`}
                </ShowCode.When>
              </Typography>
            }
            slotLoaderIcon={<Loader />}
          />
        </ShowCode.When>
        <ShowCode.When
          isTrue={
            reason === 'disconnect_greenhouse' ||
            reason === 'disconnect_ashby' ||
            reason === 'disconnect_lever'
          }
        >
          <DeletePopup
            textTitle={
              <>
                <ShowCode.When isTrue={reason === 'disconnect_greenhouse'}>
                  Disconnect Greenhouse
                </ShowCode.When>
                <ShowCode.When isTrue={reason === 'disconnect_lever'}>
                  Disconnect Lever
                </ShowCode.When>
                <ShowCode.When isTrue={reason === 'disconnect_ashby'}>
                  Disconnect Ashby
                </ShowCode.When>
              </>
            }
            textDescription={
              <>
                By clicking {'"Disconnect"'},{' '}
                {reason === 'disconnect_greenhouse'
                  ? 'Greenhouse'
                  : reason === 'disconnect_ashby'
                    ? 'Ashby'
                    : reason === 'disconnect_lever'
                      ? 'Lever'
                      : ''}{' '}
                will be disconnected from Aglint and will no longer be
                accessible in this application. You can reconnect again on the
                Integrations page.
              </>
            }
            onClickCancel={{
              onClick: close,
            }}
            onClickDelete={{
              onClick: action,
            }}
            buttonText={'Disconnect'}
            isIcon={false}
          />
        </ShowCode.When>
        <ShowCode.When
          isTrue={
            reason === 'learn_how_greenhouse' ||
            reason === 'learn_how_ashby' ||
            reason === 'learn_how_lever'
          }
        >
          <ShowCode>
            <ShowCode.When isTrue={reason === 'learn_how_greenhouse'}>
              <LearnHowGreenhouse
                onClickClose={{
                  onClick: close,
                }}
              />
            </ShowCode.When>
            <ShowCode.When isTrue={reason === 'learn_how_ashby'}>
              <LearnHowAshby
                onClickClose={{
                  onClick: close,
                }}
              />
            </ShowCode.When>
            <ShowCode.When isTrue={reason === 'learn_how_lever'}>
              <LearnHowLever
                onClickClose={{
                  onClick: close,
                }}
              />
            </ShowCode.When>
          </ShowCode>
        </ShowCode.When>
        <ShowCode.Else>
          <DcPopup
            popupName={
              reason === 'connect_greenhouse'
                ? 'Connect Greenhouse'
                : reason === 'connect_lever'
                  ? 'Connect Lever'
                  : reason === 'connect_ashby'
                    ? 'Connect Ashby'
                    : reason === 'update_greenhouse'
                      ? 'Greenhouse'
                      : reason === 'update_lever'
                        ? 'Lever'
                        : reason === 'update_ashby' && 'Ashby'
            }
            slotBody={
              <Stack direction={'column'} gap={1}>
                <>
                  <ShowCode.When
                    isTrue={
                      reason === 'connect_greenhouse' ||
                      reason === 'update_greenhouse'
                    }
                  >
                    Greenhouse API key
                  </ShowCode.When>
                  <ShowCode.When
                    isTrue={
                      reason === 'connect_lever' || reason === 'update_lever'
                    }
                  >
                    Lever API key
                  </ShowCode.When>
                  <ShowCode.When
                    isTrue={
                      reason === 'connect_ashby' || reason === 'update_ashby'
                    }
                  >
                    Ashby API key
                  </ShowCode.When>
                </>
                <ShowCode>
                  <ShowCode.Else>
                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                      {popUpBody}
                    </Stack>
                  </ShowCode.Else>
                </ShowCode>
              </Stack>
            }
            onClickClosePopup={{ onClick: close }}
            slotButtons={
              <>
                <ButtonSoft
                  textButton={'Cancel'}
                  color={'neutral'}
                  size={2}
                  onClickButton={{ onClick: close }}
                />
                <ButtonSolid
                  textButton={
                    reason === 'connect_greenhouse' ||
                    reason === 'connect_ashby' ||
                    reason === 'connect_lever'
                      ? 'Connect'
                      : reason === 'update_greenhouse' ||
                          reason === 'update_ashby' ||
                          reason === 'update_lever'
                        ? 'Update'
                        : ''
                  }
                  size={2}
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

export default ATSPopUps;
