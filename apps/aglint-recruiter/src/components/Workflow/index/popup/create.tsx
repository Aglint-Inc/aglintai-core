import { Dialog } from '@mui/material';
import { useCallback } from 'react';

import { ConfirmationPopup } from '@/devlink3/ConfirmationPopup';
import { WorkflowLandingTopRIght } from '@/devlink3/WorkflowLandingTopRIght';
import UITextField from '@/src/components/Common/UITextField';
import { useWorkflows } from '@/src/context/Workflows';
import { useWorkflowStore } from '@/src/context/Workflows/store';

const Create = () => {
  const {
    popup: { open, title },
    setPopup,
    resetPopup,
  } = useWorkflowStore(({ popup, setPopup, resetPopup }) => ({
    popup,
    setPopup,
    resetPopup,
  }));
  const { handleCreateWorkflow } = useWorkflows();
  const handleSubmit = useCallback(() => {
    handleCreateWorkflow({
      title,
      phase: 'now',
      trigger: 'availability_request_reminder',
    });
    resetPopup();
  }, [title]);
  const handleClose = useCallback(() => {
    resetPopup();
  }, []);
  return (
    <>
      <WorkflowLandingTopRIght
        onClickNewWorkflow={{ onClick: () => setPopup({ open: true }) }}
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
          slotWidget={<Form />}
          textPopupDescription={'Enter the name for workflow. Next, you will be able to add steps to the workflow.'}
        />
      </Dialog>
    </>
  );
};

export default Create;

const Form = () => {
  const {
    popup: { title },
    setPopup,
  } = useWorkflowStore(({ popup, setPopup }) => ({
    popup,
    setPopup,
  }));
  return (
    <UITextField
      label='Workflow title'
      value={title}
      onChange={(e) => setPopup({ title: e.target.value })}
    />
  );
};
