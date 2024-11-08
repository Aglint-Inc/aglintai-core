import { toast } from '@components/hooks/use-toast';

import type { ReadLocations } from '@/routers/tenant/location/read';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useTenantOfficeLocations = () => {
  const query = useProcedure();
  return {
    ...query,
    data: query.data! || [],
  };
};

const useProcedure = (): ProcedureQuery<ReadLocations> =>
  api.tenant.locations.useQuery();

export const useTenantOfficeLocationDeleteUsage = ({
  location_id,
}: {
  location_id: number;
}) => {
  const query = api.tenant.locationUsage.useQuery(
    { location_id },
    { enabled: !!location_id },
  );
  return { ...query, data: query.data! };
};
export const useTenantOfficeLocationDelete = () => {
  return api.tenant.deleteLocation.useMutation({
    onError: () =>
      toast({
        title: 'Unable to delete location',
        variant: 'destructive',
      }),
  });
};

export const useTenantOfficeLocationAdd = () => {
  return api.tenant.insertLocation.useMutation({
    onError: () =>
      toast({
        title: 'Unable to add location',
        variant: 'destructive',
      }),
  });
};

export const useTenantOfficeLocationUpdate = () => {
  return api.tenant.updateLocation.useMutation({
    onError: () =>
      toast({
        title: 'Unable to update location',
        variant: 'destructive',
      }),
  });
};
