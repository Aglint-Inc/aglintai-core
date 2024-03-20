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
    (option) => option.id === selectedSlot,
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
              slotCardDate={confOption?.plans.map((pl, ind) => {
                return (
                  <AvailableOptionCardDate
                    textDate={dayjs(pl.start_time).format('DD')}
                    textDay={dayjs(pl.start_time).format('dddd')}
                    textMonth={dayjs(pl.start_time).format('MMM')}
                    key={ind}
                    slotOptionAvailable={
                      <OptionAvailable
                        textTime={`${dayjs(pl.start_time).format(
                          'hh:mm A',
                        )} - ${dayjs(pl.end_time).format('hh:mm A')}`}
                        textTitle={pl.module_name}
                        key={ind}
                        isTitleVisible={!pl.isBreak}
                        isBreakVisible={pl.isBreak}
                      />
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
