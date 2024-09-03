import { useMutation, useQuery } from '@tanstack/react-query';

import { type GreenhouseAPI } from '@/src/app/api/integrations/greenhouse/type';
import axios from '@/src/client/axios';

export function useGreenhouseDetails() {
  const query = useQuery({
    queryKey: ['integrations', 'greenhouse'],
    queryFn: getGreenhouseDetails,
  });
  const { mutateAsync } = useMutation({
    mutationKey: ['integrations', 'greenhouse'],
    mutationFn: setGreenhouseDetails,
    onSuccess: () => {
      query.refetch();
    },
  });
  return { ...query, setOptions: mutateAsync };
}

async function getGreenhouseDetails() {
  const res = await axios.call<GreenhouseAPI['GET']>(
    'GET',
    '/api/integrations/greenhouse',
    null,
  );
  return res || ({} as typeof res);
}

async function setGreenhouseDetails(data: GreenhouseAPI['POST']['request']) {
  const res = await axios.call<GreenhouseAPI['POST']>(
    'POST',
    '/api/integrations/greenhouse',
    data,
  );
  return res;
}
