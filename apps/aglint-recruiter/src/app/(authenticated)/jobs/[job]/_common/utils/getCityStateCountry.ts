import type { nestedObjectToArray } from '@/components/Common/FilterHeader/filters/utils';

export const getCityStateCountry = ({
  locations,
}: {
  locations: ReturnType<typeof nestedObjectToArray>;
}) => {
  return (locations ?? []).reduce(
    (acc, curr, i) => {
      let type: keyof typeof acc = 'country';
      switch (i) {
        case 0:
          type = 'country';
          break;
        case 1:
          type = 'state';
          break;
        case 2:
          type = 'city';
          break;
      }
      acc[type].push(
        ...curr.filter(({ status }) => status === 'active').map(({ id }) => id),
      );
      return acc;
    },
    { country: [], state: [], city: [] } as {
      country: string[];
      state: string[];
      city: string[];
    },
  );
};
