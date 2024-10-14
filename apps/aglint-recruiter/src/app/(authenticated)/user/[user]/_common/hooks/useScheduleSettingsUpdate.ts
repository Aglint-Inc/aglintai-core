import { type SchedulingSettingType } from '@aglint/shared-types';
import { type CustomSchedulingSettings } from '@aglint/shared-types/src/db/tables/common.types';
import { toast } from '@components/hooks/use-toast';

import { api } from '@/trpc/client';

import { useInterviewer } from './useInterviewer';

export const useScheduleSettingsUpdate = (field: string) => {
  const { data } = useInterviewer();
  const initialData = data.scheduling_settings;

  const { mutateAsync, isPending: isUpdating } =
    api.tenant.updateWithRole.useMutation({
      onError: () => {
        toast({
          title: 'Unable to update ' + field,
          variant: 'destructive',
        });
      },
    });
  const handleUpdate = async (updatedData: Partial<SchedulingSettingType>) => {
    const schedulingSettingObj = {
      ...initialData,
      ...updatedData,
    } as CustomSchedulingSettings;
    await mutateAsync({
      user_id: data.user_id,
      scheduling_settings: schedulingSettingObj,
    });
  };

  return { handleUpdate, isUpdating };
};
