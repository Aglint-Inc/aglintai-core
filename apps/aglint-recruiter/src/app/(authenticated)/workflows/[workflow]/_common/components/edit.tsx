import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { useEffect, useMemo } from 'react';

import { Forms } from '@/workflows/components/forms';
import { useWorkflowsActions, useWorkflowsPopup } from '@/workflows/hooks';
import type { Form } from '@/workflows/types';
import { validate } from '@/workflows/utils';

import { useWorkflow } from '../hooks';

export const Edit = () => {
  const {
    workflow: { title, description, auto_connect },
    handleUpdateWorkflow,
  } = useWorkflow();

  const { open, form } = useWorkflowsPopup();
  const { setPopup, closePopup } = useWorkflowsActions();

  const setForm = (newForms: Partial<Form>) =>
    setPopup({ form: { ...form, ...newForms } });

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
      title: form.title.value!,
      description: form.description.value,
      auto_connect: form.auto_connect.value!,
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
            <DialogTitle>Edit Automation Details</DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            {/* <p className='mb-4 text-sm text-muted-foreground'>
              Edit workflow details.
            </p> */}
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
