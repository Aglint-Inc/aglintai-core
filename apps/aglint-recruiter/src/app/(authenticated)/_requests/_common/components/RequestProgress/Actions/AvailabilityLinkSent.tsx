import { type DatabaseTable } from '@aglint/shared-types';
import { Button } from '@components/ui/button';
import { Tooltip, TooltipContent } from '@components/ui/tooltip';
import { Check, Copy } from 'lucide-react';
import React, { useState } from 'react';

const AvailabilityLinkSent = (
  progress_row: DatabaseTable['request_progress'],
) => {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <>
      <div className='flex items-center gap-0'>
        Copy availability link
        <Tooltip>
          <TooltipContent>
            {isCopied ? 'Copied!' : 'Copy to clipboard'}
          </TooltipContent>
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
            variant={'ghost'}
          >
            {isCopied ? <Check size={16} /> : <Copy size={16} />}
          </Button>
        </Tooltip>
      </div>
    </>
  );
};

export default AvailabilityLinkSent;
