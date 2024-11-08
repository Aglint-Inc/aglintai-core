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
  api.tenant.readLocations.useQuery();

export const useTenantOfficeLocationDelete = () => {
  return api.tenant.deleteLocation.useMutation();
};

export const useTenantOfficeLocationDeleteUsage = ({
  location_id,
}: {
  location_id: number;
}) => {
  const query = api.tenant.deleteLocationUsage.useQuery(
    { location_id },
    { enabled: !!location_id },
  );
  return { ...query, data: query.data! };
};

export const useTenantOfficeLocationAdd = () => {
  return api.tenant.insertLocation.useMutation();
};

export const useTenantOfficeLocationUpdate = () => {
  return api.tenant.updateLocation.useMutation();
};
