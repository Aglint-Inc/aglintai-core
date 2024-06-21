import { Dialog } from '@mui/material';
import { useEffect, useMemo } from 'react';

import { ConfirmationPopup } from '@/devlink3/ConfirmationPopup';
import { useWorkflow } from '@/src/context/Workflows/[id]';
import { useWorkflowStore } from '@/src/context/Workflows/store';

import { Form, Forms, validate } from '../common';

const Edit = () => {
  const {
    workflow: { title, description, auto_connect },
    handleUpdateWorkflow,
  } = useWorkflow();

  const {
    popup: { open, form },
    setPopup,
    closePopup,
    setForm,
  } = useWorkflowStore(({ popup, setPopup, closePopup }) => ({
    popup,
    setPopup,
    closePopup,
    setForm: (newForms: Partial<Form>) =>
      setPopup({ form: { ...popup.form, ...newForms } }),
  }));

  const initialInput = useMemo(
    () => ({
      title,
      description,
      auto_connect,
    }),
    [title, description, auto_connect],
  );

  const handleClose = () => {
    closePopup(initialInput);
  };

  const handleSubmit = () => {
    const { error, newForms } = validate(form);
    if (error) {
      setPopup({ form: newForms });
      return;
    }
    handleUpdateWorkflow({
      title: form.title.value,
      description: form.description.value,
      auto_connect: form.auto_connect.value,
    });
    handleClose();
  };

  useEffect(() => {
    closePopup(initialInput);
  }, [initialInput]);

  return (
    <>
      <Dialog open={open} onClose={() => handleClose()}>
        <ConfirmationPopup
          isBlueButtonVisible={true}
          isDescriptionVisible={true}
          isIcon={false}
          isGreyButtonVisible={true}
          isWidget={true}
          isYellowButtonVisible={false}
          onClickAction={{ onClick: () => handleSubmit() }}
          onClickCancel={{ onClick: () => handleClose() }}
          textPopupTitle={'Edit Workflow'}
          textPopupButton={'Edit Workflow'}
          slotWidget={<Forms form={form} setForm={setForm} />}
          textPopupDescription={'Edit workflow details.'}
        />
      </Dialog>
    </>
  );
};

export default Edit;
