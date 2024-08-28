import { useQuery, useQueryClient } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

export const useRequestNotes = ({ request_id }: { request_id: string }) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    initialData: [],
    queryKey: ['get_request_notes', request_id],
    queryFn: () => getRequestNotes(request_id),
    enabled: !!request_id,
    gcTime: 20000,
    refetchOnMount: true,
  });
  const refetch = () => {
    queryClient.invalidateQueries({
      queryKey: ['get_request_notes', request_id],
    });
  };
  return { ...query, refetch };
};

export async function getRequestNotes(request_id: string) {
  const { data } = await supabase
    .from('request_note')
    .select('*')
    .eq('request_id', request_id)
    .throwOnError();

  console.log(data);
  return data;
}
