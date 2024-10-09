/* eslint-disable no-unused-vars */
import { EmptyState } from '@components/empty-state';
import { NotebookPen, Pen, Plus } from 'lucide-react';
import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import { UIButton } from '@/common/UIButton';
import UISectionCard from '@/common/UISectionCard';

import type { WorkingHour } from './ui/TimeList';
import { WorkTimeUI } from './ui/WorkTimeUI';
import { WorkTimeEditDialog } from './WorkTimeEditDialog';

// Define types for the component props

interface WorkTimeProps {
  workingHours: WorkingHour[];
  handleUpdate: (data: { workingHours: WorkingHour[] }) => Promise<void>;
  isUpdating: boolean;
}

const WorkTime: FC<WorkTimeProps> = ({
  workingHours,
  handleUpdate,
  isUpdating,
}) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isOpen, setIsOpen] = useState(false);

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
        handleUpdate={handleUpdate}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isUpdating={isUpdating}
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
              <Pen className='mr-2 h-3 w-3' /> Edit
              <span className='sr-only'>Edit Working Hours</span>
            </UIButton>
          )
        }
      >
        {currentWorkingDays?.length > 0 ? (
          <WorkTimeUI workingHours={workingHours} />
        ) : (
          <EmptyState
            icon={NotebookPen}
            header='No Working day yet'
            description='Add the company Working day'
            primarySlot={
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
