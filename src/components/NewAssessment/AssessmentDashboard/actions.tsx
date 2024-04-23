import React from 'react';

import { AssessmentLandingTopRight } from '@/devlink2';
import { useCreateAssessment } from '@/src/queries/assessment';

import CreateEditPopup, {
  type CreateEditPayload
} from '../Common/popup/createEditPopup';
import useAssessmentStore from '../Stores';

const initialFields: CreateEditPayload = {
  title: '',
  type: 'programming',
  description: '',
  mode: 'classic',
  level: 'basic'
};

const AssessmentDashboardActions = () => {
  const setCreateModal = useAssessmentStore((state) => state.setCreateModal);
  const {
    mutation: { mutate, isPending }
  } = useCreateAssessment();
  return (
    <>
      <AssessmentLandingTopRight
        onClickCreateAssessment={{ onClick: () => setCreateModal(true) }}
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
