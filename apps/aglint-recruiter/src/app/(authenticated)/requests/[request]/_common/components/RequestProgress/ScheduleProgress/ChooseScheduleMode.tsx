import { Button } from '@components/ui/button';
import { UIAlert } from '@components/ui-alert';
import { WandSparkles } from 'lucide-react';

import { useRequestProgressProvider } from '../progressCtx';

const ChooseScheduleMode = () => {
  const { setTriggerDetails, setShowEditDialog } = useRequestProgressProvider();
  return (
    <>
      <div className='flex flex-col gap-4'>
        <UIAlert variant='tip' title='Add Automation'>
          Streamline your workflow with Aglint AI automation.
          <div className='mt-4 flex justify-end'>
            <div className='flex justify-start'>
              <Button
                variant='outline'
                onClick={() => {
                  setTriggerDetails({
                    trigger: 'onRequestSchedule',
                    interval: 0,
                  });
                  setShowEditDialog(true);
                }}
              >
                <WandSparkles className='mr-2 h-4 w-4' />
                Add Automation
              </Button>
            </div>
          </div>
        </UIAlert>
      </div>
    </>
  );
};

export default ChooseScheduleMode;
