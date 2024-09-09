/* eslint-disable security/detect-object-injection */
import { SelectActionBar } from '@devlink2/SelectActionBar';

import {
  useApplications,
  useApplicationsActions,
  useApplicationsChecklist,
} from '@/job/hooks';

import { MoveCandidate } from './moveCandidate';

const Actions = () => {
  const {
    job: { flags },
    section,
  } = useApplications();
  const checklist = useApplicationsChecklist();
  const { setActionPopup, setChecklist } = useApplicationsActions();
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
