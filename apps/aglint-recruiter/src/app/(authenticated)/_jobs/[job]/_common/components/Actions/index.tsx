/* eslint-disable security/detect-object-injection */
import { Button } from '@components/ui/button';

import { useApplicationsActions, useApplicationsChecklist } from '@/job/hooks';

import { MoveCandidate } from './moveCandidate';

const Actions = () => {
  const checklist = useApplicationsChecklist();
  const { setActionPopup, setChecklist } = useApplicationsActions();
  const count = checklist.length;
  return (
    <>
      <div className='flex items-center justify-between border-t border-gray-200 bg-white p-4'>
        <div className='flex items-center space-x-4'>
          <Button
            onClick={() => setChecklist([])}
            variant='ghost'
            size='sm'
            className='text-gray-600 hover:text-gray-800'
          >
            Clear
          </Button>
          <span className='text-sm text-gray-600'>
            {`${count} candidate${count === 1 ? '' : 's'} selected`}
          </span>
        </div>
        <div className='flex items-center space-x-4'>
          <Button onClick={() => setActionPopup('new')} size='sm'>
            New
          </Button>
          <Button
            onClick={() => setActionPopup('disqualified')}
            variant='outline'
            size='sm'
          >
            Disqualify
          </Button>
          <MoveCandidate />
        </div>
      </div>
    </>
  );
};

export { Actions };
