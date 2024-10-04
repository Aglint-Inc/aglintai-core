import RequestList, {
  type RequestListProps,
} from '../../Components/RequestList';
import { type ChatType } from '../hooks/fetch';

function UserRequests({ chat }: { chat: ChatType }) {
  const meta = chat.metadata;
  const requests =
    meta?.findLast((m) => m.function_name === 'fetch_user_requests')?.payload ||
    [];
  const uiRequests: RequestListProps[] = requests.map((request) => {
    return {
      type: request.type,
      title: request.title,
      status: request.status,
      color:
        request.status === 'to_do'
          ? 'purple'
          : request.status === 'completed'
            ? 'success'
            : request.status === 'blocked'
              ? 'error'
              : request.status === 'in_progress'
                ? 'info'
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
