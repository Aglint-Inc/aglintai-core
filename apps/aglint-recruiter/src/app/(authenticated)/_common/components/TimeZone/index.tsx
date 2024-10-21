/* eslint-disable no-unused-vars */
import type { SchedulingSettingType } from '@aglint/shared-types';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Clock, Pen } from 'lucide-react';
import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import TimezonePicker from '@/common/TimezonePicker';
import { UIButton } from '@/common/UIButton';
import UISectionCard from '@/common/UISectionCard';
import { type TimezoneObj } from '@/utils/timeZone';

interface TimeZoneProps {
  timeZone: TimezoneObj | null;
  handleUpdate: (data: Partial<SchedulingSettingType>) => Promise<void>;
  isUpdating: boolean;
}

const TimeZone: FC<TimeZoneProps> = ({
  timeZone,
  handleUpdate,
  isUpdating,
}) => {
  const [localTimeZone, setLocalTimeZone] = useState<TimezoneObj>(timeZone!);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleUpdateAndClose = async () => {
    // @ts-ignore
    await handleUpdate({ timeZone: localTimeZone });
    setIsPopoverOpen(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <UISectionCard
      title='Time Zone'
      isHoverEffect={!isPopoverOpen}
      description='Set the default time zone for your company.'
      action={
        <Popover
          open={isPopoverOpen}
          onOpenChange={() => {
            if (!isUpdating && isPopoverOpen) setIsPopoverOpen(false);
          }}
        >
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              size='sm'
              onClick={() => {
                if (!isUpdating) setIsPopoverOpen(true);
              }}
            >
              <Pen className='mr-2 h-3 w-3' /> Edit
              <span className='sr-only'>Edit Time Zone</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-full' align='start' side='left'>
            <div className='flex w-[300px] flex-col gap-4'>
              <Label>Time Zone</Label>
              <TimezonePicker
                value={localTimeZone?.tzCode || timeZone?.tzCode}
                onChange={(value) => setLocalTimeZone(value)}
                width={'300'}
              />
              <UIButton
                className='w-full'
                onClick={handleUpdateAndClose}
                isLoading={isUpdating}
              >
                Update
              </UIButton>
            </div>
          </PopoverContent>
        </Popover>
      }
    >
      <div className='flex items-center space-x-2'>
        <div>
          <div className='flex items-center space-x-2'>
            <Clock className='h-4 w-4 text-muted-foreground' />
            <p>{timeZone?.label ?? '-'}</p>
          </div>
        </div>
      </div>
    </UISectionCard>
  );
};

export default TimeZone;
