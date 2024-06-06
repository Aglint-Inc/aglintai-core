import { Autocomplete, Dialog, Stack, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Checkbox } from '@/devlink/Checkbox';
import { ConfirmationPopup } from '@/devlink3/ConfirmationPopup';
import { DeletePopup } from '@/devlink3/DeletePopup';
import { ResumePop } from '@/devlink3/ResumePop';
import Loader from '@/src/components/Common/Loader';
import { ShowCode } from '@/src/components/Common/ShowCode';
import UITextField from '@/src/components/Common/UITextField';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { DateIcon } from '../../Settings/Components/DateSelector';
import { useImrQuery } from '../Interviewer/hooks';

export type ModuleType = {
  id: string;
  name: string;
};
function PauseResumeDialog({
  pauseResumeDialog,
  close,
  pause,
  resume,
  remove,
}: {
  pauseResumeDialog: {
    isOpen: boolean;
    isAll: boolean;
    type:
      | 'pause'
      | 'resume'
      | 'remove'
      | 'addQualifiedModule'
      | 'addTrainingModule';
    panel_id?: string | null;
    isLoading?: boolean;
    end_time?: string;
    training_status?: 'qualified' | 'training';
  };
  close: () => void;
  // eslint-disable-next-line no-unused-vars
  pause: (pause_json: any) => void;
  // eslint-disable-next-line no-unused-vars
  resume: () => void;
  remove: () => void;
}) {
  const [pause_json, setPauseJson] = useState<{
    start_date: string;
    end_date: string;
    isManual: boolean;
  } | null>({ isManual: true, start_date: '', end_date: '' });
  const [selectedType, setSelectedType] = useState<
    'isManual' | 'twoWeek' | 'oneMonth' | 'threeMonth' | 'custom'
  >('isManual');
  const currentDate = dayjs();
  const twoWeeks = currentDate.add(2, 'week');
  const oneMonth = currentDate.add(1, 'month');
  const threeMonth = currentDate.add(3, 'month');

  const end_date = dayjs(pauseResumeDialog.end_time).format('DD MMMM YYYY');
  // console.log({
  //   dd: selectedModule?.end_date,
  //   dd2: `${dayjs(selectedModule?.end_date).format('DD MMMM YYYY')}`
  // });
  const router = useRouter();
  const { allModules: modules } = useSchedulingContext();
  const { data, refetch } = useImrQuery({
    user_id: router.query.member_id as string,
  });

  const existingModule = data?.modules.map((item) => item.module_id);
  const allModules = modules.filter(
    (item) => !existingModule.includes(item.id),
  );
  const [selectedModule, setSelectedModule] = useState<ModuleType>(null);
  async function addModule() {
    if (selectedModule?.id) {
      await supabase
        .from('interview_module_relation')
        .insert({
          user_id: router.query.member_id as string,
          module_id: selectedModule.id,
          training_status:
            pauseResumeDialog.type === 'addQualifiedModule'
              ? 'qualified'
              : 'training',
        })
        .select();
      setSelectedModule(null);
      close();
      refetch();
    } else {
      toast.warning('Please pick interview type.');
    }
  }
  return (
    <>
      <Dialog
        open={pauseResumeDialog.isOpen}
        onClose={() => {
          // resetState();
          close();
        }}
      >
        <ShowCode>
          <ShowCode.When isTrue={pauseResumeDialog.isLoading}>
            {pauseResumeDialog.isLoading && <Loader />}
          </ShowCode.When>
          <ShowCode.Else render={''}>
            <ShowCode>
              <ShowCode.When isTrue={pauseResumeDialog.type === 'pause'}>
                <ConfirmationPopup
                  textPopupTitle={`Pause Scheduling ${pauseResumeDialog.isAll ? 'for  all ' + pauseResumeDialog.training_status + ' modules' : ' for this Module'}.`}
                  textPopupDescription={`This member will be excluded from all new interview scheduling within ${pauseResumeDialog.isAll ? 'all qualified' : 'this'} module until the pause period ends.`}
                  isIcon={false}
                  slotWidget={
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
                            end_date: '',
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
                                  dayjs(newValue).toISOString() <
                                  pause_json?.end_date
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
                  }
                  isWidget={true}
                  onClickCancel={{ onClick: close }}
                  onClickAction={{
                    onClick: () => {
                      pause(pause_json);
                    },
                  }}
                  textPopupButton={'Pause'}
                />
              </ShowCode.When>
              <ShowCode.When isTrue={pauseResumeDialog.type === 'resume'}>
                <ResumePop
                  textResumeWarning={
                    !pauseResumeDialog.isAll
                      ? `This member is paused from scheduling with this interview ${pauseResumeDialog.end_time ? 'until ' + end_date : ''} `
                      : `This member is paused from scheduling with all ${pauseResumeDialog.training_status} interviews`
                  }
                  textDescription={`By clicking resume this member will be included in new interviews scheduled.`}
                  onClickResume={{
                    onClick: resume,
                  }}
                  onClickClose={{ onClick: close }}
                />
              </ShowCode.When>
              <ShowCode.When isTrue={pauseResumeDialog.type === 'remove'}>
                <DeletePopup
                  textTitle={`Remove form${pauseResumeDialog.isAll ? ' all ' + pauseResumeDialog.training_status : ' this'} interview`}
                  textDescription={`By clicking remove the member will be permanently removed from ${pauseResumeDialog.isAll ? 'all qualified interview' : 'this interview'}.`}
                  isIcon={false}
                  isWidget={true}
                  onClickCancel={{ onClick: close }}
                  onClickDelete={{
                    onClick: remove,
                  }}
                  buttonText={'Remove'}
                />
              </ShowCode.When>
              <ShowCode.When
                isTrue={
                  pauseResumeDialog.type === 'addQualifiedModule' ||
                  pauseResumeDialog.type === 'addTrainingModule'
                }
              >
                <ConfirmationPopup
                  textPopupTitle={
                    pauseResumeDialog.type === 'addQualifiedModule'
                      ? 'Add to Qualified'
                      : 'Add to Training'
                  }
                  textPopupDescription={
                    'Pick an interview type from the list to add.'
                  }
                  isIcon={false}
                  slotWidget={
                    <Autocomplete
                      fullWidth
                      disableClearable
                      options={allModules}
                      // value={selectedTimeZone}
                      onChange={(event, value) => {
                        if (value) {
                          setSelectedModule(value);
                        }
                      }}
                      autoComplete={false}
                      getOptionLabel={(option) => option.name}
                      renderOption={(props, option) => {
                        return (
                          <li {...props}>
                            <Typography variant='body1' color={'var(--neutral-12)'}>
                              {option.name}
                            </Typography>
                          </li>
                        );
                      }}
                      renderInput={(params) => {
                        return (
                          <UITextField
                            rest={{ ...params }}
                            labelSize='medium'
                            // fullWidth
                            label=''
                            placeholder='Ex. Initial Screening'
                            InputProps={{
                              ...params.InputProps,
                              autoComplete: 'new-password',
                            }}
                          />
                        );
                      }}
                    />
                  }
                  isWidget={true}
                  onClickCancel={{
                    onClick: close,
                  }}
                  onClickAction={{
                    onClick: () => {
                      addModule();
                    },
                  }}
                  textPopupButton={'Add'}
                />
              </ShowCode.When>
            </ShowCode>
          </ShowCode.Else>
        </ShowCode>
      </Dialog>
    </>
  );
}

export default PauseResumeDialog;
