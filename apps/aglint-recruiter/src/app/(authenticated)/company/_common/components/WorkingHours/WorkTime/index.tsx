/* eslint-disable no-unused-vars */
import { Edit, NotebookPen, Plus } from 'lucide-react';
import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { UIButton } from '@/components/Common/UIButton';
import UISectionCard from '@/components/Common/UISectionCard';

import type { WorkingHour } from './ui/TimeList';
import { WorkTimeUI } from './ui/WorkTimeUI';
import { WorkTimeEditDialog } from './WorkTimeEditDialog';

// Define types for the component props

interface WorkTimeProps {
  workingHours: WorkingHour[];
  setWorkingHours: Dispatch<SetStateAction<WorkingHour[]>>;
  handleUpdate: (data: { workingHours: WorkingHour[] }) => Promise<void>;
}

const WorkTime: FC<WorkTimeProps> = ({
  workingHours,
  setWorkingHours,
  handleUpdate,
}) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdateAndClose = async () => {
    await handleUpdate({ workingHours });
    setIsOpen(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const currentWorkingDays = workingHours.filter((wh) => wh.isWorkDay);
  return (
    <>
      <WorkTimeEditDialog
        handleUpdateAndClose={handleUpdateAndClose}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setWorkingHours={setWorkingHours}
        workingHours={workingHours}
      />
      <UISectionCard
        title='Working Hours'
        description="Set your company's operational hours for each day of the week."
        action={
          currentWorkingDays?.length > 0 && (
            <UIButton
              variant='outline'
              size='sm'
              onClick={() => setIsOpen(true)} 
            >
              <Edit className='mr-2 h-3 w-3' /> Edit
              <span className='sr-only'>Edit Working Hours</span>
            </UIButton>
          )
        }
      >
        {currentWorkingDays?.length > 0 ? (
          <WorkTimeUI workingHours={workingHours} />
        ) : (
          <GlobalEmpty
            icon={
              <NotebookPen
                strokeWidth={2}
                className='h-6 w-6 text-muted-foreground'
              />
            }
            header='No Working day yet'
            description='Add the company Working day'
            primaryAction={
              <UIButton
                className='mb-2 w-full'
                leftIcon={<Plus />}
                onClick={() => setIsOpen(true)}
              >
                Add Working Day
              </UIButton>
            }
          />
        )}
      </UISectionCard>
    </>
  );
};

export default WorkTime;
