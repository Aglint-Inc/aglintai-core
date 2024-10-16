import { toast } from '@components/hooks/use-toast';

import { type AvailableSlots } from '@/routers/candidate_availability/availableSlots';
import type { Create } from '@/routers/candidate_availability/create';
import type { Update } from '@/routers/candidate_availability/update';
import { type ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useRequestAvailabilityDetails = (
  input: AvailableSlots['input'],
): ProcedureQuery<AvailableSlots> =>
  api.candidate_availability.availableSlots.useQuery(input, {
    enabled: !!input.availability_id,
  });

export const useCreateCandidateAvailability = () => {
  const createMutation = api.candidate_availability.create.useMutation({
    onError: (e) => {
      toast({
        title: e.shape?.message,
      });
    },
  });
  const createRequestAvailability = async (payload: Create['input']) => {
    try {
      return await createMutation.mutateAsync(payload);
    } catch (error) {
      //
    }
  };

  return { ...createMutation, createRequestAvailability };
};

export const useUpdateCandidateAvailability = () => {
  const updateMutation = api.candidate_availability.update.useMutation({
    onError: (e) => {
      toast({
        title: e.shape?.message,
      });
    },
  });
  const updateRequestAvailability = (payload: Update['input']) => {
    if (payload.id) {
      updateMutation.mutate({
        ...payload,
      });
    } else {
      () => {};
    }
  };
  return { ...updateMutation, updateRequestAvailability };
};
