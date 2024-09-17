/* eslint-disable security/detect-object-injection */
import { type DatabaseTable } from '@aglint/shared-types';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import { Edit, Loader, Trash } from 'lucide-react';
import React from 'react';

import { useRequest } from '@/context/RequestContext';
import toast from '@/utils/toast';

import { useRequestProgressProvider } from '../progressCtx';
import ScheduleProgressTracker from '../ScheduleProgressTracker';
import { type ProgressTenseType, type RequestProgressMapType } from '../types';
import { deleteRequestWorkflowAction } from '../utils';
import { workflowCopy } from '../utils/copy';
import { progressActionMap } from '../utils/ProgressActionMap';
import { progressStatusToTense } from '../utils/progressStatusToTense';

const defaultTriggerDurations: Partial<
  Record<DatabaseTable['workflow']['trigger'], number>
> = {
  sendAvailReqReminder: 24 * 60,
  selfScheduleReminder: 24 * 60,
};

const EventNode = ({
  eventType,
  reqProgresMap,
  currEventTrigger,
  currWAction,
  showEditBtns = true,
}: {
  eventType: DatabaseTable['request_progress']['event_type'];
  reqProgresMap: RequestProgressMapType;
  currEventTrigger: DatabaseTable['workflow']['trigger'];
  currWAction?: DatabaseTable['workflow_action'];
  showEditBtns?: boolean;
}) => {
  const { request_workflow } = useRequest();
  const { setShowEditDialog, setTriggerDetails } = useRequestProgressProvider();
  const [, setOnHover] = React.useState(false);
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
        className='relative mb-1'
        onMouseEnter={() => {
          if (tense === 'future') {
            setOnHover(true);
          }
        }}
        onMouseLeave={() => {
          setOnHover(false);
        }}
      >
        <ScheduleProgressTracker
          status={
            tense === 'past' ? 'completed' : tense === 'future' ? 'circle' : ''
          }
          textProgress={workflowCopy[eventType][tense]}
          slotRightIcon={
            tense === 'future' &&
            showEditBtns && (
              <div className={`flex flex-row gap-1`}>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    let interval = 0;
                    if (defaultTriggerDurations[currEventTrigger]) {
                      interval = defaultTriggerDurations[currEventTrigger];
                    }
                    setTriggerDetails({
                      trigger: currEventTrigger,
                      interval,
                    });
                    setShowEditDialog(true);
                  }}
                >
                  <Edit className='h-4 w-4 mr-2' />
                  Edit
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={handleDeleteScheduleAction}
                >
                  <Trash className='h-4 w-4 mr-2 text-destructive' />
                  Remove
                </Button>
              </div>
            )
          }
          slotLoader={
            tense === 'present' ? (
              <Loader className='h-4 w-4 animate-spin text-gray-500' />
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
