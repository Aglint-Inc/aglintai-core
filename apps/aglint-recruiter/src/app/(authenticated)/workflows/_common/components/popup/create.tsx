import { AlertDialogHeader } from '@components/ui/alert-dialog';
import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Textarea } from '@components/ui/textarea';
import { Plus } from 'lucide-react';
import { useCallback, useEffect } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import { UISwitch } from '@/components/Common/UISwitch';
import {
  useWorkflows,
  useWorkflowsActions,
  useWorkflowsPopup,
} from '@/workflows/hooks';
import type { Form } from '@/workflows/types';
import { validate } from '@/workflows/utils';

const Create = () => {
  const { open, form } = useWorkflowsPopup();
  const { setPopup, closePopup } = useWorkflowsActions();

  const setForm = (newForms: Partial<Form>) =>
    setPopup({ form: { ...form, ...newForms } });

  const { handleCreateWorkflow } = useWorkflows();

  const handleSubmit = () => {
    const { error, newForms } = validate(form);
    if (error) {
      setPopup({ form: newForms });
      return;
    }
    handleCreateWorkflow({
      title: form.title.value!,
      description: form.description.value,
      auto_connect: form.auto_connect.value!,
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
      <UIButton
        leftIcon={<Plus />}
        size='md'
        variant='default'
        onClick={() => setPopup({ open: true })}
      >
        Create
      </UIButton>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
          <AlertDialogHeader>
            <DialogTitle>Create Automation</DialogTitle>
            <DialogDescription>
              Enter the name for automation. Next, you will be able to add steps
              to the automation.
            </DialogDescription>
          </AlertDialogHeader>
          <div className='space-y-4'>
            <div className='space-y-4'>
              <Input
                placeholder='Workflow Title'
                value={form.title.value!}
                onChange={(e) =>
                  setForm({
                    title: {
                      value: e.target.value,
                      error: false,
                      helperText: '',
                      required: true,
                      validation: (value) => value!.trim().length > 0,
                    },
                  })
                }
              />
              <Textarea
                placeholder='Workflow Description'
                value={form.description.value!}
                onChange={(e) =>
                  setForm({
                    description: {
                      value: e.target.value,
                      error: false,
                      helperText: '',
                      required: true,
                      validation: (value) => value!.trim().length > 0,
                    },
                  })
                }
              />
              <div className='flex items-center space-x-2'>
                <UISwitch
                  size='sm'
                  checked={form.auto_connect.value!}
                  onCheckedChange={(checked) =>
                    setForm({
                      auto_connect: {
                        value: checked,
                        error: false,
                        helperText: '',
                        required: true,
                        validation: (value) => value!,
                      },
                    })
                  }
                />
                <Label>Auto connect to all new jobs</Label>
              </div>
            </div>
          </div>
          <DialogFooter className='flex justify-end'>
            <Button variant='outline' onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Create Automation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Create;
