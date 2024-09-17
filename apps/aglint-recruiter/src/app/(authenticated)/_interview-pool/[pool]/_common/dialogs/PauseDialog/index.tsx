import { Checkbox } from '@components/ui/checkbox';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

import { UIAlert } from '@/components/Common/UIAlert';
import { UIButton } from '@/components/Common/UIButton';
import { UIDatePicker } from '@/components/Common/UIDatePicker';
import UIDialog from '@/components/Common/UIDialog';
import UITypography from '@/components/Common/UITypography';
import { supabase } from '@/utils/supabase/client';

import { optionsPause } from '../../../../../../../components/Scheduling/InterviewTypes/const';
import {
  setIsPauseDialogOpen,
  setPauseJson,
  setSelUser,
  useModulesStore,
} from '../../../../../../../components/Scheduling/InterviewTypes/store';
import { usePauseHandler } from '../../hooks/usePauseHandler';
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
              if (isSaving) return;
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
        <UIAlert
          type='small'
          color={'warning'}
          iconName={'CircleAlert'}
          title={'Pausing the interviewer'}
          description={
            'By pausing the interviewer, the member won’t be considered for any new interviews scheduled with this module until the pause is lifted. Existing interviews will not be affected.'
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
                <UITypography type='small'>
                  {connectedJobs.flatMap((job) => job.job_title).join(', ')}
                </UITypography>
              </div>
            }
          />
        )}
        <div className='space-y-1'>
          <UITypography type='small' color='#2F3941'>
            Pause For
          </UITypography>
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
              <UITypography type='small' className="text-neutral-800">
                {option.label}
              </UITypography>
              {option.description && (
                <UITypography type='small'>{option.description}</UITypography>
              )}
            </div>
          ))}
          {selectedType === 'custom' && (
            <div className='flex w-full space-x-1'>
              <UIDatePicker
              value={new Date(pause_json?.start_date)}
              onAccept={(newValue) => {
                if (dayjs(newValue).toISOString() < pause_json?.end_date) {
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
              minDate={new Date(currentDate.toISOString())}
              />
             <UIDatePicker
             value={new Date(pause_json?.end_date)}
             onAccept={(newValue) => {
               if (dayjs(newValue).toISOString() > pause_json?.start_date) {
                 setPauseJson({
                   ...pause_json,
                   end_date: dayjs(newValue).toISOString(),
                 });
               }
             }}
             minDate={new Date(pause_json?.start_date)}
             />
            </div>
          )}
        </div>
      </div>
    </UIDialog>
  );
}

export default PauseDialog;
