import { dayjsLocal } from '@aglint/shared-utils';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { Button } from '@components/ui/button';
import { Lightbulb, Loader2, WandSparkles } from 'lucide-react';

import { setCandidateAvailabilityDrawerOpen } from '@/components/Requests/ViewRequestDetails/CandidateAvailability/store';
import { useMeetingList } from '@/components/Requests/ViewRequestDetails/hooks';
import { useSelfSchedulingDrawer } from '@/components/Requests/ViewRequestDetails/SelfSchedulingDrawer/hooks';
import {
  initialFilters,
  setIsSelfScheduleDrawerOpen,
  useSelfSchedulingFlowStore,
} from '@/components/Requests/ViewRequestDetails/SelfSchedulingDrawer/store';

import { useRequestProgressProvider } from '../progressCtx';

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
        <Alert className='bg-purple-100 border border-purple-300'>
          <Lightbulb className='h-4 w-4' />
          <AlertTitle>Add Automations</AlertTitle>
          <AlertDescription>
            Streamline your workflow with Aglint AI automations.
            <div className='flex justify-end mt-4'>
              <div className='flex justify-start'>
                <Button
                  variant='outline'
                  onClick={() => {
                    setEditTrigger('onRequestSchedule');
                    setShowEditDialog(true);
                  }}
                >
                  <WandSparkles className='mr-2 h-4 w-4' />
                  Add Automation
                </Button>
              </div>

              {/* <Button
                className='mr-2'
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
                Send SelfScheduling
              </Button>
              <Button
                variant='default'
                onClick={() => {
                  setCandidateAvailabilityDrawerOpen(true);
                }}
              >
                Get Availability
              </Button> */}
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </>
  );
};

export default ChooseScheduleMode;
