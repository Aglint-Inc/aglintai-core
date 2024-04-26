import React from 'react';

import { FilterHeader } from '@/src/context/Tasks/Filters/FilterHeader';
import { useTasksContext } from '@/src/context/TasksContextProvider/TasksContextProvider';

import { agentsDetails } from '../../utils';

function FilterTasks() {
  const { search, filter, handelSearch, handelFilter } = useTasksContext();

  return (
    <FilterHeader
      search={{
        value: search,
        setValue: (e) => {
          handelSearch(e);
        },
        placeholder: "Search by candidate's name or job title",
      }}
      filters={[
        {
          type: 'filter',
          name: 'Priority',
          options: filter.priority.options,
          setValue: (val) => {
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
          options: filter.status.options,
          setValue: (val) => {
            handelFilter({
              ...filter,
              status: { ...filter.status, values: val },
            });
          },
          value: filter.status.values,
        },
        {
          type: 'filter',
          name: 'Assignee',
          options: [
            { header: 'Agents', options: agentsDetails },
            { header: 'Members', options: filter.assignee.options },
          ],
          setValue: (val) => {
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
            handelFilter({
              ...filter,
              jobTitle: { ...filter.jobTitle, values: val },
            });
          },
          value: filter.jobTitle.values,
        },
      ]}
    />
  );
}

export default FilterTasks;
