import { Request } from '@/src/queries/requests/types';

export function formatSessionsName(sessions: string[]) {
  if (sessions.length === 0) {
    return '';
  } else if (sessions.length === 1) {
    return sessions[0];
  } else {
    return (
      sessions.slice(0, -1).join(', ') + ' and ' + sessions[sessions.length - 1]
    );
  }
}

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
