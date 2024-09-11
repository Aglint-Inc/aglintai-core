import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';

import { useRequestAvailabilityContext } from '../../RequestAvailabilityContext';
import AvailableSlots from '../AvailableSlots';

function DateSlotsPoPup() {
  const { openDaySlotPopup, setOpenDaySlotPopup } =
    useRequestAvailabilityContext();
  const handleClose = () => setOpenDaySlotPopup(null);
  return (
    <Dialog open={openDaySlotPopup !== null} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-[1000px]'>
        <DialogHeader>
          <DialogTitle>Available Slots</DialogTitle>
        </DialogHeader>
        <AvailableSlots singleDay={false} />
      </DialogContent>
    </Dialog>
  );
}

export default DateSlotsPoPup;
