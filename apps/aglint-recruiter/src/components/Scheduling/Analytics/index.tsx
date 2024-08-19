import { useSchedulingAnalytics } from '@/src/context/SchedulingAnalytics';
import { SafeObject } from '@/src/utils/safeObject';

export const Analytics = () => {
  const value = useSchedulingAnalytics();
  return (
    <>
      {JSON.stringify(
        SafeObject.entries(value).reduce((acc, [key, value]) => {
          acc[key] = value.data;
          return acc;
        }, {}),
      )}
    </>
  );
};
