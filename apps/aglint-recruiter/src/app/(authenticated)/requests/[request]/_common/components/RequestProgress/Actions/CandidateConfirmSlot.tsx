import { type DatabaseTable } from '@aglint/shared-types';
import { DAYJS_FORMATS, dayjsLocal } from '@aglint/shared-utils';
import React from 'react';

const CandidateConfirmSlot = (rowData: DatabaseTable['request_progress']) => {
  return (
    <>
      <p className='text-sm'>
        Candidate Confirmed on{' '}
        {dayjsLocal(rowData.created_at).format(DAYJS_FORMATS.DATE_FORMAT)}
      </p>
    </>
  );
};

export default CandidateConfirmSlot;
