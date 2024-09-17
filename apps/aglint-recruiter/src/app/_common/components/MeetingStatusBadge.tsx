'use client';
import { type DatabaseTable } from '@aglint/shared-types';
import React from 'react';

import { UIBadge } from '@/components/Common/UIBadge';

export function MeetingStatusBadge({
  status,
}: {
  status: DatabaseTable['interview_meeting']['status'];
}) {
  return (
    <>
      {status === 'completed' ? (
        <UIBadge color='success' textBadge={'Completed'} />
      ) : status === 'cancelled' ? (
        <UIBadge color='error' textBadge={'Canceled'} />
      ) : status === 'not_scheduled' ? (
        <UIBadge color='neutral' textBadge={'Not Scheduled'} />
      ) : status === 'waiting' ? (
        <UIBadge color='warning' textBadge={'In Progress'} />
      ) : status === 'confirmed' ? (
        <UIBadge color='info' textBadge={'Confirmed'} />
      ) : (
        ''
      )}
    </>
  );
}
