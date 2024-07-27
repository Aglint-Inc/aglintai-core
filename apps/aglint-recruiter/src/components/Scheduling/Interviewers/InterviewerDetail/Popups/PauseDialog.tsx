import { Checkbox, Dialog, Stack, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { DcPopup } from '@/devlink/DcPopup';
import dayjs from '@/src/utils/dayjs';
import { supabase } from '@/src/utils/supabase/client';

import { DateIcon } from '../../../Settings/Components/DateSelector';
import { setIsPauseDialogOpen, useInterviewerDetailStore } from '../store';

function PauseDialog({ refetch }: { refetch: () => void }) {
  const [selectedType, setSelectedType] = React.useState<
    'isManual' | 'twoWeek' | 'oneMonth' | 'threeMonth' | 'custom'
  >('isManual');
  const [pause_json, setPauseJson] = React.useState({
    isManual: true,
    start_date: '',
    end_date: '',
  });

  const currentDate = dayjs();
  const twoWeeks = currentDate.add(2, 'week');
  const oneMonth = currentDate.add(1, 'month');
  const threeMonth = currentDate.add(3, 'month');

  const { isPauseDialogOpen, selRelation } = useInterviewerDetailStore(
    (state) => ({
      isPauseDialogOpen: state.isPauseDialogOpen,
      selRelation: state.selRelation,
    }),
  );

  const pause = async () => {
    try {
      await supabase
        .from('interview_module_relation')
        .update({ pause_json: selRelation.pause_json })
        .eq('id', selRelation.id)
        .throwOnError();

      refetch();
    } catch (e) {
      //
    }
  };
  return (
    <Dialog
      open={isPauseDialogOpen}
      onClose={() => {
        setIsPauseDialogOpen(false);
      }}
    >
      <DcPopup
        popupName={`Pause Scheduling for this Module`}
        slotBody={
          <Stack>
            <Typography mb={2}>
              This member will be excluded from all new interview scheduling
              within module until the pause period ends.
            </Typography>
            <Stack spacing={2}>
              <Typography variant='body1' color={'#2F3941'}>
                Pause For
              </Typography>
              <Stack
                direction={'row'}
                spacing={1}
                alignItems={'center'}
                onClick={() => {
                  setSelectedType('isManual');
                  setPauseJson({
                    isManual: true,
                    start_date: '',
                    end_date: '',
                  });
                }}
                sx={{ cursor: 'pointer' }}
              >
                <Checkbox checked={selectedType === 'isManual'} />
                <Typography variant='body1' color={'var(--neutral-12)'}>
                  Indefinitely
                </Typography>
                <Typography variant='body1'>
                  Until you manually resume
                </Typography>
              </Stack>
              <Stack
                direction={'row'}
                spacing={1}
                alignItems={'center'}
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  setSelectedType('twoWeek');
                  setPauseJson({
                    isManual: false,
                    start_date: new Date().toISOString(),
                    end_date: twoWeeks.toDate().toISOString(),
                  });
                }}
              >
                <Checkbox checked={selectedType === 'twoWeek'} />
                <Typography variant='body1' color={'var(--neutral-12)'}>
                  2 Weeks
                </Typography>
                <Typography variant='body1'>
                  Resumes on {twoWeeks.format('MMMM DD, YYYY')}
                </Typography>
              </Stack>
              <Stack
                direction={'row'}
                spacing={1}
                alignItems={'center'}
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  setSelectedType('oneMonth');
                  setPauseJson({
                    isManual: false,
                    start_date: new Date().toISOString(),
                    end_date: oneMonth.toDate().toISOString(),
                  });
                }}
              >
                <Checkbox checked={selectedType === 'oneMonth'} />
                <Typography variant='body1' color={'var(--neutral-12)'}>
                  1 Month
                </Typography>
                <Typography variant='body1'>
                  Resumes on {oneMonth.format('MMMM DD, YYYY')}
                </Typography>
              </Stack>
              <Stack
                direction={'row'}
                spacing={1}
                alignItems={'center'}
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  setSelectedType('threeMonth');
                  setPauseJson({
                    isManual: false,
                    start_date: new Date().toISOString(),
                    end_date: threeMonth.toDate().toISOString(),
                  });
                }}
              >
                <Checkbox checked={selectedType === 'threeMonth'} />
                <Typography variant='body1' color={'var(--neutral-12)'}>
                  3 Months
                </Typography>
                <Typography variant='body1'>
                  Resumes on {threeMonth.format('MMMM DD, YYYY')}
                </Typography>
              </Stack>
              <Stack
                direction={'row'}
                spacing={1}
                alignItems={'center'}
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  setSelectedType('custom');
                  setPauseJson({
                    isManual: false,
                    start_date: new Date().toISOString(),
                    end_date: '',
                  });
                }}
              >
                <Checkbox checked={selectedType === 'custom'} />
                <Typography variant='body1' color={'var(--neutral-12)'}>
                  Custom date
                </Typography>
              </Stack>
              {selectedType === 'custom' && (
                <Stack direction={'row'} width={'100%'} spacing={1}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={dayjs(pause_json?.start_date)}
                      onChange={(newValue) => {
                        if (
                          dayjs(newValue).toISOString() < pause_json?.end_date
                        ) {
                          setPauseJson({
                            ...pause_json,
                            start_date: dayjs(newValue).toISOString(),
                          });
                        } else {
                          setPauseJson({
                            ...pause_json,
                            start_date: dayjs(newValue).toISOString(),
                            end_date: null,
                          });
                        }
                      }}
                      minDate={currentDate}
                      slots={{
                        openPickerIcon: DateIcon,
                      }}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={dayjs(pause_json?.end_date)}
                      minDate={dayjs(pause_json?.start_date)}
                      onChange={(newValue) => {
                        setPauseJson({
                          ...pause_json,
                          end_date: newValue.toISOString(),
                        });
                      }}
                      slots={{
                        openPickerIcon: DateIcon,
                      }}
                    />
                  </LocalizationProvider>
                </Stack>
              )}
            </Stack>
          </Stack>
        }
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
              textButton={'Pause'}
              onClickButton={{
                onClick: () => {
                  pause();
                },
              }}
            />
          </>
        }
      />
    </Dialog>
  );
}

export default PauseDialog;
