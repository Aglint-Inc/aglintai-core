import { Dialog, Stack, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useState } from 'react';

import { Checkbox } from '@/devlink';
import { ConfirmationPopup, DeletePopup, ResumePop } from '@/devlink3';
import Loader from '@/src/components/Common/Loader';
import { ShowCode } from '@/src/components/Common/ShowCode';

function PauseResumeDialog({
  pauseResumeDialog,
  close,
  pause,
  resume,
  remove
}: {
  pauseResumeDialog: {
    isOpen: boolean;
    isAll: boolean;
    type: 'pause' | 'resume' | 'remove';
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
  return (
    <>
      <Dialog
        sx={{
          '& .MuiDialog-paper': {
            background: 'transparent',
            border: 'none',
            borderRadius: '10px'
          }
        }}
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
            {pauseResumeDialog.type === 'pause' ? (
              <ConfirmationPopup
                textPopupTitle={`Pause from scheduling ${pauseResumeDialog.isAll ? 'for  all ' + pauseResumeDialog.training_status + ' modules' : ' for this module'}.`}
                textPopupDescription={`This member won’t be considered for any new interviews scheduled with ${pauseResumeDialog.isAll ? 'all qualified' : 'this'} module until the pause durations is completed.`}
                isIcon={false}
                slotWidget={
                  <Stack spacing={2}>
                    <Typography variant='body2' color={'#2F3941'}>
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
                          end_date: ''
                        });
                      }}
                      sx={{ cursor: 'pointer' }}
                    >
                      <Checkbox isChecked={selectedType === 'isManual'} />
                      <Typography variant='body2' color={'#000'}>
                        Indefinetly
                      </Typography>
                      <Typography variant='body2'>
                        Until when you manualy resumes
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
                          end_date: twoWeeks.toDate().toISOString()
                        });
                      }}
                    >
                      <Checkbox isChecked={selectedType === 'twoWeek'} />
                      <Typography variant='body2' color={'#000'}>
                        2 Weeks
                      </Typography>
                      <Typography variant='body2'>
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
                          end_date: oneMonth.toDate().toISOString()
                        });
                      }}
                    >
                      <Checkbox isChecked={selectedType === 'oneMonth'} />
                      <Typography variant='body2' color={'#000'}>
                        1 Month
                      </Typography>
                      <Typography variant='body2'>
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
                          end_date: threeMonth.toDate().toISOString()
                        });
                      }}
                    >
                      <Checkbox isChecked={selectedType === 'threeMonth'} />
                      <Typography variant='body2' color={'#000'}>
                        3 Months
                      </Typography>
                      <Typography variant='body2'>
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
                          end_date: ''
                        });
                      }}
                    >
                      <Checkbox isChecked={selectedType === 'custom'} />
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
                              if (
                                dayjs(newValue).toISOString() <
                                pause_json?.end_date
                              ) {
                                setPauseJson({
                                  ...pause_json,
                                  start_date: dayjs(newValue).toISOString()
                                });
                              } else {
                                setPauseJson({
                                  ...pause_json,
                                  start_date: dayjs(newValue).toISOString(),
                                  end_date: null
                                });
                              }
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
                            minDate={dayjs(pause_json?.start_date)}
                            onChange={(newValue) => {
                              setPauseJson({
                                ...pause_json,
                                end_date: newValue.toISOString()
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
                onClickCancel={{ onClick: close }}
                onClickAction={{
                  onClick: () => {
                    pause(pause_json);
                  }
                }}
                textPopupButton={'Pause'}
              />
            ) : pauseResumeDialog.type === 'resume' ? (
              <ResumePop
                textResumeWarning={
                  !pauseResumeDialog.isAll
                    ? `This member is paused from scheduling with this module ${pauseResumeDialog.end_time ? 'until ' + end_date : ''} `
                    : `This member is paused from scheduling with all ${pauseResumeDialog.training_status} module`
                }
                textDescription={`By Clicking resume this member will be included in new interviews scheduled for this module.`}
                onClickResume={{
                  onClick: resume
                }}
                onClickClose={{ onClick: close }}
              />
            ) : (
              <DeletePopup
                textTitle={`Remove form${pauseResumeDialog.isAll ? ' all ' + pauseResumeDialog.training_status : ' this'} Modules`}
                textDescription={`By Clicking remove the member will be permanently removed from ${pauseResumeDialog.isAll ? 'all qualified interview Modules' : 'this interview Module'} .`}
                isIcon={false}
                isWidget={true}
                onClickCancel={{ onClick: close }}
                onClickDelete={{
                  onClick: remove
                }}
                buttonText={'Remove'}
              />
            )}
          </ShowCode.Else>
        </ShowCode>
      </Dialog>
    </>
  );
}

export default PauseResumeDialog;
