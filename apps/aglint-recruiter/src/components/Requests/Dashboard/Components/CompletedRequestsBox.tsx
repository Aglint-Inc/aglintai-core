
import { ReqCompleted } from '@/devlink2/ReqCompleted';
import { Text } from '@/devlink2/Text';
import { useRouterPro } from '@/src/hooks/useRouterPro';

function CompletedRequestsBox({
  completedRequest,
}: {
  completedRequest: any[];
}) {
  const { setQueryParams } = useRouterPro();
  return (
    <ReqCompleted
      isDetailListVisible={false}
      onClickArrow={{
        onClick: () => {
          setQueryParams({ tab: 'requests', query: 'completed' });
        },
      }}
      textTitle={
        <Text
          color={completedRequest.length ? 'success' : 'neutral'}
          content={
            completedRequest.length
              ? `${completedRequest?.length} Requests completed 🎉`
              : 'Looks like there is no completed requests 😴'
          }
        />
      }
      textDesc={
        Boolean(completedRequest.length) &&
        `View detailed list of completed requests`
      }
      slotTextwithIcon={<></>}
    />
  );
}

export default CompletedRequestsBox;
