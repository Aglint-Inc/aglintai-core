import { DcPopup } from '@devlink/DcPopup';
import { Dialog, Stack, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';

import { useWorkflow } from '@/context/Workflows/[id]';
import { useWorkflowStore } from '@/context/Workflows/store';

import { type Form, Forms, validate } from '../common';
import { Button } from '@components/ui/button';

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
        <DcPopup
          popupName={'Edit Workflow'}
          onClickClosePopup={{ onClick: handleClose }}
          slotBody={
            <Stack>
              <Typography mb={2}>Edit workflow details.</Typography>
              <Stack spacing={1}>
                <Forms form={form} setForm={setForm} />
              </Stack>
            </Stack>
          }
          slotButtons={
            <>
              <Button size={'sm'} color={'neutral'} onClick={handleClose}>
                Cancel
              </Button>
              <Button size={'sm'} onClick={handleSubmit}>
                Save
              </Button>
            </>
          }
        />
      </Dialog>
    </>
  );
};

export default Edit;
