import { EmailAgentId, PhoneAgentId } from '@aglint/shared-utils';

import FilterHeader from '@/src/components/Common/FilterHeader';
import { useTasksContext } from '@/src/context/TasksContextProvider/TasksContextProvider';

function FilterTasks() {
  const {
    search,
    filter,
    handelSearch,
    handelFilter,
    handelResetFilter
  } = useTasksContext();
  // const allResetShow = !!Object.values(filter)
  //   .map((ele) => ele.values)
  //   .flat().length;

  return (
    <FilterHeader
      handelResetAll={handelResetFilter}
      isResetAll={true}

      search={{
        value: search,
        setValue: (e) => {
          handelSearch(e);
        },
        placeholder: 'Search candidates.',
      }}
      filters={[
        {
          type: 'filter',
          name: 'Assignee',
          filterSearch: true,
          iconname: 'account_circle',
          searchPlaceholder: 'Search Assignee',
          options: [
            { header: 'Agents', options: agentsDetails },
            { header: 'Members', options: filter.assignee.options },
          ],
          setValue: (val) => {
            const preData =
              JSON.parse(localStorage.getItem('taskFilters')) || {};
            preData.Assignee = [...val];
            localStorage.setItem('taskFilters', JSON.stringify(preData));
            handelFilter({
              ...filter,
              assignee: { ...filter.assignee, values: val },
            });
          },
          value: filter.assignee.values,
        },
        {
          type: 'filter',
          name: 'Job',
          filterSearch: true,
          iconname: 'work',
          searchPlaceholder: 'Search Job',
          options: filter.jobTitle.options,
          setValue: (val) => {
            const preData =
              JSON.parse(localStorage.getItem('taskFilters')) || {};
            preData.Job = [...val];
            localStorage.setItem('taskFilters', JSON.stringify(preData));
            handelFilter({
              ...filter,
              jobTitle: { ...filter.jobTitle, values: val },
            });
          },
          value: filter.jobTitle.values,
        },
        {
          type: 'filter',
          name: 'Candidate',
          options: filter.candidate.options,
          filterSearch: true,
          iconname: 'person',
          searchPlaceholder: 'Search candidates',
          setValue: (val) => {
            const preData =
              JSON.parse(localStorage.getItem('taskFilters')) || {};
            preData.Candidate = [...val];
            localStorage.setItem('taskFilters', JSON.stringify(preData));
            handelFilter({
              ...filter,
              candidate: { ...filter.candidate, values: val },
            });
          },
          value: filter.candidate.values,
        },

        {
          type: 'filter',
          name: 'Type',
          iconname: 'arrow_drop_down_circle',
          options: filter.type.options,
          setValue: (val) => {
            const preData =
              JSON.parse(localStorage.getItem('taskFilters')) || {};
            preData.Type = [...val];
            localStorage.setItem('taskFilters', JSON.stringify(preData));
            handelFilter({
              ...filter,
              type: { ...filter.type, values: val },
            });
          },
          value: filter.type.values,
        },
        {
          type: 'filter',
          name: 'Priority',
          iconname: 'arrow_drop_down_circle',
          options: filter.priority.options,
          setValue: (val) => {
            const preData =
              JSON.parse(localStorage.getItem('taskFilters')) || {};
            preData.Priority = [...val];
            localStorage.setItem('taskFilters', JSON.stringify(preData));
            handelFilter({
              ...filter,
              priority: { ...filter.priority, values: val },
            });
          },
          value: filter.priority.values,
        },
        {
          type: 'filter',
          name: 'Status',
          iconname: 'filter_tilt_shift',
          options: filter.status.options,
          setValue: (val) => {
            const preData =
              JSON.parse(localStorage.getItem('taskFilters')) || {};
            preData.Status = [...val];
            localStorage.setItem('taskFilters', JSON.stringify(preData));
            handelFilter({
              ...filter,
              status: { ...filter.status, values: val },
            });
          },
          value: filter.status.values,
        },
      ]}
      dateRangeSelector={{
        name: 'Interview Date',
        values: filter.date.values,
        setValue: (val) => {
          const preData = JSON.parse(localStorage.getItem('taskFilters')) || {};
          preData.Date = [...val];
          localStorage.setItem('taskFilters', JSON.stringify(preData));
          handelFilter({
            ...filter,
            date: { ...filter.date, values: val },
          });
        },
      }}
    />
  );
}

export default FilterTasks;
export const agentsDetails = [
  {
    id: EmailAgentId,
    label: 'Email',
  },
  {
    id: PhoneAgentId,
    label: 'Phone',
  },
];
