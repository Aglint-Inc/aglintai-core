/* eslint-disable jsx-a11y/no-static-element-interactions */
import { type DatabaseTable } from '@aglint/shared-types';
import { Button } from '@components/ui/button';
import { useRequests } from '@requests/hooks';
import { Check } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
const SelfScheduleLinkSent = (args: DatabaseTable['request_progress']) => {
  const params = useParams();
  const requestId = params?.request as string;
  const {
    requests: { data: requestList },
  } = useRequests();
  const selectedRequest = Object.values(requestList)
    .flat()
    .find((request) => request?.id === requestId);
  const [isCopied, setIsCopied] = useState(false);
  return (
    <>
      <div className='flex items-center space-x-2'>
        <Check className='h-5 w-5 text-neutral-500' />
        <span className='text-sm text-neutral-500'>
          Candidate self schedule link
        </span>
        <Button
          variant='outline'
          size='sm'
          onClick={() => {
            setIsCopied(true);
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/invite/${selectedRequest.application_id}?filter_id=${args.meta.filter_json_id}`,
            );
            setTimeout(() => {
              setIsCopied(false);
            }, 3000);
          }}
        >
          {isCopied ? 'Copied' : 'Copy'}
        </Button>
      </div>
    </>
  );
};

export default SelfScheduleLinkSent;
