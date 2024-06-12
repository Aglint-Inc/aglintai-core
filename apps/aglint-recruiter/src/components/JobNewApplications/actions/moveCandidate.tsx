/* eslint-disable security/detect-object-injection */
import { Dialog, Stack } from '@mui/material';
import { useState } from 'react';

import { CandidateSelectionPopup } from '@/devlink2/CandidateSelectionPopup';
import { SelectActionsDropdown } from '@/devlink2/SelectActionsDropdown';
import { useApplications } from '@/src/context/ApplicationsContext';
import {
  ApplicationsStore,
  useApplicationsStore,
} from '@/src/context/ApplicationsContext/store';

import AUIButton from '../../Common/AUIButton';

const MoveCandidate = () => {
  const { actionPopup, setActionPopup, resetActionPopup } =
    useApplicationsStore(
      ({ actionPopup, setActionPopup, resetActionPopup }) => ({
        actionPopup,
        setActionPopup,
        resetActionPopup,
      }),
    );
  const visibilities = useVisibility();
  return (
    <>
      <SelectActionsDropdown
        isAssessment={visibilities.assessment}
        isDisqualified={visibilities.disqualified}
        isInterview={visibilities.interview}
        isMoveNew={visibilities.new}
        isQualified={visibilities.qualified}
        isScreening={visibilities.screening}
        onClickAssessment={{ onClick: () => setActionPopup('assessment') }}
        onClickDisqualified={{ onClick: () => setActionPopup('disqualified') }}
        onClickInterview={{ onClick: () => setActionPopup('interview') }}
        onClickMoveNew={{ onClick: () => setActionPopup('new') }}
        onClickQualified={{ onClick: () => setActionPopup('qualified') }}
        onClickScreening={{ onClick: () => setActionPopup('screening') }}
      />
      <Dialog open={!!actionPopup} onClose={() => resetActionPopup()}>
        <MoveAction />
      </Dialog>
    </>
  );
};

export { MoveCandidate };

const MoveAction = () => {
  const { actionPopup } = useApplicationsStore(({ actionPopup }) => ({
    actionPopup,
  }));
  switch (actionPopup) {
    case 'assessment':
      return <MoveCandidateAssessment />;
    case 'new':
      return <MoveCandidateNew />;
    case 'qualified':
      return <MoveCandidateQualified />;
    case 'disqualified':
      return <MoveCandidateDisqualified />;
    case 'screening':
      return <MoveCandidateScreening />;
    case 'interview':
      return <MoveCandidateInterview />;
  }
};

const MoveCandidateNew = () => {
  const { handleMoveApplications } = useApplications();
  const { resetActionPopup } = useApplicationsStore(({ resetActionPopup }) => ({
    resetActionPopup,
  }));
  const { buttons, title, description } = useMeta(() => {
    handleMoveApplications({
      status: 'new',
      email: null,
    });
    resetActionPopup();
  });
  return (
    <CandidateSelectionPopup
      textHeader={title}
      textDescription={description}
      isCheckVisible={false}
      isChecked={false}
      textCheck={null}
      textWarning={null}
      slotMoveAssessment={<></>}
      isWarningVisible={false}
      onclickCheck={null}
      onclickClose={{ onClick: () => resetActionPopup() }}
      slotButtons={buttons}
    />
  );
};

const MoveCandidateScreening = () => {
  const { handleMoveApplications } = useApplications();
  const { resetActionPopup } = useApplicationsStore(({ resetActionPopup }) => ({
    resetActionPopup,
  }));
  const [check, setCheck] = useState(false);
  const { buttons, title, description, action } = useMeta(() => {
    handleMoveApplications({
      status: 'screening',
      email: check ? 'phoneScreen_email_candidate' : null,
    });
    resetActionPopup();
  });
  return (
    <CandidateSelectionPopup
      textHeader={title}
      textDescription={description}
      isCheckVisible={true}
      textCheck={action}
      isChecked={check}
      isWarningVisible={false}
      textWarning={null}
      slotMoveAssessment={<></>}
      onclickCheck={{ onClick: () => setCheck((prev) => !prev) }}
      onclickClose={{ onClick: () => resetActionPopup() }}
      slotButtons={buttons}
    />
  );
};

const MoveCandidateAssessment = () => {
  const { handleMoveApplications } = useApplications();
  const { resetActionPopup } = useApplicationsStore(({ resetActionPopup }) => ({
    resetActionPopup,
  }));
  const { buttons, title, description, action } = useMeta(() => {
    handleMoveApplications({
      status: 'assessment',
      email: null,
    });
    resetActionPopup();
  });
  return (
    <CandidateSelectionPopup
      textHeader={title}
      textDescription={description}
      isCheckVisible={true}
      textCheck={action}
      isChecked={false}
      isWarningVisible={false}
      textWarning={null}
      slotMoveAssessment={<></>}
      onclickCheck={null}
      onclickClose={{ onClick: () => resetActionPopup() }}
      slotButtons={buttons}
    />
  );
};

const MoveCandidateInterview = () => {
  const { handleMoveApplications } = useApplications();
  const { resetActionPopup } = useApplicationsStore(({ resetActionPopup }) => ({
    resetActionPopup,
  }));
  const { buttons, title, description } = useMeta(() => {
    handleMoveApplications({
      status: 'interview',
      email: null,
    });
    resetActionPopup();
  });
  return (
    <CandidateSelectionPopup
      textHeader={title}
      textDescription={description}
      isCheckVisible={true}
      textCheck={null}
      isChecked={false}
      isWarningVisible={false}
      textWarning={null}
      slotMoveAssessment={<></>}
      onclickCheck={null}
      onclickClose={{ onClick: () => resetActionPopup() }}
      slotButtons={buttons}
    />
  );
};

const MoveCandidateQualified = () => {
  const { handleMoveApplications } = useApplications();
  const { resetActionPopup } = useApplicationsStore(({ resetActionPopup }) => ({
    resetActionPopup,
  }));
  const { buttons, title, description } = useMeta(() => {
    handleMoveApplications({
      status: 'qualified',
      email: null,
    });
    resetActionPopup();
  });
  return (
    <CandidateSelectionPopup
      textHeader={title}
      textDescription={description}
      isCheckVisible={false}
      textCheck={null}
      isChecked={false}
      isWarningVisible={false}
      textWarning={null}
      slotMoveAssessment={<></>}
      onclickCheck={null}
      onclickClose={{ onClick: () => resetActionPopup() }}
      slotButtons={buttons}
    />
  );
};

const MoveCandidateDisqualified = () => {
  const { handleMoveApplications } = useApplications();
  const { resetActionPopup } = useApplicationsStore(({ resetActionPopup }) => ({
    resetActionPopup,
  }));
  const [check, setCheck] = useState(false);
  const { buttons, title, description, action } = useMeta(() => {
    handleMoveApplications({
      status: 'disqualified',
      email: check ? 'applicantReject_email_applicant' : null,
    });
    resetActionPopup();
  });
  return (
    <CandidateSelectionPopup
      textHeader={title}
      textDescription={description}
      isCheckVisible={true}
      textCheck={action}
      isChecked={check}
      isWarningVisible={false}
      textWarning={null}
      slotMoveAssessment={<></>}
      onclickCheck={{ onClick: () => setCheck((prev) => !prev) }}
      onclickClose={{ onClick: () => resetActionPopup() }}
      slotButtons={buttons}
    />
  );
};

const VISIBILITIES: {
  // eslint-disable-next-line no-unused-vars
  [id in ApplicationsStore['section']]: ApplicationsStore['section'][];
} = {
  new: ['disqualified'],
  screening: ['new'],
  assessment: ['new', 'screening'],
  interview: ['new', 'screening', 'assessment'],
  qualified: ['new', 'screening', 'assessment', 'interview'],
  disqualified: ['new', 'screening', 'assessment', 'interview', 'qualified'],
} as const;

function useVisibility() {
  const {
    job: { activeSections },
  } = useApplications();
  const { checklist, section: currentSection } = useApplicationsStore(
    ({ checklist, section }) => ({ checklist, section }),
  );
  return Object.entries(VISIBILITIES).reduce(
    (acc, [key, value]) => {
      acc[key] =
        checklist.length !== 0 &&
        activeSections.includes(key as keyof typeof VISIBILITIES) &&
        value.includes(currentSection);
      return acc;
    },
    // eslint-disable-next-line no-unused-vars
    {} as { [id in keyof typeof VISIBILITIES]: boolean },
  );
}

function useMeta(onSubmit: () => void) {
  const { resetActionPopup, actionPopup, checklist } = useApplicationsStore(
    ({ resetActionPopup, actionPopup, checklist }) => ({
      resetActionPopup,
      actionPopup,
      checklist,
    }),
  );
  const buttons = (
    <Stack spacing={'10px'} mt={'10px'} direction={'row'} alignItems={'center'}>
      <AUIButton onClick={() => resetActionPopup()} variant='text'>
        Cancel
      </AUIButton>
      <AUIButton onClick={() => onSubmit()} variant={'primary'}>
        {`Move to ${actionPopup}`}
      </AUIButton>
    </Stack>
  );
  const count = checklist.length;
  const title = `Move to ${actionPopup}`;
  const description = `Move ${count} candidate${count === 1 ? '' : 's'} to ${actionPopup}`;
  const action = `Send ${actionPopup} email${count === 1 ? '' : 's'} to ${count} candidate${count === 1 ? '' : 's'}`;
  return { title, description, buttons, action, count };
}
