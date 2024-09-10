/* eslint-disable security/detect-object-injection */
import { type DatabaseTable } from '@aglint/shared-types';
import { ScheduleProgress } from '@devlink2/ScheduleProgress';

import React from 'react';

import LottieAnimations from '@/components/Common/Lotties/LottieIcons';
import { useRequest } from '@/context/RequestContext';
import toast from '@/utils/toast';

import { deleteRequestWorkflowAction } from '../utils';
import { useRequestProgressProvider } from '../progressCtx';
import { type ProgressTenseType, type RequestProgressMapType } from '../types';
import { workflowCopy } from '../utils/copy';
import { progressActionMap } from '../utils/ProgressActionMap';
import { progressStatusToTense } from '../utils/progressStatusToTense';
import { Label } from '@components/ui/label';
import { Button } from '@components/ui/button';
import { RefreshCw, Trash } from 'lucide-react';

const EventNode = ({
  eventType,
  reqProgresMap,
  currEventTrigger,
  currWAction,
}: {
  eventType: DatabaseTable['request_progress']['event_type'];
  reqProgresMap: RequestProgressMapType;
  currEventTrigger: DatabaseTable['workflow']['trigger'];
  currWAction?: DatabaseTable['workflow_action'];
}) => {
  const { request_workflow } = useRequest();
  const { setEditTrigger, setShowEditDialog } = useRequestProgressProvider();
  const [onHover, setOnHover] = React.useState(false);
  const eventProg = reqProgresMap[eventType];
  let tense: ProgressTenseType = 'future';
  if (eventProg) {
    const headingEvent: DatabaseTable['request_progress'] = eventProg.find(
      (prg) => prg.is_progress_step === false,
    );
    tense = progressStatusToTense(headingEvent?.status);
  }
  const eventSubProgress = (eventProg ?? []).filter(
    (prg) => prg.is_progress_step === true,
  );
  const handleDeleteScheduleAction = async () => {
    try {
      await deleteRequestWorkflowAction(currWAction.id);
      await request_workflow.refetch();
    } catch (err) {
      toast.error('Failed to remove action');
    }
  };
  return (
    <>
      <div
        className='relative'
        onMouseEnter={() => {
          if (tense === 'future') {
            setOnHover(true);
          }
        }}
        onMouseLeave={() => {
          setOnHover(false);
        }}
      >
        <ScheduleProgress
          status={
            tense === 'past' ? 'completed' : tense === 'future' ? 'circle' : ''
          }
          textProgress={workflowCopy[eventType][tense]}
          slotRightIcon={
            <div
              className={`flex flex-row gap-1 ${
                onHover
                  ? 'opacity-100 cursor-pointer'
                  : 'opacity-0 cursor-default'
              }`}
            >
              <Button
                variant='outline'
                size='sm'
                onClick={() => {
                  setEditTrigger(currEventTrigger);
                  setShowEditDialog(true);
                }}
              >
                <RefreshCw className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={handleDeleteScheduleAction}
              >
                <Trash className='h-4 w-4 text-destructive' />
              </Button>
            </div>
          }
          slotLoader={
            tense === 'present' ? (
              <LottieAnimations animation='loading_spinner' size={1.5} />
            ) : undefined
          }
          slotAiText={
            <>
              {eventSubProgress.length > 0 && (
                <div className='ml-4 space-y-2'>
                  {eventSubProgress.map((prg) => {
                    if (
                      !prg.log &&
                      progressActionMap[`${prg.event_type}_${prg.status}`]
                    ) {
                      const key = `${prg.event_type}_${prg.status}`;
                      const Comp = progressActionMap[key];
                      return <Comp key={prg.id} {...prg} />;
                    }
                    return (
                      <Label
                        key={prg.id}
                        className='flex items-center text-sm text-gray-500'
                      >
                        {prg.log}
                      </Label>
                    );
                  })}
                </div>
              )}
            </>
          }
        />
      </div>
    </>
  );
};

export default EventNode;
