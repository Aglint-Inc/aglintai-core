import { toast } from '@components/hooks/use-toast';

import { api } from '@/trpc/client';
import { Create } from '@/routers/candidate_availability/create';
import { Update } from '@/routers/candidate_availability/update';

export const useRequestAvailabilityDetails =
  api.candidate_availability.availableSlots.useQuery;

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
