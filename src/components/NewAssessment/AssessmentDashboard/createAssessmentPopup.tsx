import { Dialog, TextField } from '@mui/material';
import React, { useState } from 'react';

import {
  AssessmentLandingTopRight,
  AssessmentPopup as AssessmentPopupDev,
} from '@/devlink2';
import { useCreateAssessment } from '@/src/queries/assessment';

import AUIButton from '../../Common/AUIButton';

const AssessmentDashboardActions = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <>
      <AssessmentLandingTopRight
        onClickCreateAssessment={{ onClick: () => setOpen(true) }}
      />
      <Dialog open={open} onClose={handleClose}>
        <AssessmentPopup handleClose={handleClose} />
      </Dialog>
    </>
  );
};

export default AssessmentDashboardActions;

type Payload = Parameters<ReturnType<typeof useCreateAssessment>['mutate']>[0];

const initialFields: Payload = {
  title: '',
  type: 'programming',
  description: '',
  level: 'basic',
};

const AssessmentPopup: React.FC<{ handleClose: () => void }> = ({
  handleClose,
}) => {
  const [fields, setFields] = useState<Payload>(initialFields);
  const { mutate } = useCreateAssessment();
  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    handleClose();
    mutate(fields);
  };

  const title = (
    <TextField
      label='Title'
      name='title'
      value={fields.title}
      onChange={handleChange}
    />
  );
  const description = (
    <TextField
      label='Description'
      name='description'
      value={fields.description}
      onChange={handleChange}
      multiline
    />
  );
  return (
    <AssessmentPopupDev
      slotInputName={title}
      slotDescriptionTextarea={description}
      slotButton={<AUIButton onClick={handleSubmit}>Submit</AUIButton>}
    />
  );
};
