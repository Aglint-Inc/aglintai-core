import { Checkbox } from '@components/ui/checkbox';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Calendar } from 'lucide-react';
import React, { useEffect } from 'react';

import { UIAlert } from '@/components/Common/UIAlert';
import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import dayjs from '@/utils/dayjs';
import { supabase } from '@/utils/supabase/client';

import { useModuleRelations } from '../hooks';
import { setIsPauseDialogOpen, useInterviewerDetailStore } from '../store';

function PauseDialog() {
  const [selectedType, setSelectedType] = React.useState<
    'isManual' | 'twoWeek' | 'oneMonth' | 'threeMonth' | 'custom'
  >('isManual');
  const [pause_json, setPauseJson] = React.useState({
    isManual: true,
    start_date: '',
    end_date: '',
  });
  const [connectedJobs, setConnectedJobs] = React.useState<
    {
      id: string;
      job_title: string;
    }[]
  >([]);
  const [isSaving, setIsSaving] = React.useState(false);

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
  const { refetch } = useModuleRelations({
    user_id: selRelation?.user_id,
  });

  const pause = async () => {
    try {
      setIsSaving(true);
      await supabase
        .from('interview_module_relation')
        .update({ pause_json: pause_json })
        .eq('id', selRelation.id)
        .throwOnError();
      await refetch();
      close();
    } catch (e) {
      //
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (selRelation?.id && isPauseDialogOpen) {
      fetchSessionDetails();
    }
  }, [selRelation?.id]);

  const fetchSessionDetails = async () => {
    try {
      const { data: meetInt } = await supabase
        .from('meeting_interviewers')
        .select('*')
        .eq('interview_module_relation_id', selRelation.id)
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

  const close = () => {
    if (isSaving) return;
    setIsPauseDialogOpen(false);
    setConnectedJobs([]);
  };

  return (
    <>
      <UIDialog
        open={isPauseDialogOpen}
        onClose={close}
        title='Pause Scheduling for this Module'
        slotButtons={
          <>
            <UIButton size='sm' variant='secondary' onClick={close}>
              Cancel
            </UIButton>
            <UIButton
              size='sm'
              isLoading={isSaving}
              onClick={() => {
                if (isSaving) return;
                pause();
              }}
            >
              Pause
            </UIButton>
          </>
        }
      >
        <div className='flex flex-col space-y-2 w-full'>
          <UIAlert
            type='small'
            color={'warning'}
            iconName={'CircleAlert'}
            title={'Pausing the interviewer'}
            description={
              "By pausing the interviewer, the member won't be considered for any new interviews scheduled with this module until the pause is lifted. Existing interviews will not be affected."
            }
          />
          {connectedJobs.length > 0 && (
            <UIAlert
              type='small'
              color={'warning'}
              iconName={'CircleAlert'}
              title={`Here is a list of job's interview plan that will be impacted:`}
              actions={
                <div className='flex flex-col'>
                  <p className='text-sm text-muted-foreground'>
                    {connectedJobs.flatMap((job) => job.job_title).join(', ')}
                  </p>
                </div>
              }
            />
          )}
          <div className='flex flex-col'>
            <p className='mb-2 text-sm'>
              This member will be excluded from all new interview scheduling
              within module until the pause period ends.
            </p>
            <div className='flex flex-col space-y-2'>
              <p className='text-sm font-medium text-[#2F3941]'>Pause For</p>
              <div
                className='flex flex-row items-center space-x-2 cursor-pointer'
                onClick={() => {
                  setSelectedType('isManual');
                  setPauseJson({
                    isManual: true,
                    start_date: '',
                    end_date: '',
                  });
                }}
              >
                <Checkbox checked={selectedType === 'isManual'} />
                <div className='flex flex-row space-x-1'>
                  <span className='text-sm font-medium text-[var(--neutral-12)]'>
                    Indefinitely
                  </span>
                  <span className='text-sm'>Until you manually resume</span>
                </div>
              </div>
              <div
                className='flex flex-row items-center space-x-2 cursor-pointer'
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
                <div className='flex flex-row space-x-1'>
                  <span className='text-sm font-medium text-[var(--neutral-12)]'>
                    2 Weeks
                  </span>
                  <span className='text-sm'>
                    Resumes on {twoWeeks.format('MMMM DD, YYYY')}
                  </span>
                </div>
              </div>
              <div
                className='flex flex-row items-center space-x-2 cursor-pointer'
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
                <div className='flex flex-row space-x-1'>
                  <span className='text-sm font-medium text-[var(--neutral-12)]'>
                    1 Month
                  </span>
                  <span className='text-sm'>
                    Resumes on {oneMonth.format('MMMM DD, YYYY')}
                  </span>
                </div>
              </div>
              <div
                className='flex flex-row items-center space-x-2 cursor-pointer'
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
                <div className='flex flex-row space-x-1'>
                  <span className='text-sm font-medium text-[var(--neutral-12)]'>
                    3 Months
                  </span>
                  <span className='text-sm'>
                    Resumes on {threeMonth.format('MMMM DD, YYYY')}
                  </span>
                </div>
              </div>
              <div
                className='flex flex-row items-center space-x-2 cursor-pointer'
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
                <span className='text-sm font-medium text-[var(--neutral-12)]'>
                  Custom date
                </span>
              </div>
              {selectedType === 'custom' && (
                <div className='flex flex-row w-full space-x-1'>
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
                        openPickerIcon: () => <Calendar size={20} />,
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
                        openPickerIcon: () => <Calendar size={20} />,
                      }}
                    />
                  </LocalizationProvider>
                </div>
              )}
            </div>
          </div>
        </div>
      </UIDialog>
    </>
  );
}

export default PauseDialog;
