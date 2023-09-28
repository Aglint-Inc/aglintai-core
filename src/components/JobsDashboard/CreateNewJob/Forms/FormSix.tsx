/* eslint-disable no-console */
import { NewJobStep6 } from '@/devlink';

function FormSix() {
  return (
    <NewJobStep6
      isAutomatedScreeningChecked1
      isAutomatedScreeningChecked2
      isShortlistCandidateChecked1
      isShortlistCandidateChecked2
      onClickAutomateScreeningCheck1={{
        onClick: () => {
          console.log('log');
        },
      }}
      onClickAutomatedScreeningCheck2={{
        onClick: () => {
          console.log('log');
        },
      }}
      onClickShortlistCandidateCheck1={{
        onClick: () => {
          console.log('log');
        },
      }}
      onClickShortlistCandidateCheck2={{
        onClick: () => {
          console.log('log');
        },
      }}
      slotAiFeedbackToggle={<div>slot1</div>}
      slotAutomateScreeningToggle={<div>slot </div>}
      slotAutomatedScreeningCount1={<div>slot </div>}
      slotAutomatedScreeningCount2={<div>slot </div>}
      slotResumeJdToggle={<div>slot </div>}
      slotShortlistCandidateCount1={<div>slot </div>}
      slotShortlistCandidateCount2={<div>slot </div>}
      slotShortlistCandidateToggle={<div>slot </div>}
    />
  );
}

export default FormSix;
