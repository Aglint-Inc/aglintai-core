import React from 'react';

import { AssessmentLandingTopRight } from '@/devlink2';
import { useCreateAssessment } from '@/src/queries/assessment/dashboard';

import CreateEditPopup, {
  type CreateEditPayload,
} from '../Common/popup/createEditPopup';
import { useAssessmentCreateEditModal } from '../Stores/modal';

const initialFields: CreateEditPayload = {
  title: '',
  type: 'programming',
  description: '',
  level: 'basic',
};

const AssessmentDashboardActions = () => {
  const { setOpen } = useAssessmentCreateEditModal();
  const { mutate, isPending } = useCreateAssessment();
  return (
    <>
      <AssessmentLandingTopRight
        onClickCreateAssessment={{ onClick: () => setOpen(true) }}
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
