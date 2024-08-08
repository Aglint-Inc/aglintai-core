/* eslint-disable security/detect-object-injection */
import { SelectActionBar } from '@/devlink2/SelectActionBar';
import { useApplications } from '@/src/context/ApplicationsContext';
import { useApplicationsStore } from '@/src/context/ApplicationsContext/store';

import { MoveCandidate } from './moveCandidate';

const Actions = () => {
  const {
    job: { flags },
    section,
  } = useApplications();
  const { checklist, setChecklist, setActionPopup } = useApplicationsStore(
    ({ checklist, setChecklist, setActionPopup }) => ({
      checklist,
      setChecklist,
      setActionPopup,
    }),
  );
  const count = checklist.length;
  return (
    <>
    
      <SelectActionBar

        onclickSelectAll={null}
        onClickDelete={{ style: { display: 'none' } }}
        isAssessmentVisible={
          false && flags.assessment && section === 'assessment'
        }
        isSendScreeningVisible={
          false && flags.screening && section === 'screening'
        }
        isDisqualifyVisible={
          false && flags.disqualified && section === 'disqualified'
        }
        isSelectAllVisible={false}
        onClickClear={{ onClick: () => setChecklist([]) }}
        textSelected={`${count} candidate${count === 1 ? '' : 's'} selected`}
        selectAllText={null}
        onClickNew={{ onClick: () => setActionPopup('new') }}
        onclickSendScreening={{ onClick: () => setActionPopup('screening') }}
        onclickAssessment={{ onClick: () => setActionPopup('assessment') }}
        onclickDisqualify={{ onClick: () => setActionPopup('disqualified') }}
        slotDropdown={<MoveCandidate />}
      />
    </>
  );
};

export { Actions };
