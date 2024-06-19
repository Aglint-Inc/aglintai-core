import { Dialog, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { AssessmentDetailTopRight } from '@/devlink2/AssessmentDetailTopRight';
import { DeleteAssessmentPopup } from '@/devlink2/DeleteAssessmentPopup';
import { DuplicateAssessmentPopup } from '@/devlink2/DuplicateAssessmentPopup';
import {
  useDeleteAssessment,
  useDuplicateAssessment,
  useEditAssessment,
} from '@/src/queries/assessment';
import { useAssessmentAllQuestionUpdate } from '@/src/queries/assessment/questions';

import UITextField from '../../Common/UITextField';
import TypeIcon from '../Common/icons/types';
import Duplicating from '../Common/lotties/duplicating';
import CreateEditPopup, {
  type CreateEditPayload,
} from '../Common/popup/createEditPopup';
import LevelTag from '../Common/tags/levels';
import StatusTag from '../Common/tags/status';
import useAssessmentStore from '../Stores';
import { useAssessment } from './context';

const AssessmentPageActions = () => {
  const { assessment } = useAssessment();
  const { setCreateModal, setDuplicateModal, setDeleteModal } =
    useAssessmentStore((state) => ({
      setCreateModal: state.setCreateModal,
      setDeleteModal: state.setDeleteModal,
      setDuplicateModal: state.setDuplicateModal,
    }));
  if (!assessment) return <></>;
  return (
    <>
      <AssessmentDetailTopRight
        key={assessment.id + 'actions'}
        slotAssessmentDetail={
          <Stack height={'100%'} alignItems={'center'}>
            <TypeIcon type={assessment.type} />
          </Stack>
        }
        slotAssessmentLevel={<LevelTag level={assessment?.level ?? null} />}
        slotAssessmentStatus={<StatusTag jobs={assessment.jobs} />}
        onClickDelete={{ onClick: () => setDeleteModal(true) }}
        onClickDuplicate={{ onClick: () => setDuplicateModal(true) }}
        onClickEdit={{ onClick: () => setCreateModal(true) }}
      />
      <EditPopup key={assessment.id + 'edit'} />
      <DeletePopup key={assessment.id + 'delete'} />
      <DuplicatePopup key={assessment.id + 'duplicate'} />
    </>
  );
};

const DeletePopup = () => {
  const { push } = useRouter();
  const { deleteModal, setDeleteModal } = useAssessmentStore((state) => ({
    deleteModal: state.deleteModal,
    setDeleteModal: state.setDeleteModal,
  }));
  const {
    mutation: { mutateAsync: deleteAssessment, isPending },
  } = useDeleteAssessment();
  const handleClose = () => setDeleteModal(false);
  const handleDelete = async () => {
    try {
      if (!isPending) {
        await deleteAssessment();
        push('/assessment-new');
      }
    } catch {
      //do nothing
    }
  };
  return (
    <Dialog open={deleteModal} onClose={() => handleClose()}>
      <DeleteAssessmentPopup
        onClickCancel={{ onClick: () => handleClose() }}
        onClickDelete={{ onClick: () => handleDelete() }}
      />
    </Dialog>
  );
};

const DuplicatePopup = () => {
  const { push } = useRouter();
  const { assessment } = useAssessment();
  const { duplicateModal, setDuplicateModal } = useAssessmentStore((state) => ({
    duplicateModal: state.duplicateModal,
    setDuplicateModal: state.setDuplicateModal,
  }));
  const {
    mutation: { mutateAsync: duplicateAssessment, isPending },
  } = useDuplicateAssessment();
  const initialTitle = `Copy of ${assessment.title}`;
  const [title, setTitle] = useState(initialTitle);
  const [pending, setPending] = useState(isPending);
  useEffect(() => {
    const timer = setTimeout(() => setPending(isPending), 400);
    return () => clearTimeout(timer);
  }, [isPending]);
  const handleClose = () => {
    setDuplicateModal(false);
    setTimeout(() => setTitle(initialTitle), 400);
  };
  const handleDuplicate = async () => {
    try {
      if (!isPending) {
        const newAssessmentId = await duplicateAssessment(title);
        push(`/assessment-new/${newAssessmentId}`);
        setDuplicateModal(false);
      }
    } catch {
      //do nothing
    }
  };
  const loading = useMemo(() => <Duplicating />, []);
  return (
    <Dialog open={duplicateModal} onClose={() => handleClose()}>
      <DuplicateAssessmentPopup
        isLoading={pending || isPending}
        slotLoaderLottie={loading}
        onClickClose={{ onClick: () => handleClose() }}
        slotInput={
          <UITextField
            placeholder='Enter assessment name'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        }
        slotButton={
          <ButtonSolid
            textButton='Duplicate Assessment'
            size={2}
            onClickButton={{ onClick: () => handleDuplicate() }}
          />
        }
      />
    </Dialog>
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
