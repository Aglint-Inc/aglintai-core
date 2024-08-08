import { ReqCompleted } from '@/devlink2/ReqCompleted';
import { Text } from '@/devlink2/Text';
import { useRequests } from '@/src/context/RequestsContext';
import { useRouterPro } from '@/src/hooks/useRouterPro';

function CompletedRequestsBox({
  completedRequest,
}: {
  completedRequest: any[];
}) {
  const { setFilters, initialFilter } = useRequests();
  const { setQueryParams } = useRouterPro();
  return (
    <ReqCompleted
      isDetailListVisible={false}
      onClickArrow={{
        onClick: () => {
          setFilters({
            ...structuredClone(initialFilter),
            status: ['completed'],
          });
          setQueryParams({ tab: 'requests' });
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
