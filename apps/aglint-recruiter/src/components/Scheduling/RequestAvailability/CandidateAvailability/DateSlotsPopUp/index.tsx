import UIDialog from '@/components/Common/UIDialog';

import { useRequestAvailabilityContext } from '../../RequestAvailabilityContext';
import AvailableSlots from '../AvailableSlots';

function DateSlotsPoPup() {
  const { openDaySlotPopup, setOpenDaySlotPopup } =
    useRequestAvailabilityContext();
  const handleClose = () => setOpenDaySlotPopup(null);
  return (
    <UIDialog
      open={openDaySlotPopup !== null}
      onClose={handleClose}
      title='Available Slots'
      size='xl'
      slotButtons={<></>}
    >
      <AvailableSlots singleDay={false} />
    </UIDialog>
  );
}

export default DateSlotsPoPup;
