'use client';
import React from 'react';

import { useInterviewTypes } from '../../hook/scheduling';
import GenericTable from '../genericTable';

function InterviewType() {
  const headers = [
    { key: 'name', label: 'Name' },
    { key: 'qualified', label: 'Qualified' },
    { key: 'training', label: 'Training' },
  ];

  const { data, isPending } = useInterviewTypes();
  return (
    <GenericTable
      title='Interview Type'
      headers={headers}
      data={data!}
      isLoading={isPending}
      emptyStateMessage='No interview data available'
    />
  );
}

export default InterviewType;
