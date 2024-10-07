/* eslint-disable security/detect-object-injection */
import { type DatabaseTable } from '@aglint/shared-types';
import { toast } from '@components/hooks/use-toast';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import { useRequest } from '@request/hooks';
import { Edit, Loader, Trash } from 'lucide-react';
import React from 'react';

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
  eventType: DatabaseTable['request_progress']['event_type'] | undefined;
  reqProgresMap: RequestProgressMapType;
  currEventTrigger: DatabaseTable['workflow']['trigger'];
  currWAction?: DatabaseTable['workflow_action'];
  showEditBtns?: boolean;
}) => {
  const { request_workflow } = useRequest();
  const { setShowEditDialog, setTriggerDetails } = useRequestProgressProvider();
  const [, setOnHover] = React.useState(false);
  if (!eventType) return <></>;
  const eventProg = reqProgresMap[eventType];
  let tense: ProgressTenseType = 'future';
  if (eventProg) {
    const headingEvent = eventProg.find(
      (prg) => prg.is_progress_step === false,
    );
    if (headingEvent) {
      tense = progressStatusToTense(headingEvent.status);
    }
  }

  const eventSubProgress = (eventProg ?? []).filter(
    (prg) => prg.is_progress_step === true,
  );
  const handleDeleteScheduleAction = async () => {
    if (!currWAction) return null;
    try {
      await deleteRequestWorkflowAction(currWAction.id);
      await request_workflow.refetch();
    } catch (err) {
      toast({ title: 'Failed to remove action', variant: 'destructive' });
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
          status={tense}
          textProgress={workflowCopy[eventType][tense]}
          slotRightIcon={
            tense === 'future' &&
            showEditBtns && (
              <div className={`flex flex-row gap-1 mt-2`}>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    let interval = 0;
                    const trigger_info = request_workflow.data.find(
                      (rw) => rw.trigger === currEventTrigger,
                    );
                    if (trigger_info) {
                      interval = trigger_info.interval;
                    } else if (defaultTriggerDurations[currEventTrigger]) {
                      interval = defaultTriggerDurations[currEventTrigger];
                    }
                    setTriggerDetails({
                      trigger: currEventTrigger,
                      interval,
                    });
                    setShowEditDialog(true);
                  }}
                >
                  <Edit className='mr-2 h-3 w-3' />
                  Edit
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={handleDeleteScheduleAction}
                >
                  <Trash className='mr-2 h-3 w-3 text-destructive' />
                  Remove
                </Button>
              </div>
            )
          }
          slotLoader={
            tense === 'present' ? (
              <Loader className='h-4 w-4 animate-spin text-muted-foreground' />
            ) : undefined
          }
          slotAiText={
            <>
              {eventSubProgress.length > 0 && (
                <div className=''>
                  {eventSubProgress.map((prg) => {
                    if (
                      !prg.log &&
                      progressActionMap[`${prg.event_type}_${prg.status}`]
                    ) {
                      const key =
                        `${prg.event_type}_${prg.status}` as keyof typeof progressActionMap;
                      const Comp = progressActionMap[key];
                      return <Comp key={prg.id} {...prg} />;
                    }
                    return (
                      <Label
                        key={prg.id}
                        className='flex items-center text-sm font-normal'
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
