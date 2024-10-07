export function convertTimeZoneToAbbreviation(sourceTimeZone: string) {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: sourceTimeZone,
    timeZoneName: 'short',
  });
  const timeZoneAbbreviation =
    formatter.formatToParts(date).find((part) => part.type === 'timeZoneName')
      ?.value || '';

  const abbreviationMapping: { [key: string]: string } = {
    'GMT+5:30': 'IST',
    'GMT+9:30': 'ACST',
  };
  return abbreviationMapping[timeZoneAbbreviation] || timeZoneAbbreviation;
}
