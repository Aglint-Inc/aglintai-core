const slotsList = Array.from({ length: 10 }, (_, index) => {
  const day = index + 1;
  const label = day === 1 ? `${day} Slot` : `${day} Slots`;
  return { label: label, value: day };
});
export const SLOTS_LIST = slotsList;
