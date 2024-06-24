import { Dialog } from '@mui/material';
import { useCallback, useEffect } from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { ConfirmationPopup } from '@/devlink3/ConfirmationPopup';
import { useWorkflows } from '@/src/context/Workflows';
import { useWorkflowStore } from '@/src/context/Workflows/store';

import { Form, Forms, validate } from '../../common';

const Create = () => {
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

  const { handleCreateWorkflow } = useWorkflows();

  const handleSubmit = () => {
    const { error, newForms } = validate(form);
    if (error) {
      setPopup({ form: newForms });
      return;
    }
    handleCreateWorkflow({
      title: form.title.value,
      description: form.description.value,
      auto_connect: form.auto_connect.value,
      phase: 'now',
      trigger: 'sendAvailReqReminder',
    });
    closePopup();
  };

  const handleClose = useCallback(() => {
    closePopup();
  }, []);

  useEffect(() => {
    closePopup();
  }, []);

  return (
    <>
      <ButtonSolid
        size={'2'}
        iconName={'bolt'}
        isLeftIcon={true}
        textButton={'New Workflow'}
        onClickButton={{ onClick: () => setPopup({ open: true }) }}
      />
      <Dialog open={open} onClose={() => handleClose()}>
        <ConfirmationPopup
          isBlueButtonVisible={true}
          isDescriptionVisible={false}
          isIcon={false}
          isGreyButtonVisible={true}
          isWidget={true}
          isYellowButtonVisible={false}
          onClickAction={{ onClick: () => handleSubmit() }}
          onClickCancel={{ onClick: () => handleClose() }}
          textPopupTitle={'Create Workflow'}
          textPopupButton={'Create Workflow'}
          slotWidget={<Forms form={form} setForm={setForm} />}
          textPopupDescription={
            'Enter the name for workflow. Next, you will be able to add steps to the workflow.'
          }
        />
      </Dialog>
    </>
  );
};

export default Create;
