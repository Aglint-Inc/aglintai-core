import { AssessmentDetailTopRight } from '@/devlink2';
import { useEditAssessment } from '@/src/queries/assessment';
import { useAssessmentAllQuestionUpdate } from '@/src/queries/assessment/questions';

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
        slotAssessmentStatus={<StatusTag jobs={assessment.jobs} />}
        onClickEdit={{ onClick: () => setOpenModal(true) }}
      />
      <EditPopup />
    </>
  );
};

const EditPopup = () => {
  const {
    assessment: { title, description, type, level, mode },
  } = useAssessment();
  const {
    mutation: { mutate: mutateFn, isPending, isSuccess },
  } = useEditAssessment();
  const {
    mutation: { mutate: editQuestions },
  } = useAssessmentAllQuestionUpdate();
  const initialFields: CreateEditPayload = {
    title,
    description,
    type,
    level,
    mode,
  };
  return (
    <CreateEditPopup
      type='edit'
      initialFields={initialFields}
      mutateFn={mutateFn}
      disable={isPending}
      success={isSuccess}
      editQuestions={editQuestions}
    />
  );
};

export default AssessmentPageActions;
