import { Stack } from '@mui/material';

import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { RequestsWrapper } from '@/devlink2/RequestsWrapper';

// import { useRouterPro } from '@/src/hooks/useRouterPro';
import { sectionDefaultsData } from '../RequestSections';
import Section from '../RequestSections/Section';
import FilterAndSorting from './FiltersAndSorting';
import { useCompletedRequests } from './hooks';
import { setCompletedMode, useCompletedRequestsStore } from './store';

function CompletedRequests({ openChat = false }: { openChat?: boolean }) {
  // const { setQueryParams } = useRouterPro();
  const { completedFilters } = useCompletedRequestsStore();
  const { data: completedRequests, status } = useCompletedRequests({
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
          {<FilterAndSorting />}
        </Stack>
      }
      slotRequestSection={
        <Section
          requests={completedRequests ? [...completedRequests] : []}
          sectionName={'all_completed_requests'}
          sectionIconName={sectionDefaultsData[5].sectionIconName}
          color={sectionDefaultsData[5].color}
          isLoadingRequests={status === 'pending'}
          showEmptyMessage={completedRequests?.length === 0}
        />
      }
      slotNavigationPills={<></>}
    />
  );
}

export default CompletedRequests;
