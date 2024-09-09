import { dayjsLocal } from '@aglint/shared-utils';
import { Button } from '@components/ui/button';

import { setCandidateAvailabilityDrawerOpen } from '@/components/Requests/ViewRequestDetails/CandidateAvailability/store';
import { useMeetingList } from '@/components/Requests/ViewRequestDetails/hooks';
import { useSelfSchedulingDrawer } from '@/components/Requests/ViewRequestDetails/SelfSchedulingDrawer/hooks';
import {
  initialFilters,
  setIsSelfScheduleDrawerOpen,
  useSelfSchedulingFlowStore,
} from '@/components/Requests/ViewRequestDetails/SelfSchedulingDrawer/store';

import { useRequestProgressProvider } from '../progressCtx';
import { Loader2, PlusCircle } from 'lucide-react';
import { Label } from '@components/ui/label';

const ChooseScheduleMode = () => {
  const { setEditTrigger, setShowEditDialog } = useRequestProgressProvider();
  const { fetchingPlan } = useSelfSchedulingFlowStore((state) => ({
    fetchingPlan: state.fetchingPlan,
  }));

  const { refetch } = useMeetingList();

  const { findAvailibility } = useSelfSchedulingDrawer({ refetch });
  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='flex justify-end gap-2'>
          <Label>
            There are no workflows set. please select an action to proceed
            manually or add action from below.
          </Label>
        </div>
        <div className='flex flex-row gap-1'>
          <Button
            size='sm'
            variant='default'
            onClick={() => {
              setCandidateAvailabilityDrawerOpen(true);
            }}
          >
            Send Availability Link
          </Button>
          <Button
            size='sm'
            variant='outline'
            onClick={async () => {
              if (fetchingPlan) return;
              await findAvailibility({
                filters: initialFilters,
                dateRange: {
                  start_date: dayjsLocal().toISOString(),
                  end_date: dayjsLocal().add(7, 'day').toISOString(),
                },
              });
              setIsSelfScheduleDrawerOpen(true);
            }}
            disabled={fetchingPlan}
          >
            {fetchingPlan ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : null}
            Send SelfScheduling Link
          </Button>
        </div>
        <div className='flex justify-start'>
          <Button
            size='sm'
            variant='outline'
            onClick={() => {
              setEditTrigger('onRequestSchedule');
              setShowEditDialog(true);
            }}
          >
            <PlusCircle className='mr-2 h-4 w-4' />
            Add Ai Actions
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChooseScheduleMode;
