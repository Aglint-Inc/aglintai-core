
import { GlobalInfo } from '@/devlink2/GlobalInfo';

import { SchedulingFlow } from './store';

function InfoStepSelectState({
  scheduleFlow,
}: {
  scheduleFlow: SchedulingFlow['scheduleFlow'];
}) {
  return (
    <GlobalInfo
      textTitle={'How it works'}
      textDescription={
        scheduleFlow === 'self_scheduling'
          ? 'Use this feature to select and send available options within a specified date range. The candidate can then choose one of these options to confirm the schedule.'
          : scheduleFlow === 'email_agent'
            ? 'Please provide a date range, and the agent will contact the candidate via email to arrange a suitable time within the specified period.'
            : scheduleFlow === 'phone_agent'
              ? 'Please provide a date range, and the agent will contact the candidate via phone to arrange a suitable time within the specified period.'
              : scheduleFlow === 'debrief'
                ? `A debrief interview session allows the hiring team to discuss and evaluate the candidate's performance collectively. By sharing insights and feedback, the team can make a well-informed decision on the candidate's suitability for the role.`
                : 'Use this feature to request availability from candidates by selecting a date range and customizing time suggestions based on various options. Ensure minimum selections for days and slots.'
      }
    />
  );
}

export default InfoStepSelectState;
