import { Dialog, Stack, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { DcPopup } from '@/devlink/DcPopup';
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
      phase: 'after',
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
      <ButtonSoft
        size={'1'}
        iconName={'bolt'}
        isLeftIcon={true}
        textButton={'Create'}
        onClickButton={{ onClick: () => setPopup({ open: true }) }}
      />
      <Dialog open={open} onClose={() => handleClose()}>
        <DcPopup
          popupName={'Create Workflow'}
          slotBody={
            <Stack>
              <Typography mb={2}>
                Enter the name for workflow. Next, you will be able to add steps
                to the workflow.
              </Typography>
              <Stack spacing={2}>
                <Forms form={form} setForm={setForm} />
              </Stack>
            </Stack>
          }
          onClickClosePopup={{ onClick: handleClose }}
          slotButtons={
            <>
              <ButtonSoft
                textButton='Cancel'
                size={2}
                color={'neutral'}
                onClickButton={{
                  onClick: handleClose,
                }}
              />
              <ButtonSolid
                size={2}
                textButton={'Create Workflow'}
                onClickButton={{ onClick: handleSubmit }}
              />
            </>
          }
        />
      </Dialog>
    </>
  );
};

export default Create;
