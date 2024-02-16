import React from 'react';

import { AssessmentLandingTopRight } from '@/devlink2';
import { useCreateAssessment } from '@/src/queries/assessment';

import CreateEditPopup, {
  type CreateEditPayload,
} from '../Common/popup/createEditPopup';
import useAssessmentStore from '../Stores';

const initialFields: CreateEditPayload = {
  title: '',
  type: 'programming',
  description: '',
  level: 'basic',
};

const AssessmentDashboardActions = () => {
  const setOpenModal = useAssessmentStore((state) => state.setOpenModal);
  const {
    mutation: { mutate, isPending },
  } = useCreateAssessment();
  return (
    <>
      <AssessmentLandingTopRight
        onClickCreateAssessment={{ onClick: () => setOpenModal(true) }}
      />
      <CreateEditPopup
        type='create'
        initialFields={initialFields}
        mutateFn={mutate}
        disable={isPending}
      />
    </>
  );
};

export default AssessmentDashboardActions;
