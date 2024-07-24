import { useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';

import { useSchedulingApplicationStore } from '../../store';
import { useSchedulingDrawer } from '../hooks';
import { setStepScheduling, useSchedulingFlowStore } from '../store';
import ButtonAllOptions from './ButtonAllOptions';
import ButtonReschedule from './ButtonReschedule';

function ButtonMain({ refetch }: { refetch: () => void }) {
  const { initialSessions, selectedSessionIds, isSendingToCandidate } =
    useSchedulingApplicationStore((state) => ({
      initialSessions: state.initialSessions,
      selectedSessionIds: state.selectedSessionIds,
      isSendingToCandidate: state.isSendingToCandidate,
    }));
  const { scheduleFlow, stepScheduling } = useSchedulingFlowStore((state) => ({
    scheduleFlow: state.scheduleFlow,
    stepScheduling: state.stepScheduling,
  }));
  const [agentSchedulingLoading, setAgentSchedulingLoading] = useState(false);

  const isDebrief = initialSessions
    .filter((ses) => selectedSessionIds.includes(ses.interview_session.id))
    .some((ses) => ses.interview_session.session_type === 'debrief');

  const { resetStateSelfScheduling, onClickPrimary } = useSchedulingDrawer({
    refetch,
  });

  const primaryButtonText = () => {
    if (!isDebrief) {
      if (scheduleFlow === 'self_scheduling') {
        if (
          stepScheduling === 'preference' ||
          stepScheduling === 'pick_date' ||
          stepScheduling === 'slot_options'
        ) {
          return 'Continue';
        } else if (stepScheduling === 'self_scheduling_email_preview') {
          return 'Send to Candidate';
        }
      } else if (scheduleFlow === 'email_agent') {
        return 'Schedule Via Email';
      } else if (scheduleFlow === 'phone_agent') {
        return 'Schedule Via Phone';
      } else {
        return 'Continue';
      }
    } else {
      if (stepScheduling === 'preference' || stepScheduling === 'pick_date') {
        return 'Continue';
      } else if (stepScheduling === 'slot_options') {
        return 'Schedule Now';
      }
    }
  };
  return (
    <>
      <ButtonSoft
        size={2}
        color={'neutral'}
        textButton={stepScheduling === 'pick_date' ? 'Close' : 'Back'}
        onClickButton={{
          onClick: () => {
            if (stepScheduling === 'pick_date') {
              resetStateSelfScheduling();
            } else if (stepScheduling === 'slot_options') {
              if (!isSendingToCandidate) setStepScheduling('preference');
            } else if (stepScheduling === 'preference') {
              setStepScheduling('pick_date');
            } else if (stepScheduling === 'self_scheduling_email_preview') {
              setStepScheduling('slot_options');
            } else if (stepScheduling === 'reschedule') {
              resetStateSelfScheduling();
            }
          },
        }}
      />

      {stepScheduling === 'reschedule' ? (
        <ButtonReschedule />
      ) : stepScheduling === 'schedule_all_options' ? (
        <ButtonAllOptions />
      ) : (
        <ButtonSolid
          isLoading={isSendingToCandidate || agentSchedulingLoading}
          size={2}
          textButton={primaryButtonText()}
          onClickButton={{
            onClick: async () => {
              setAgentSchedulingLoading(true);
              await onClickPrimary().then(() => {
                setAgentSchedulingLoading(false);
              });
            },
          }}
        />
      )}
    </>
  );
}

export default ButtonMain;
