import { ReqCompleted } from '@devlink2/ReqCompleted';

import { useRequests } from '@/context/RequestsContext';
import { useRouterPro } from '@/hooks/useRouterPro';
import { Label } from '@components/ui/label';

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
        <Label
          className={`${completedRequest ? 'text-green-500' : 'text-gray-500'}`}
        >
          {status === 'success' && !completedRequest
            ? `Looks like there is no completed requests 😴`
            : `Today ${completedRequest} Requests completed🎉`}
        </Label>
      }
    />
  );
}

export default CompletedRequestsBox;
