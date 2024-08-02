import React from 'react';

import FilterHeader from '../../Common/FilterHeader';

function FilterAndSorting() {
  return (
    <FilterHeader
      search={{
        setValue: () => {},
        value: '',
        placeholder: 'Search',
      }}
      filters={[
        {
          type: 'filter',
          name: 'Job',
          iconname: 'work',
          options: [
            {
              id: 'software_developer',
              label: 'Software Developer',
            },
          ],
          setValue: () => {},
          value: [],
        },
        {
          type: 'filter',
          name: 'Status',
          iconname: 'filter_tilt_shift',
          options: [
            {
              id: 'to_do',
              label: 'To Do',
            },
            {
              id: 'in_progress',
              label: 'In Progress',
            },
            {
              id: 'blocked',
              label: 'Blocked',
            },
          ],
          setValue: () => {},
          value: [],
        },
      ]}
      sort={{
        sortOptions: {
          options: [
            {
              id: 'date',
              label: 'Date',
            },
            {
              id: 'status',
              label: 'Status',
            },
          ],
          order: [
            {
              id: 'asc',
              label: 'Ascending',
            },
            {
              id: 'desc',
              label: 'Descending',
            },
          ],
        },
        selected: {
          option: 'date',
          order: 'asc',
        },
        setOrder: () => {},
      }}
    />
  );
}

export default FilterAndSorting;
