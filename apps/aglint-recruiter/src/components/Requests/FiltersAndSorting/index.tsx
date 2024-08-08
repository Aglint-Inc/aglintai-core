/* eslint-disable security/detect-object-injection */
import { useMemo } from 'react';

import { useRequests } from '@/src/context/RequestsContext';
import { GetRequestParams } from '@/src/queries/requests';

import FilterHeader from '../../Common/FilterHeader';

const options: Partial<GetRequestParams['filters']> = {
  status: ['blocked', 'completed', 'in_progress', 'to_do'],
  type: [
    'schedule_request',
    'cancel_schedule_request',
    'decline_request',
    'reschedule_request',
  ],
};

const sortOptions: GetRequestParams['sort']['type'][] = ['created_at', 'title'];

function FilterAndSorting() {
  const {
    filters: { is_new, title, created_at, end_at, ...filters },
    sort: { order, type },
    setFilters,
    setSort,
  } = useRequests();

  const safeOptions = useMemo(
    () =>
      Object.keys(filters).reduce(
        (acc, curr) => {
          const safeKey = curr as keyof typeof filters;
          let value;
          switch (safeKey) {
            case 'status':
              value = options.status;
              break;
            case 'type':
              value = options.type;
              break;
          }
          acc[safeKey] = value;
          return acc;
        },
        {} as typeof filters,
      ),
    [options, filters],
  );

  const safeFilters: Parameters<typeof FilterHeader>[0]['filters'] =
    Object.entries(filters).map(
      ([key, value]) =>
        ({
          active: value.length,
          name: key,
          value: value ?? [],
          type: 'filter',
          iconname: '',
          icon: <></>,
          setValue: (newValue: typeof value) =>
            setFilters((prev) => ({ ...prev, [key]: newValue })),
          options: safeOptions[key] ?? [],
        }) as (typeof safeFilters)[number],
    );

  const isNewButton: Parameters<typeof FilterHeader>[0]['filters'][number] = {
    type: 'button',
    isActive: is_new,
    isVisible: true,
    name: 'New Requests',
    onClick: () => setFilters((prev) => ({ ...prev, is_new: !is_new })),
  };

  const safeSort: Parameters<typeof FilterHeader>[0]['sort'] = {
    sortOptions: {
      options: sortOptions,
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
      option: type,
      order: order,
    },
    setOrder: (payload) =>
      setSort((prev) => ({ ...prev, ...(payload as typeof prev) })),
  } as typeof safeSort;

  return (
    <FilterHeader
      layoutMode='left-align'
      filters={[isNewButton, ...safeFilters]}
      dateRangeSelector={{
        disablePast: false,
        name: 'Created At',
        values: [created_at, end_at].filter(Boolean),
        setValue: (value) =>
          setFilters((prev) => ({
            ...prev,
            created_at: value?.[0] ?? '',
            end_at: value?.[1] ?? value?.[0] ?? '',
          })),
      }}
      // sort={safeSort}
      search={{
        value: title,
        setValue: (newValue: typeof title) =>
          setFilters((prev) => ({ ...prev, title: newValue })),
        placeholder: 'Search Requests',
      }}
    />
  );
}

export default FilterAndSorting;
