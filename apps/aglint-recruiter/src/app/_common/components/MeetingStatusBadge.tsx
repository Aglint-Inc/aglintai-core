'use client';
import { type DatabaseTable } from '@aglint/shared-types';
import { UIBadge } from '@components/ui-badge';
import React from 'react';

export function MeetingStatusBadge({
  status,
}: {
  status: DatabaseTable['interview_meeting']['status'] | null;
}) {
  return (
    <>
      {status === 'completed' ? (
        <UIBadge variant='success' textBadge={'Completed'} />
      ) : status === 'cancelled' ? (
        <UIBadge variant='destructive' textBadge={'Canceled'} />
      ) : status === 'not_scheduled' ? (
        <UIBadge variant='neutral' textBadge={'Not Scheduled'} />
      ) : status === 'waiting' ? (
        <UIBadge variant='warning' textBadge={'In Progress'} />
      ) : status === 'confirmed' ? (
        <UIBadge variant='info' textBadge={'Confirmed'} />
      ) : (
        ''
      )}
    </>
  );
}
