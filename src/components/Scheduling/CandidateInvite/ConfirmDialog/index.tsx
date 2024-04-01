import { Dialog, Stack } from '@mui/material';
import dayjs from 'dayjs';

import { ButtonSuccessLarge } from '@/devlink';
import {
  AvailableOptionCardDate,
  InviteLinkConfirm,
  OptionAvailable,
  OptionAvailableCard,
} from '@/devlink2';
import LoaderGrey from '@/src/components/Common/LoaderGrey';

import { ApiResponse } from '../type';

function ConfirmDialog({
  selectedSlot,
  dialogOpen,
  setDialogOpen,
  handleConfirmSlot,
  saving,
  schedule,
}: {
  selectedSlot: string;
  dialogOpen: boolean;
  setDialogOpen: any;
  handleConfirmSlot: () => void;
  saving: boolean;
  schedule: ApiResponse;
}) {
  const confOption = schedule?.schedulingOptions?.find(
    (option) => option.plan_comb_id === selectedSlot,
  );

  return (
    <Dialog
      maxWidth={'lg'}
      open={dialogOpen}
      onClose={() => {
        setDialogOpen(false);
      }}
    >
      {confOption && (
        <InviteLinkConfirm
          slotInviteLinkCard={
            <OptionAvailableCard
              isActive={false}
              slotCardDate={confOption?.sessions.map((ses, ind) => {
                return (
                  <AvailableOptionCardDate
                    textDate={dayjs(ses.start_time).format('DD')}
                    textDay={dayjs(ses.start_time).format('dddd')}
                    textMonth={dayjs(ses.start_time).format('MMM')}
                    key={ind}
                    slotOptionAvailable={
                      <>
                        <OptionAvailable
                          textTime={`${dayjs(ses.start_time).format(
                            'hh:mm A',
                          )} - ${dayjs(ses.end_time).format('hh:mm A')}`}
                          textTitle={ses.module_name}
                          key={ind}
                          isTitleVisible={true}
                          isBreakVisible={false}
                        />
                        {ses.break_duration > 0 &&
                          ind !== confOption?.sessions.length - 1 && (
                            <OptionAvailable
                              key={ind}
                              textTime={''}
                              textBreakTime={
                                `${ses.break_duration} Minutes` || ''
                              }
                              isTitleVisible={false}
                              isBreakVisible={true}
                            />
                          )}
                      </>
                    }
                  />
                );
              })}
            />
          }
          onClickClose={{
            onClick: () => {
              setDialogOpen(false);
            },
          }}
          slotConfirmButton={
            <ButtonSuccessLarge
              isEndIcon={saving}
              slotEndIcon={
                <Stack height={'100%'}>
                  <LoaderGrey />
                </Stack>
              }
              wrapperProps={{
                style: {
                  width: '100%',
                  fontSize: '16px',
                },
              }}
              isDisabled={false}
              onClickButton={{
                onClick: () => {
                  if (!saving) handleConfirmSlot();
                },
              }}
              textLabel='Confirm'
            />
          }
        />
      )}
    </Dialog>
  );
}

export default ConfirmDialog;
