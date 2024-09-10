export const DURATION_OPTIONS: readonly { name: string; value: number }[] = [
  {
    name: 'No delay',
    value: 0,
  },
  {
    name: '30 mins',
    value: 30,
  },
  {
    name: '1 hour',
    value: 60,
  },
  {
    name: '2 hours',
    value: 120,
  },
  {
    name: '1 day',
    value: 1440,
  },
] as const;
