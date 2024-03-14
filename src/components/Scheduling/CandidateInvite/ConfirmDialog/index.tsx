import { Dialog, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

import { ButtonSuccessLarge } from '@/devlink';
import {
  AvailableOptionCardDate,
  InviteLinkConfirm,
  OptionAvailable,
  OptionAvailableCard
} from '@/devlink2';
import LoaderGrey from '@/src/components/Common/LoaderGrey';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getFullName } from '@/src/utils/jsonResume';

import { ApiResponse } from '../type';

function ConfirmDialog({
  selectedSlot,
  dialogOpen,
  setDialogOpen,
  handleConfirmSlot,
  saving,
  schedule
}: {
  selectedSlot: ApiResponse['schedulingOptions'][0];
  dialogOpen: boolean;
  setDialogOpen: any;
  handleConfirmSlot: () => void;
  saving: boolean;
  schedule: ApiResponse;
}) {
  return (
    <Dialog
      maxWidth={'lg'}
      open={dialogOpen}
      onClose={() => {
        setDialogOpen(false);
      }}
    >
      <InviteLinkConfirm
        slotInviteLinkCard={
          <OptionAvailableCard
            isActive={false}
            slotCardDate={selectedSlot?.transformedPlan.map((plan, ind) => {
              return Object.entries(plan).map(([date, events]) => {
                return (
                  <AvailableOptionCardDate
                    textDate={dayjs(date).format('DD')}
                    textDay={dayjs(date).format('dddd')}
                    textMonth={dayjs(date).format('MMM')}
                    key={ind}
                    slotOptionAvailable={events.map((pl, ind) => {
                      return (
                        <OptionAvailable
                          textTime={`${dayjs(pl.start_time).format(
                            'hh:mm A'
                          )} - ${dayjs(pl.end_time).format('hh:mm A')}`}
                          textTitle={pl.module_name}
                          key={ind}
                          isTitleVisible={!pl.isBreak}
                          isBreakVisible={pl.isBreak}
                          slotMember={
                            <Stack
                              direction={'row'}
                              sx={{
                                flexWrap: 'wrap',
                                gap: 2.5
                              }}
                            >
                              {pl?.selectedIntervs?.map((int) => {
                                const user = schedule.members.find(
                                  (member) => member.user_id === int.interv_id
                                );
                                if (!user) return null;
                                return (
                                  <Stack
                                    key={int.interv_id}
                                    direction={'row'}
                                    spacing={1}
                                    sx={{
                                      textWrap: 'nowrap'
                                    }}
                                  >
                                    <MuiAvatar
                                      level={getFullName(
                                        user.first_name,
                                        user.last_name
                                      )}
                                      src={user?.profile_image}
                                      variant={'circular'}
                                      width={'24px'}
                                      height={'24px'}
                                      fontSize={'12px'}
                                    />
                                    <Typography
                                      variant={'body2'}
                                      color={'#000'}
                                    >
                                      {getFullName(
                                        user.first_name,
                                        user.last_name
                                      )}
                                    </Typography>
                                  </Stack>
                                );
                              })}
                            </Stack>
                          }
                        />
                      );
                    })}
                  />
                );
              });
            })}
          />
        }
        onClickClose={{
          onClick: () => {
            setDialogOpen(false);
          }
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
                fontSize: '16px'
              }
            }}
            isDisabled={false}
            onClickButton={{
              onClick: () => {
                if (!saving) handleConfirmSlot();
              }
            }}
            textLabel='Confirm'
          />
        }
      />
    </Dialog>
  );
}

export default ConfirmDialog;
