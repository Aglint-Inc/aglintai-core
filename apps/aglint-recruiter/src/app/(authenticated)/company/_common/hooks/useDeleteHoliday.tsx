import { useToast } from '@components/hooks/use-toast';

import { api } from '@/trpc/client';

import { useTenant } from './useTenant';

export const useDeleteHoliday = () => {
  const { recruiter } = useTenant();
  const { toast } = useToast();
  const mutation = api.tenant.updateTenant.useMutation({
    onError: () =>
      toast({
        title: 'Unable to update holiday',
        variant: 'destructive',
      }),
  });
  const filter = (date: string) => {
    return recruiter.scheduling_settings.totalDaysOff.filter(
      (dayoff) => dayoff.date !== date,
    );
  };
  const mutate = (date: string) => {
    mutation.mutate({
      scheduling_settings: {
        ...recruiter.scheduling_settings,
        totalDaysOff: filter(date),
      },
    });
  };
  const mutateAsync = async (date: string) => {
    try {
      await mutation.mutateAsync({
        scheduling_settings: {
          ...recruiter.scheduling_settings,
          totalDaysOff: filter(date),
        },
      });
    } catch {
      //
    }
  };
  return { ...mutation, mutate, mutateAsync };
};
