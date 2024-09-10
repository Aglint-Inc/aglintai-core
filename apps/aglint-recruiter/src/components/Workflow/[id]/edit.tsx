import { useEffect, useMemo } from 'react';

import { useWorkflow } from '@/context/Workflows/[id]';
import { useWorkflowStore } from '@/context/Workflows/store';

import { type Form, Forms, validate } from '../common';
import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';

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
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Edit Workflow</DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <p className='text-sm text-muted-foreground mb-4'>
              Edit workflow details.
            </p>
            <div className='space-y-2'>
              <Forms form={form} setForm={setForm} />
            </div>
          </div>
          <DialogFooter className='mt-6'>
            <Button variant='outline' onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Edit;
