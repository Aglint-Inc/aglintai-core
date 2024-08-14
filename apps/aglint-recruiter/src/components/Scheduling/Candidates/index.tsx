import { Stack } from '@mui/material';

import { AllInterview } from '@/devlink2/AllInterview';
import { Breadcrum } from '@/devlink2/Breadcrum';
import { PageLayout } from '@/devlink2/PageLayout';

import AllList from './AllList';
import AllFilters from './Filters';

function AllCandidatesScheduling() {
  return (
    <>
      <PageLayout
        slotTopbarLeft={<Breadcrum textName={'Candidates'} />}
        slotBody={
          <AllInterview
            isSchedulerTable={true}
            slotAddFilter={''}
            slotFilterButton={<AllFilters />}
            slotAllInterviewCard={
              <Stack overflow={'hidden'}>
                <AllList />
              </Stack>
            }
          />
        }
      />
    </>
  );
}

export default AllCandidatesScheduling;
