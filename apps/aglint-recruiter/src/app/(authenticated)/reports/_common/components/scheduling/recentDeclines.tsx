'use client';
import React from 'react';

import { useRecentDeclines } from '../../hook/scheduling';
import GenericTable from '../genericTable';

function RecentDeclines() {
  const headers = [
    { key: 'name', label: 'Name' },
    { key: 'note', label: 'Descriptions' },
    // { key: 'training', label: 'Training' },
  ];
  //  profile_image: string;
  //  name: string;
  //  note: string;
  //  id: string;
  //  type:
  const { data, isPending } = useRecentDeclines();
  const recentDeclinesData = data ?? [];
  return (
    <GenericTable
      title='Recent Declines'
      headers={headers}
      data={recentDeclinesData}
      isLoading={isPending}
      emptyStateMessage='No Recent Decline data available'
    />
  );
}

export default RecentDeclines;
