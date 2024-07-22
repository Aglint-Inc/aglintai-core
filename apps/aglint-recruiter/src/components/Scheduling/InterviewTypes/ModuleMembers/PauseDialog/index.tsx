import { Dialog, Stack, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { Checkbox } from '@/devlink/Checkbox';
import { DcPopup } from '@/devlink/DcPopup';
import { Text } from '@/devlink/Text';
import { GlobalBannerShort } from '@/devlink2/GlobalBannerShort';
import { supabase } from '@/src/utils/supabase/client';

import { DateIcon } from '../../../Settings/Components/DateSelector';
import { usePauseHandler } from '../../queries/hooks';
import {
  setIsPauseDialogOpen,
  setPauseJson,
  setSelUser,
  useModulesStore,
} from '../../store';
import { PauseType } from '../type';

function PauseDialog() {
  const isPauseDialogOpen = useModulesStore((state) => state.isPauseDialogOpen);
  const selUser = useModulesStore((state) => state.selUser);
  const pause_json = useModulesStore((state) => state.pause_json);
  const [selectedType, setSelectedType] = useState<PauseType>('isManual');
  const [connectedJobs, setConnectedJobs] = useState<
    {
      id: string;
      job_title: string;
    }[]
  >([]);
  const [isSaving, setIsSaving] = useState(false);

  const currentDate = useMemo(() => dayjs(), []);
  const twoWeeks = useMemo(() => currentDate.add(2, 'week'), [currentDate]);
  const oneMonth = useMemo(() => currentDate.add(1, 'month'), [currentDate]);
  const threeMonth = useMemo(() => currentDate.add(3, 'month'), [currentDate]);

  const resetState = () => {
    setIsPauseDialogOpen(false);
    setSelectedType('isManual');
    setPauseJson({ isManual: true, start_date: '', end_date: '' });
    setSelUser(null);
    setConnectedJobs([]);
  };

  const { pauseHandler } = usePauseHandler();

  useEffect(() => {
    if (selUser?.user_id && isPauseDialogOpen) {
      fetchSessionDetails();
    }
  }, [selUser?.user_id]);

  const fetchSessionDetails = async () => {
    try {
      const { data: meetInt } = await supabase
        .from('meeting_interviewers')
        .select('*')
        .eq('interview_module_relation_id', selUser.id)
        .is('meeting_id', null)
        .throwOnError();

      const { data: jobs } = await supabase
        .from('public_jobs')
        .select('id,job_title')
        .in(
          'id',
          meetInt.flatMap((meet) => meet.job_id),
        )
        .throwOnError();

      setConnectedJobs(jobs);
    } catch (e) {
      //
    }
  };

  return (
    <Dialog
      maxWidth={'xl'}
      open={isPauseDialogOpen}
      onClose={() => {
        resetState();
      }}
    >
      <DcPopup
        onClickClosePopup={{
          onClick: resetState,
        }}
        popupName={'Pause from scheduling'}
        slotBody={
          <Stack spacing={2}>
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
                    ...pause_json,
                    isManual: true,
                  });
                }}
                sx={{ cursor: 'pointer' }}
              >
                <Checkbox isChecked={selectedType === 'isManual'} />
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
                <Checkbox isChecked={selectedType === 'twoWeek'} />
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
                <Checkbox isChecked={selectedType === 'oneMonth'} />
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
                <Checkbox isChecked={selectedType === 'threeMonth'} />
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
                <Checkbox isChecked={selectedType === 'custom'} />
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
            <GlobalBannerShort
              color={'warning'}
              iconName={'warning'}
              textTitle={'Pausing the interviewer'}
              textDescription={
                'By pausing the interviewer, the member won’t be considered for any new interviews scheduled with this module until the pause is lifted. Existing interviews will not be affected.'
              }
              slotButtons={<></>}
            />
            {connectedJobs.length > 0 && (
              <GlobalBannerShort
                color={'warning'}
                iconName={'warning'}
                textTitle={`Here is a list of job's interview plan that will be impacted:`}
                textDescription=''
                slotButtons={
                  <Stack display={'flex'} flexDirection={'column'}>
                    <Text
                      size={1}
                      color={'neutral'}
                      content={connectedJobs
                        .flatMap((job) => job.job_title)
                        .join(', ')}
                    />
                  </Stack>
                }
              />
            )}
          </Stack>
        }
        slotButtons={
          <>
            <ButtonSoft
              size={2}
              color={'neutral'}
              textButton={'Cancel'}
              onClickButton={{
                onClick: resetState,
              }}
            />
            <ButtonSolid
              size={2}
              color={'accent'}
              textButton={'Pause'}
              isLoading={isSaving}
              onClickButton={{
                onClick: async () => {
                  if (isSaving) return;
                  else {
                    setIsSaving(true);
                    await pauseHandler({
                      module_id: selUser.module_id,
                      user_id: selUser?.user_id || '',
                      selectedType,
                      pause_json: pause_json,
                    });
                    resetState();
                  }
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
