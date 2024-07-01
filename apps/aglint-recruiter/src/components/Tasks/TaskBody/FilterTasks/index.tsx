import { EmailAgentId, PhoneAgentId } from '@aglint/shared-utils';

import FilterHeader from '@/src/components/Common/FilterHeader';
import { useTasksContext } from '@/src/context/TasksContextProvider/TasksContextProvider';

function FilterTasks() {
  const { search, filter, handelSearch, handelFilter, handelResetFilter } =
    useTasksContext();

  function areValuesEmpty() {
    for (const key in filter) {
      if (
        // eslint-disable-next-line security/detect-object-injection
        Array.isArray(filter[key].values) &&
        // eslint-disable-next-line security/detect-object-injection
        filter[key].values.length !== 0
      ) {
        return true;
      }
    }
    return false;
  }
  return (
    <FilterHeader
      handelResetAll={handelResetFilter}
      isResetAll={areValuesEmpty()}
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
          name: 'Candidate',
          options: filter.candidate.options,
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
          name: 'Status',
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
        {
          type: 'filter',
          name: 'Priority',
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
          name: 'Assignee',
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
          name: 'Type',
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
