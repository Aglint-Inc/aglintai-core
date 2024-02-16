import { AssessmentDetailTopRight } from '@/devlink2';
import { useEditAssessment } from '@/src/queries/assessment';

import { useAssessment } from './context';
import CreateEditPopup, {
  type CreateEditPayload,
} from '../Common/popup/createEditPopup';
import LevelTag from '../Common/tags/levels';
import StatusTag from '../Common/tags/status';
import useAssessmentStore from '../Stores';

const AssessmentPageActions = () => {
  const { assessment } = useAssessment();
  const setOpenModal = useAssessmentStore((state) => state.setOpenModal);
  if (!assessment) return <></>;
  return (
    <>
      <AssessmentDetailTopRight
        slotAssessmentLevel={<LevelTag level={assessment?.level ?? null} />}
        slotAssessmentStatus={<StatusTag status='draft' />}
        onClickEdit={{ onClick: () => setOpenModal(true) }}
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
  const {
    mutation: { mutate, isPending, isSuccess },
  } = useEditAssessment(assessment_id);
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
      success={isSuccess}
    />
  );
};

export default AssessmentPageActions;
