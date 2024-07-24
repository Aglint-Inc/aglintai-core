import { GlobalCta } from '@/devlink3/GlobalCta';

import { useSchedulingFlowStore } from '../../store';

function AgentFinalScreenCta() {
  const scheduleFlow = useSchedulingFlowStore((state) => state.scheduleFlow);
  return (
    <GlobalCta
      iconName='check_circle'
      slotButton={<></>}
      textTitle={'Task Assigned to Email Agent'}
      textDescription={`The interview scheduling task 
        has been successfully assigned to the ${scheduleFlow === 'phone_agent' ? 'Phone' : 'Email'} Agent. View updates in the task.`}
    />
  );
}

export default AgentFinalScreenCta;
