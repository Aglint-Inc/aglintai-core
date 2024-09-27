'use client';

import { useEffect } from 'react';

import { initiateJobAutomationState } from '../../contexts/workflowsStoreContext';
import { useGetJobWorkflow } from '../../hooks';
import Main from './Main/Main';
import { Summary } from './Summary';

export default function EnhancedAutomationPage() {
  const { data, status } = useGetJobWorkflow();

  useEffect(() => {
    if (status === 'success' && data) {
      initiateJobAutomationState(data);
    }
  }, [status, data]);

  return (
    <div className='container mx-auto py-10'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        <div className='md:col-span-2'>
          <Main />
        </div>
        <div className='md:col-span-1'>
          <Summary automationCategories={[]} toggleActionEdit={() => {}} />
        </div>
      </div>
    </div>
  );
}
