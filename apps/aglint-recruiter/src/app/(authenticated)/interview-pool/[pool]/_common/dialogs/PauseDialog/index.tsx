import Typography from '@components/typography';
import { Checkbox } from '@components/ui/checkbox';
import { UIAlert } from '@components/ui-alert';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import { UIDatePicker } from '@/components/Common/UIDatePicker';
import UIDialog from '@/components/Common/UIDialog';
import { supabase } from '@/utils/supabase/client';

import { optionsPause } from '../../../../_common/constants/const';
import { usePauseHandler } from '../../hooks/usePauseHandler';
import {
  setIsPauseDialogOpen,
  setPauseJson,
  setSelUser,
  useModulesStore,
} from '../../stores/store';
import { type PauseType } from '../../types/type';

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
    if (!selUser) return;
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
          (meetInt || []).flatMap((meet) => meet.job_id),
        )
        .throwOnError();

      const typedJobs = (jobs || []).filter(
        (j): j is { id: string; job_title: string } => j?.job_title !== null,
      );

      setConnectedJobs(typedJobs);
    } catch (e) {
      //
    }
  };

  return (
    <UIDialog
      open={isPauseDialogOpen}
      onClose={() => {
        resetState();
      }}
      title='Pause from scheduling'
      slotButtons={
        <>
          <UIButton variant='secondary' onClick={resetState}>
            Cancel
          </UIButton>
          <UIButton
            isLoading={isSaving}
            variant='default'
            onClick={async () => {
              if (isSaving || !pause_json || !selUser) return;
              else {
                setIsSaving(true);
                await pauseHandler({
                  module_id: selUser.module_id,
                  user_id: selUser?.user_id || '',
                  selectedType,
                  pause_json: pause_json,
                });
                setIsSaving(false);
                resetState();
              }
            }}
          >
            Pause
          </UIButton>
        </>
      }
    >
      <div className='flex flex-col gap-2'>
        <UIAlert type='warning' title='Pausing the interviewer'>
          <div className='mt-2 flex flex-col space-y-2'>
            <Typography type='small'>
              By pausing the interviewer, the member won&apos;t be considered
              for any new interviews scheduled with this module until the pause
              is lifted. Existing interviews will not be affected.
            </Typography>
          </div>
        </UIAlert>
        {connectedJobs.length > 0 && (
          <UIAlert
            type='warning'
            title="Here is a list of job's interview plan that will be impacted:"
            action={
              <div className='flex flex-col'>
                <Typography type='small'>
                  {connectedJobs.flatMap((job) => job.job_title).join(', ')}
                </Typography>
              </div>
            }
          />
        )}
        <div className='space-y-2'>
          <Typography type='small'>Pause For</Typography>
          {optionsPause.map((option) => (
            <div
              key={option.type}
              className='flex cursor-pointer items-center space-x-1'
              onClick={() => {
                setSelectedType(option.type);
                setPauseJson(option.pauseJson);
              }}
            >
              <Checkbox checked={selectedType === option.type} />
              <Typography type='small' className=''>
                {option.label}
              </Typography>
              {option.description && (
                <Typography type='small'>{option.description}</Typography>
              )}
            </div>
          ))}
          {selectedType === 'custom' && (
            <div className='flex w-full space-x-1'>
              <UIDatePicker
                value={
                  pause_json?.start_date
                    ? new Date(pause_json.start_date)
                    : new Date()
                }
                onAccept={(newValue) => {
                  if (pause_json) {
                    if (dayjs(newValue).toISOString() < pause_json?.end_date) {
                      setPauseJson({
                        ...pause_json,
                        start_date: dayjs(newValue).toISOString(),
                        end_date: dayjs(newValue).add(1, 'day').toISOString(),
                      });
                    } else {
                      setPauseJson({
                        ...pause_json,
                        start_date: dayjs(newValue).toISOString(),
                      });
                    }
                  }
                }}
                minDate={new Date(currentDate.toISOString())}
              />
              <UIDatePicker
                value={
                  pause_json?.end_date
                    ? new Date(pause_json.end_date)
                    : new Date()
                }
                onAccept={(newValue) => {
                  if (pause_json) {
                    if (
                      dayjs(newValue).toISOString() > pause_json?.start_date
                    ) {
                      setPauseJson({
                        ...pause_json,
                        end_date: dayjs(newValue).toISOString(),
                      });
                    }
                  }
                }}
                minDate={
                  pause_json?.start_date
                    ? new Date(pause_json.start_date)
                    : new Date()
                }
              />
            </div>
          )}
        </div>
      </div>
    </UIDialog>
  );
}

export default PauseDialog;
