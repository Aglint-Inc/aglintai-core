'use client';
import React from 'react';

import { useRecentReschedule } from '../../hook/scheduling';
import GenericTable from '../genericTable';

function RecentReschedules() {
  const headers = [
    { key: 'name', label: 'Name' },
    { key: 'note', label: 'Descriptions' },
  ];
  const { data, isPending } = useRecentReschedule();
  const recentReschedulesData = data ?? [];

  return (
    <GenericTable
      title='Recent Reschedules'
      headers={headers}
      data={recentReschedulesData}
      isLoading={isPending}
      emptyStateMessage='No Recent Reschedules data available'
    />
  );
}

export default RecentReschedules;
