/* eslint-disable jsx-a11y/no-static-element-interactions */
import { type DatabaseTable } from '@aglint/shared-types';
import { Button } from '@components/ui/button';
import { useState } from 'react';
const SelfScheduleLinkSent = (args: DatabaseTable['request_progress']) => {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <>
      <div className='flex items-center space-x-2'>
        <Button
          variant='outline'
          size='sm'
          data-testid='self-scheduling-copy-link-btn'
          onClick={() => {
            setIsCopied(true);
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_HOST_NAME}/self-scheduling/${args.meta.filter_json_id}`,
            );
            setTimeout(() => {
              setIsCopied(false);
            }, 3000);
          }}
        >
          {isCopied ? 'Copied' : 'Copy Link'}
        </Button>
      </div>
    </>
  );
};

export default SelfScheduleLinkSent;
