import { type DatabaseTable } from '@aglint/shared-types';
import { DAYJS_FORMATS, dayjsLocal } from '@aglint/shared-utils';
import React from 'react';

const CandAvailRecived = (d: DatabaseTable['request_progress']) => {
  return (
    <p className='text-sm'>
      Received on{' '}
      {dayjsLocal(d.created_at).format(DAYJS_FORMATS.DATE_FORMAT)}
    </p>
  );
};

export default CandAvailRecived;
