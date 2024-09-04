import { ReqCompleted } from '@devlink2/ReqCompleted';
import { Text } from '@devlink2/Text';

import { useRequests } from '@/context/RequestsContext';
import { useRouterPro } from '@/hooks/useRouterPro';

function CompletedRequestsBox({
  completedRequest,
  status,
}: {
  completedRequest: number;
  status: 'pending' | 'success' | 'error';
}) {
  const { setSections, initialSections } = useRequests();
  const { setQueryParams } = useRouterPro();
  return (
    <ReqCompleted
      onClickCompleted={{
        onClick: () => {
          setSections({ ...initialSections, completed_request: true });
          setQueryParams({ tab: 'requests', section: 'completed_request' });
        },
      }}
      textTitle={
        <Text
          color={completedRequest ? 'success' : 'neutral'}
          content={
            status === 'success' && !completedRequest
              ? `Looks like there is no completed requests 😴`
              : `Today ${completedRequest} Requests completed🎉`
          }
        />
      }
    />
  );
}

export default CompletedRequestsBox;
