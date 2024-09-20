const daysList = Array.from({ length: 10 }, (_, index) => {
  const day = index + 1;
  const label = day === 1 ? `${day} Day` : `${day} Days`;
  return { label: label, value: day };
});
export const DAYS_LIST = daysList;
