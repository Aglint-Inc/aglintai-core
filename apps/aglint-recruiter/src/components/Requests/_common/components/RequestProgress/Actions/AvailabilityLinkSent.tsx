import { type DatabaseTable } from '@aglint/shared-types';
import { Button } from '@components/ui/button';
import { Check } from 'lucide-react';
import React, { useState } from 'react';

const AvailabilityLinkSent = (
  progress_row: DatabaseTable['request_progress'],
) => {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <>
      <div className='flex items-center gap-0'>
        <Check size={16} className='text-neutral-2' />
        <Button>Candidate Availability Request link</Button>
        <Button
          onClick={() => {
            setIsCopied(true);
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/request-availability/${progress_row.meta.avail_req_id}`,
            );
            setTimeout(() => {
              setIsCopied(false);
            }, 3000);
          }}
          size={'sm'}
          color={'neutral'}
        >
          {isCopied ? 'Copied' : 'Copy'}
        </Button>
      </div>
    </>
  );
};

export default AvailabilityLinkSent;
