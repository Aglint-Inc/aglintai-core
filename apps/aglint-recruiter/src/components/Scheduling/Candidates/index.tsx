import { AllInterview } from '@/devlink2/AllInterview';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import AllList from './AllList';
import { useFilterCandidateStore } from './filter-store';
import AllFilters from './Filters';
import { useAllInterviewSchedules } from './queries/hooks';
import SlotPagination from './SlotPagination';

function AllSchedules() {
  const { recruiter } = useAuthDetails();
  const filter = useFilterCandidateStore((state) => state.filter);
  const pagination = useFilterCandidateStore((state) => state.pagination);

  const {
    isPending,
    isError,
    data: applicationList,
    isFetching,
    isLoading,
  } = useAllInterviewSchedules({
    filter,
    page: pagination.page,
    rec_id: recruiter.id,
  });

  return (
    <>
      <AllInterview
        isSchedulerTable={true}
        slotPagination={
          <SlotPagination
            applicationList={applicationList}
            isFetching={isFetching}
            isPending={isPending}
            isLoading={isLoading}
          />
        }
        slotAddFilter={''}
        slotFilterButton={<AllFilters />}
        slotAllInterviewCard={
          <AllList
            isPending={isPending}
            applicationList={applicationList}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
          />
        }
      />
    </>
  );
}

export default AllSchedules;
