/* eslint-disable no-unused-vars */
import { Edit } from 'lucide-react';
import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import { SectionCard } from '@/authenticated/components/SectionCard';
import { UIButton } from '@/components/Common/UIButton';

import { WorkTimeEditDialog } from './Dialog/WorkTimeEditDialog';
import { WorkTimeUI } from './ui/WorkTimeUI';

// Define types for the component props
interface TimeRange {
  startTime: string;
  endTime: string;
}

interface WorkingHour {
  day: string;
  isWorkDay: boolean;
  timeRange: TimeRange;
}

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

  return (
    <>
      <WorkTimeEditDialog
        handleUpdateAndClose={handleUpdateAndClose}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setWorkingHours={setWorkingHours}
        workingHours={workingHours}
      />
      <SectionCard
        title='Working Hours'
        description="Set your company's operational hours for each day of the week."
        topAction={
          <UIButton variant='outline' size='sm' onClick={() => setIsOpen(true)}>
            <Edit className='h-3 w-3' />
            <span className='sr-only'>Edit Working Hours</span>
          </UIButton>
        }
      >
        <WorkTimeUI workingHours={workingHours} />
      </SectionCard>
    </>
  );
};

export default WorkTime;
