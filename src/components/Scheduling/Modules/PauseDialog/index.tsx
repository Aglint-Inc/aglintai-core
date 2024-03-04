import { Dialog, Stack, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useState } from 'react';

import { Checkbox } from '@/devlink';
import { ConfirmationPopup } from '@/devlink3';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import {
  setEditModule,
  setIsPauseDialogOpen,
  setPauseJson,
  useSchedulingStore
} from '../store';

function PauseDialog() {
  const { isPauseDialogOpen, pause_json, selUser, editModule } =
    useSchedulingStore();
  const [selectedType, setSelectedType] = useState<
    'isManual' | 'twoWeek' | 'oneMonth' | 'threeMonth' | 'custom'
  >('isManual');

  const pauseHandler = async () => {
    try {
      if (selUser.user_id) {
        const { error } = await supabase
          .from('interview_module_relation')
          .update({ pause_json: pause_json })
          .match({ module_id: editModule.id, user_id: selUser.user_id });
        if (!error) {
          setEditModule({
            ...editModule,
            relations: editModule.relations.map((rel) =>
              rel.user_id === selUser.user_id
                ? { ...rel, pause_json: pause_json }
                : rel
            )
          });
        }
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Error pausing user');
    } finally {
      setIsPauseDialogOpen(false);
    }
  };

  const currentDate = dayjs();
  const twoWeeks = currentDate.add(2, 'week');
  const oneMonth = currentDate.add(1, 'month');
  const threeMonth = currentDate.add(3, 'month');

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          background: 'transparent',
          border: 'none',
          borderRadius: '10px'
        }
      }}
      open={isPauseDialogOpen}
      onClose={() => {
        setIsPauseDialogOpen(false);
      }}
    >
      <ConfirmationPopup
        textPopupTitle={'Pause from scheduling'}
        textPopupDescription={
          'This member won’t be considered for any new interviews schedulled with this modulw until the pause is complete'
        }
        isIcon={false}
        slotWidget={
          <Stack spacing={2}>
            <Typography variant='body2' color={'#2F3941'}>
              Pause For
            </Typography>
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
              <Checkbox
                isChecked={selectedType === 'isManual'}
                onClickCheck={{
                  onClick: () => {
                    setSelectedType('isManual');
                    setPauseJson({
                      ...pause_json,
                      isManual: true
                    });
                  }
                }}
              />
              <Typography variant='body2' color={'#000'}>
                Indefinetly
              </Typography>
              <Typography variant='body2'>
                Until when you manualy resumes
              </Typography>
            </Stack>
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
              <Checkbox
                isChecked={selectedType === 'twoWeek'}
                onClickCheck={{
                  onClick: () => {
                    setSelectedType('twoWeek');
                    setPauseJson({
                      isManual: false,
                      start_date: new Date().toISOString(),
                      end_date: twoWeeks.toDate().toISOString()
                    });
                  }
                }}
              />
              <Typography variant='body2' color={'#000'}>
                2 Weeks
              </Typography>
              <Typography variant='body2'>
                Resumes on {twoWeeks.format('MMMM DD, YYYY')}
              </Typography>
            </Stack>
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
              <Checkbox
                isChecked={selectedType === 'oneMonth'}
                onClickCheck={{
                  onClick: () => {
                    setSelectedType('oneMonth');
                    setPauseJson({
                      isManual: false,
                      start_date: new Date().toISOString(),
                      end_date: oneMonth.toDate().toISOString()
                    });
                  }
                }}
              />
              <Typography variant='body2' color={'#000'}>
                1 Month
              </Typography>
              <Typography variant='body2'>
                Resumes on {oneMonth.format('MMMM DD, YYYY')}
              </Typography>
            </Stack>
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
              <Checkbox
                isChecked={selectedType === 'threeMonth'}
                onClickCheck={{
                  onClick: () => {
                    setSelectedType('threeMonth');
                    setPauseJson({
                      isManual: false,
                      start_date: new Date().toISOString(),
                      end_date: threeMonth.toDate().toISOString()
                    });
                  }
                }}
              />
              <Typography variant='body2' color={'#000'}>
                3 Months
              </Typography>
              <Typography variant='body2'>
                Resumes on {threeMonth.format('MMMM DD, YYYY')}
              </Typography>
            </Stack>
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
              <Checkbox
                isChecked={selectedType === 'custom'}
                onClickCheck={{
                  onClick: () => {
                    setSelectedType('custom');
                    setPauseJson({
                      isManual: false,
                      start_date: new Date().toISOString(),
                      end_date: ''
                    });
                  }
                }}
              />
              <Typography variant='body2' color={'#000'}>
                Custom date
              </Typography>
            </Stack>
            {selectedType === 'custom' && (
              <Stack direction={'row'} width={'100%'} spacing={1}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={'From'}
                    value={dayjs(pause_json?.start_date)}
                    onChange={(newValue) => {
                      setPauseJson({
                        ...pause_json,
                        start_date: newValue.toISOString()
                      });
                    }}
                    minDate={currentDate}
                    slotProps={{
                      textField: {
                        InputProps: { disableUnderline: true }
                      }
                    }}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={'To'}
                    value={dayjs(pause_json?.end_date)}
                    minDate={currentDate}
                    onChange={(newValue) => {
                      setPauseJson({
                        ...pause_json,
                        start_date: newValue.toISOString()
                      });
                    }}
                    slotProps={{
                      textField: {
                        InputProps: { disableUnderline: true }
                      }
                    }}
                  />
                </LocalizationProvider>
              </Stack>
            )}
          </Stack>
        }
        isWidget={true}
        onClickCancel={{
          onClick: () => {
            setIsPauseDialogOpen(false);
          }
        }}
        onClickAction={{
          onClick: pauseHandler
        }}
        textPopupButton={'Pause'}
      />
    </Dialog>
  );
}

export default PauseDialog;
