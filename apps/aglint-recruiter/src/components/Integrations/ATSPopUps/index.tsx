/* eslint-disable no-unused-vars */
import { Dialog, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

import { IntegrationLoading } from '@/devlink2/IntegrationLoading';
import { ConfirmationPopup } from '@/devlink3/ConfirmationPopup';
import { DeletePopup } from '@/devlink3/DeletePopup';
import { LearnHowAshby } from '@/devlink3/LearnHowAshby';
import { LearnHowGreenhouse } from '@/devlink3/LearnHowGreenhouse';
import { LearnHowLever } from '@/devlink3/LearnHowLever';
import toast from '@/src/utils/toast';

import Icon from '../../Common/Icons/Icon';
import Loader from '../../Common/Lotties/Integration_Loader';
import { ShowCode } from '../../Common/ShowCode';
import { PopUpReasonTypes } from '../types';

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
    <Dialog
      open={isOpen}
      onClose={close}
      maxWidth={'md'}
    >
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
          <ConfirmationPopup
            isIcon={false}
            textPopupTitle={
              <ShowCode>
                <ShowCode.When isTrue={reason === 'connect_greenhouse'}>
                  Connect Greenhouse
                </ShowCode.When>
                <ShowCode.When isTrue={reason === 'connect_lever'}>
                  Connect Lever
                </ShowCode.When>
                <ShowCode.When isTrue={reason === 'connect_ashby'}>
                  Connect Ashby
                </ShowCode.When>
                <ShowCode.When isTrue={reason === 'update_greenhouse'}>
                  Greenhouse
                </ShowCode.When>
                <ShowCode.When isTrue={reason === 'update_lever'}>
                  Lever
                </ShowCode.When>
                <ShowCode.When isTrue={reason === 'update_ashby'}>
                  Ashby
                </ShowCode.When>
              </ShowCode>
            }
            textPopupDescription={
              <Stack direction={'column'} gap={1}>
                <>
                  <ShowCode.When isTrue={reason === 'connect_greenhouse'}>
                    Greenhouse API key
                  </ShowCode.When>
                  <ShowCode.When isTrue={reason === 'connect_lever'}>
                    Lever API key
                  </ShowCode.When>
                  <ShowCode.When isTrue={reason === 'connect_ashby'}>
                    Ashby API key
                  </ShowCode.When>
                </>
                <ShowCode>
                  <ShowCode.Else>
                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                      {popUpBody}
                      <ShowCode.When
                        isTrue={
                          reason === 'update_ashby' ||
                          reason == 'update_greenhouse' ||
                          reason === 'update_lever'
                        }
                      >
                        <Stack
                          onClick={() => {
                            navigator.clipboard
                              .writeText(inputValue)
                              .then(() => {
                                toast.message('Copied to clipboard.');
                              });
                          }}
                        >
                          <Icon
                            width='16px'
                            height='16px'
                            variant='CopyTextIcon'
                          />
                        </Stack>
                      </ShowCode.When>
                    </Stack>
                  </ShowCode.Else>
                </ShowCode>
              </Stack>
            }
            isGreyButtonVisible = {true}
            // isGreyButtonVisible={
            //   reason !== 'connect_greenhouse' &&
            //   reason !== 'connect_ashby' &&
            //   reason !== 'connect_lever'
            // }
            textPopupButton={
              <ShowCode>
                <ShowCode.When
                  isTrue={
                    reason === 'connect_greenhouse' ||
                    reason === 'connect_ashby' ||
                    reason === 'connect_lever'
                  }
                >
                  Connect
                </ShowCode.When>
                <ShowCode.When
                  isTrue={
                    reason === 'update_greenhouse' ||
                    reason === 'update_ashby' ||
                    reason === 'update_lever'
                  }
                >
                  Update
                </ShowCode.When>
              </ShowCode>
            }
            
            // isBlueButtonVisible={false}

            onClickCancel={{ onClick: close }}
            onClickAction={{ onClick: action }}
          />
        </ShowCode.Else>
      </ShowCode>
    </Dialog>
  );
}

export default ATSPopUps;
