import { AlertDialogHeader } from '@components/ui/alert-dialog';
import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Switch } from '@components/ui/switch';
import { Textarea } from '@components/ui/textarea';
import { Bolt } from 'lucide-react';
import { useCallback, useEffect } from 'react';

import {
  useWorkflows,
  useWorkflowsActions,
  useWorkflowsPopup,
} from '@/workflows/hooks';
import { Form } from '@/workflows/types';
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
      <Button size='sm' onClick={() => setPopup({ open: true })}>
        <Bolt className='mr-2 h-4 w-4' />
        Create
      </Button>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
          <AlertDialogHeader>
            <DialogTitle>Create Workflow</DialogTitle>
          </AlertDialogHeader>
          <div className='space-y-4'>
            <Label className='mb-2'>
              Enter the name for workflow. Next, you will be able to add steps
              to the workflow.
            </Label>
            <div className='space-y-4'>
              <Input
                placeholder='Workflow Title'
                value={form.title.value}
                onChange={(e) =>
                  setForm({
                    title: {
                      value: e.target.value,
                      error: false,
                      helperText: '',
                      required: true,
                      validation: (value) => value.trim().length > 0,
                    },
                  })
                }
              />
              <Textarea
                placeholder='Workflow Description'
                value={form.description.value}
                onChange={(e) =>
                  setForm({
                    description: {
                      value: e.target.value,
                      error: false,
                      helperText: '',
                      required: true,
                      validation: (value) => value.trim().length > 0,
                    },
                  })
                }
              />
              <div className='flex items-center space-x-2'>
                <Switch
                  checked={form.auto_connect.value}
                  onCheckedChange={(checked) =>
                    setForm({
                      auto_connect: {
                        value: checked,
                        error: false,
                        helperText: '',
                        required: true,
                        validation: (value) => value,
                      },
                    })
                  }
                />
                <Label>Auto connect to all new jobs</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Create Workflow</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Create;
