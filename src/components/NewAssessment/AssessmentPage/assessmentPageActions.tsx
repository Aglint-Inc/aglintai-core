import { AssessmentDetailTopRight } from '@/devlink2';
import { useEditAssessment } from '@/src/queries/assessment/dashboard';
import { useAssessment } from '@/src/queries/assessment/pages';

import CreateEditPopup, {
  type CreateEditPayload,
} from '../Common/popup/createEditPopup';
import LevelTag from '../Common/tags/levels';
import StatusTag from '../Common/tags/status';
import { useAssessmentCreateEditModal } from '../Stores/modal';

const AssessmentPageActions = () => {
  const { assessment } = useAssessment();
  const { setOpen } = useAssessmentCreateEditModal();
  if (!assessment) return <></>;
  return (
    <>
      <AssessmentDetailTopRight
        slotAssessmentLevel={<LevelTag level={assessment?.level ?? null} />}
        slotAssessmentStatus={<StatusTag status='draft' />}
        onClickEdit={{ onClick: () => setOpen(true) }}
      />
      <EditPopup />
    </>
  );
};

const EditPopup = () => {
  const {
    assessment_id,
    assessment: { title, description, type, level },
  } = useAssessment();
  const { mutate, isPending } = useEditAssessment(assessment_id);
  const initialFields: CreateEditPayload = {
    title,
    description,
    type,
    level,
  };
  return (
    <CreateEditPopup
      type='edit'
      initialFields={initialFields}
      mutateFn={mutate}
      disable={isPending}
    />
  );
};

export default AssessmentPageActions;
