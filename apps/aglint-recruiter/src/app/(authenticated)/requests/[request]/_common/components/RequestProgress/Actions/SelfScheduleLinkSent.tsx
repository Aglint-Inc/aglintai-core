/* eslint-disable jsx-a11y/no-static-element-interactions */
import { type DatabaseTable } from '@aglint/shared-types';
import { Button } from '@components/ui/button';
import { useRequests } from '@requests/hooks';
import { useParams } from 'next/navigation';
import { useState } from 'react';
const SelfScheduleLinkSent = (args: DatabaseTable['request_progress']) => {
  const params = useParams();
  const requestId = params?.request as string;
  const {
    requests: { data: requestList },
  } = useRequests();
  const selectedRequest = Object.values(requestList ?? [])
    .flat()
    .find((request) => request?.id === requestId);
  const [isCopied, setIsCopied] = useState(false);
  const application_id = selectedRequest ? selectedRequest.application_id : '';
  return (
    <>
      <div className='flex items-center space-x-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => {
            setIsCopied(true);
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/invite/${application_id}?filter_id=${args.meta.filter_json_id}`,
            );
            setTimeout(() => {
              setIsCopied(false);
            }, 3000);
          }}
        >
          {isCopied
            ? 'Copied Self Scheduling Link'
            : 'Copy Self Scheduling Link'}
        </Button>
      </div>
    </>
  );
};

export default SelfScheduleLinkSent;
