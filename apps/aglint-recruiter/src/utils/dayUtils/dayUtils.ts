const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
export const getDayFormate = (dateX: string) => {
  const now = new Date();
  const date = new Date(dateX);
  if (date.toDateString() === now.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else {
    // Format the date as you like (e.g., "MM/DD/YYYY")
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }
};
