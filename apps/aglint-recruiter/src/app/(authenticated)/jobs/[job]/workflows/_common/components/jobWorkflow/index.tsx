'use client';

import { toast } from '@components/hooks/use-toast';
import { useEffect } from 'react';

import { useTenant } from '@/company/hooks';
import { UIButton } from '@/components/Common/UIButton';
import { useRouterPro } from '@/hooks/useRouterPro';
import { cloneCompWorkflows } from '@/utils/clone/clonecompWorkflows';
import { supabase } from '@/utils/supabase/client';

import {
  initiateJobAutomationState,
  updateJobAutomationState,
} from '../../contexts/workflowsStoreContext';
import { useGetJobWorkflow } from '../../hooks';
import { Summary } from './Summary';
import Main from './workflows';

export default function EnhancedAutomationPage() {
  const { data, status } = useGetJobWorkflow();
  const { params } = useRouterPro();
  const job_id = params.job;

  const { recruiter_id } = useTenant();
  useEffect(() => {
    // TODO: handle diff cases
    if (status === 'pending') {
      updateJobAutomationState(true);
    }
    if (status === 'success' && data) {
      initiateJobAutomationState(data);
      updateJobAutomationState(false);
    }
  }, [status, data]);

  // TODO:dev only
  const handleCloneWfs = async () => {
    try {
      await cloneCompWorkflows({
        job_id: job_id,
        company_id: recruiter_id,
        supabase,
      });
      toast({
        title: 'Workflows cloned successfully',
        variant: 'default',
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='container mx-auto py-10'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        <div className='md:col-span-2'>
          <Main />
        </div>
        <div className='md:col-span-1'>
          <UIButton onClick={handleCloneWfs}>Clone Workflows [DEV]</UIButton>
          <Summary />
        </div>
      </div>
    </div>
  );
}
