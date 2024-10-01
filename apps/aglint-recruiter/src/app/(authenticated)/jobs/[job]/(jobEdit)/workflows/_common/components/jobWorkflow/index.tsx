'use client';

import { useEffect } from 'react';

import {
  initiateJobAutomationState,
  updateJobAutomationState,
} from '../../contexts/workflowsStoreContext';
import { useGetJobWorkflow } from '../../hooks';
import { Summary } from './Summary';
import Main from './workflows';

export default function EnhancedAutomationPage() {
  const { data, status } = useGetJobWorkflow();
  useEffect(() => {
    // TODO: handle Error cases
    if (status === 'pending') {
      updateJobAutomationState(true);
    }
    if (status === 'error') {
      updateJobAutomationState(false);
    }
    if (status === 'success' && data) {
      initiateJobAutomationState(data);
      updateJobAutomationState(false);
    }
  }, [status, data]);

  return (
    <div className='w-full'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        <div className='md:col-span-2'>
          <Main />
        </div>
        <div className='md:col-span-1'>
          <Summary />
        </div>
      </div>
    </div>
  );
}
