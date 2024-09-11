/* eslint-disable security/detect-object-injection */
import { SelectActionBar } from '@devlink2/SelectActionBar';

import { useApplicationsActions, useApplicationsChecklist } from '@/job/hooks';

import { MoveCandidate } from './moveCandidate';

const Actions = () => {
  const checklist = useApplicationsChecklist();
  const { setActionPopup, setChecklist } = useApplicationsActions();
  const count = checklist.length;
  return (
    <>
      <SelectActionBar
        onclickSelectAll={null}
        onClickDelete={{ style: { display: 'none' } }}
        isAssessmentVisible={false}
        isSendScreeningVisible={false}
        isDisqualifyVisible={false}
        isSelectAllVisible={false}
        onClickClear={{ onClick: () => setChecklist([]) }}
        textSelected={`${count} candidate${count === 1 ? '' : 's'} selected`}
        selectAllText={null}
        onClickNew={{ onClick: () => setActionPopup('new') }}
        onclickSendScreening={{ style: { display: 'none' } }}
        onclickAssessment={{ style: { display: 'none' } }}
        onclickDisqualify={{ onClick: () => setActionPopup('disqualified') }}
        slotDropdown={<MoveCandidate />}
      />
    </>
  );
};

export { Actions };
