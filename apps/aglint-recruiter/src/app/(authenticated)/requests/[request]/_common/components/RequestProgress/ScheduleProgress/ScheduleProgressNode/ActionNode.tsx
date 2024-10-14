import { type DatabaseTable } from '@aglint/shared-types';
import { toast } from '@components/hooks/use-toast';
import { Button } from '@components/ui/button';
import { useRequest } from '@request/hooks';
import { Pen, Trash } from 'lucide-react';

import { useRequestProgressProvider } from '../../progressCtx';
import ScheduleProgressTracker from '../../ScheduleProgressTracker';
import { type TriggerActions } from '../../types';
import { deleteRequestWorkflowAction } from '../../utils';
import { workflowCopy } from '../../utils/copy';
import { apiTargetToEvents } from '../../utils/progressMaps';

const ActionNode = ({
  triggerAction,
  eventTrigger,
}: {
  eventTrigger: DatabaseTable['workflow']['trigger'];
  triggerAction: TriggerActions['actions'][0];
}) => {
  const eventType = apiTargetToEvents[triggerAction.target_api];
  if (!eventType) return;
  return (
    <>
      <div className='relative mb-1'>
        <ScheduleProgressTracker
          status={'future'}
          textProgress={workflowCopy[eventType]['future']}
          slotRightIcon={
            <EventNodeCntrls
              currEventTrigger={eventTrigger}
              currWAction={triggerAction}
            />
          }
          slotLoader={<></>}
          slotAiText={<></>}
        />
      </div>
    </>
  );
};

export default ActionNode;
const defaultTriggerDurations: Partial<
  Record<DatabaseTable['workflow']['trigger'], number>
> = {
  sendAvailReqReminder: 24 * 60,
  selfScheduleReminder: 24 * 60,
};
const EventNodeCntrls = ({
  currEventTrigger,
  currWAction,
}: {
  currEventTrigger: DatabaseTable['workflow']['trigger'];
  currWAction: DatabaseTable['workflow_action'];
}) => {
  const { request_workflow } = useRequest();
  const { setShowEditDialog, setTriggerDetails } = useRequestProgressProvider();
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
    <div className={`mt-2 flex flex-row gap-1`}>
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
        <Pen className='mr-2 h-3 w-3' />
        Edit
      </Button>
      <Button variant='outline' size='sm' onClick={handleDeleteScheduleAction}>
        <Trash className='mr-2 h-3 w-3 text-destructive' />
        Remove
      </Button>
    </div>
  );
};
