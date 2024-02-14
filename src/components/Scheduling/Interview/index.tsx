import { useRouter } from 'next/router';

import {
  AddFilter,
  AllInterview,
  Breadcrum,
  ButtonDate,
  ButtonSchedule,
  ButtonStatus,
  PageLayout,
} from '@/devlink2';
import { getFullName } from '@/src/utils/jsonResume';
import { pageRoutes } from '@/src/utils/pageRouting';

import CreateDialog from './CreateDialog';
import FilterSearchField from './FilterSearchField';
import ListCard from './ListCard';
import SidePanel from './SidePanel';
import { useInterviewStore } from './store';

function InterviewComp() {
  const router = useRouter();
  const applicationList = useInterviewStore((state) => state.applicationList);

  const initialLoading = useInterviewStore((state) => state.initialLoading);
  const filter = useInterviewStore((state) => state.filter);

  const filterList = () => {
    if (!applicationList) return [];
    let list = applicationList;
    if (filter.textSearch) {
      list = list.filter((app) =>
        getFullName(app.candidates.first_name, app.candidates.last_name)
          .toLocaleLowerCase()
          .includes(filter.textSearch.toLocaleLowerCase()),
      );
    }

    if (filter.status) {
      list = list.filter((app) => app.status === filter.status);
    }

    if (filter.job_id) {
      list = list.filter((app) => app.job_id === filter.job_id);
    }

    if (filter.panel_id) {
      list = list.filter((app) => app.schedule.panel_id === filter.panel_id);
    }

    if (filter.dateRange) {
      list = list.filter((app) => {
        const date = new Date(app.schedule.schedule_time.startTime);
        return date >= filter.dateRange[0] && date <= filter.dateRange[1];
      });
    }

    if (filter.sortBy === 'asc') {
      list.sort(
        (a, b) =>
          new Date(a.schedule.schedule_time.startTime).getTime() -
          new Date(b.schedule.schedule_time.startTime).getTime(),
      );
    }

    if (filter.sortBy === 'desc') {
      list.sort(
        (a, b) =>
          new Date(b.schedule.schedule_time.startTime).getTime() -
          new Date(a.schedule.schedule_time.startTime).getTime(),
      );
    }
    return list;
  };

  return (
    <>
      <CreateDialog />
      <PageLayout
        slotTopbarLeft={
          <>
            <Breadcrum
              isLink
              onClickLink={{
                onClick: () => {
                  router.push(pageRoutes.SCHEDULING);
                },
              }}
            />
            <Breadcrum showArrow textName={'All Interviews'} />
          </>
        }
        slotBody={
          <AllInterview
            slotSidebar={<SidePanel />}
            slotSchedule={<ButtonSchedule />}
            slotAddFilter={<AddFilter />}
            slotDate={<ButtonDate />}
            slotSearch={<FilterSearchField />}
            slotStatus={<ButtonStatus />}
            slotAllInterviewCard={
              !initialLoading && (
                <>
                  {filterList().map((app) => {
                    return <ListCard key={app.id} app={app} />;
                  })}
                </>
              )
            }
          />
        }
      />
    </>
  );
}

export default InterviewComp;
