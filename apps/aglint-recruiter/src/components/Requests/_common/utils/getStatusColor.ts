import { Request } from '@/queries/requests/types';

export function getStatusColor({ status }: { status: Request['status'] }) {
  return status === 'to_do'
    ? 'purple'
    : status === 'in_progress'
      ? 'info'
      : status === 'blocked'
        ? 'error'
        : status === 'completed'
          ? 'success'
          : 'neutral';
}
