import { RequestProvider } from '@/context/RequestContext';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';
import { ButtonSoft } from '@devlink2/ButtonSoft';
import { RequestsWrapper } from '@devlink2/RequestsWrapper';
import { Stack } from '@mui/material';
import { RequestCard } from '../_common/Components/RequestCard';
import RequestHistoryFilter from '../_common/Components/RequestHistoryFilter';
import {
  setCompletedMode,
  useCompletedRequestsStore,
} from '../_common/Context/store';
<<<<<<< HEAD
import { useCompletedRequests } from '../_common/hooks/useCompletedRequests';
=======
import { RequestProvider } from '@/context/RequestContext';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';
import RequestHistoryFilter from '../_common/components/RequestHistoryFilter';
import { RequestCard } from '../_common/Components/RequestCard';
>>>>>>> 29d7036c5711e9ba1a63bd406d7115ad181c6c96

function CompletedRequests({ openChat = false }: { openChat?: boolean }) {
  const { completedFilters } = useCompletedRequestsStore();
  const { data: completedRequests } = useCompletedRequests({
    completedFilters,
  });
  return (
    <RequestsWrapper
      slotFilter={
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          ml={!openChat ? '28px' : '0px'}
          width={'100%'}
        >
          <ButtonSoft
            size={1}
            color={'neutral'}
            isLeftIcon={true}
            iconName={'arrow_back'}
            textButton='Back'
            onClickButton={{
              onClick: () => {
                setCompletedMode(false);
              },
            }}
          />
          {<RequestHistoryFilter />}
        </Stack>
      }
      slotRequestSection={
        <>
          <>
            <div>{capitalizeFirstLetter('all_completed_requests')}</div>
            <div>
              {(completedRequests ?? []).map((props, i) => (
                <RequestProvider key={props.id ?? i} request_id={props.id}>
                  <RequestCard
                    {...{
                      ...props,
                      index: i,
                      isExpanded: false,
                    }}
                  />
                </RequestProvider>
              ))}
            </div>
          </>
        </>
      }
      slotNavigationPills={<></>}
    />
  );
}

export default CompletedRequests;
