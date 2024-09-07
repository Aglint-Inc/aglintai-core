import { type DatabaseTable } from '@aglint/shared-types';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';

import { Stack } from '@mui/material';
import { Check } from 'lucide-react';
import React, { useState } from 'react';

const AvailabilityLinkSent = (
  progress_row: DatabaseTable['request_progress'],
) => {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <>
      <Stack direction={'row'} alignItems={'center'} gap={0}>
        <Check size={16} color={'var(--neutral-2)'} />
        <Label className='flex items-center text-sm text-gray-500'>TBD</Label>
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
      </Stack>
    </>
  );
};

export default AvailabilityLinkSent;
