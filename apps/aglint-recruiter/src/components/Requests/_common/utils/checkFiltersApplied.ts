import { type GetRequestParams } from '@/queries/requests';

export function checkFiltersApplied({
  filters,
}: {
  filters: GetRequestParams['filters'];
}) {
  return (
    filters.is_new ||
    filters.status.length ||
    filters.type.length ||
    filters.title ||
    filters.created_at ||
    filters.jobs.length ||
    filters.applications.length ||
    filters.assigneeList.length ||
    filters.assignerList.length
  );
}
