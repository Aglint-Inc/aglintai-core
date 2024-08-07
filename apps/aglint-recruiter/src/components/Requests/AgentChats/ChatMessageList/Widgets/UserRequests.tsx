import { MetadataForFunction } from '@aglint/shared-types';

import { useUserChat } from '@/src/queries/userchat';

import RequestList, { RequestListProps } from '../../Components/RequestList';

function UserRequests({
  chat,
}: {
  chat: ReturnType<typeof useUserChat>['data'][0];
}) {
  const requests = chat.metadata as MetadataForFunction<'fetch_user_requests'>;
  const uiRequests: RequestListProps[] = requests.map((request) => {
    return {
      type: request.type,
      title: request.title,
      status: request.status,
      color:
        request.status === 'to_do'
          ? 'info'
          : request.status === 'completed'
            ? 'success'
            : request.status === 'blocked'
              ? 'error'
              : request.status === 'in_progress'
                ? 'warning'
                : 'neutral',
      link: '',
    };
  });

  return (
    <div>
      <RequestList requests={uiRequests} />
    </div>
  );
}

export default UserRequests;
