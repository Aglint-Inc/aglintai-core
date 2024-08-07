import { MetadataForFunction } from '@aglint/shared-types';

import { useUserChat } from '@/src/queries/userchat';

import RequestList, { RequestListProps } from '../../Components/RequestList';
import { CallBackAll } from '@aglint/shared-utils';

function UserRequests({
  chat,
}: {
  chat: ReturnType<typeof useUserChat>['data'][0];
}) {
  const meta = chat.metadata as CallBackAll[];
  const requests = meta.findLast(
    (m) => m.function_name === 'fetch_user_requests',
  )?.payload;
  const uiRequests: RequestListProps[] = requests?.map((request) => {
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
    <>
      <RequestList requests={uiRequests} />
    </>
  );
}

export default UserRequests;
