export function formatRequestHeadingText(
  urgentCount: number,
  standardCount: number,
  dateString: string,
) {
  const urgentText =
    urgentCount > 0
      ? `${urgentCount} urgent request${urgentCount > 1 ? 's' : ''}`
      : '';
  const standardText =
    standardCount > 0
      ? `${standardCount} standard request${standardCount > 1 ? 's' : ''}`
      : '';

  let finalText = '';

  if (urgentText && standardText) {
    finalText = `${urgentText} and ${standardText} ${dateString}.`;
  } else if (urgentText) {
    finalText = `${urgentText} ${dateString}.`;
  } else if (standardText) {
    finalText = `${standardText} ${dateString}.`;
  } else {
    finalText = `No requests ${dateString}.`;
  }

  return 'You have ' + finalText;
}
