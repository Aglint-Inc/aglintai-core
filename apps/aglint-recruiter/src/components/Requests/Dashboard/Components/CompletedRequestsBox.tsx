import { ReqCompleted } from '@/devlink2/ReqCompleted';
import { Text } from '@/devlink2/Text';
import { useRouterPro } from '@/src/hooks/useRouterPro';

function CompletedRequestsBox({
  completedRequest,
  status,
}: {
  completedRequest: number;
  status: 'pending' | 'success' | 'error';
}) {
  const { setQueryParams } = useRouterPro();
  return (
    <ReqCompleted
      onClickCompleted={{
        onClick: () => {
          setQueryParams({ tab: 'requests', section: 'completed' });
        },
      }}
      textTitle={
        <Text
          color={completedRequest ? 'success' : 'neutral'}
          content={
            status === 'success' && !completedRequest
              ? `Looks like there is no completed requests 😴`
              : `${completedRequest} Requests completed 🎉`
          }
        />
      }
    />
  );
}

export default CompletedRequestsBox;
