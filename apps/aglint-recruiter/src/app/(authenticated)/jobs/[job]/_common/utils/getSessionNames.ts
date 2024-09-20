import type { nestedObjectToArray } from '@/components/Common/FilterHeader/filters/utils';

export const getSessionNames = ({
  stages,
}: {
  stages: ReturnType<typeof nestedObjectToArray>;
}) => {
  return (stages?.[1] ?? []).map(({ id }) => id);
};
