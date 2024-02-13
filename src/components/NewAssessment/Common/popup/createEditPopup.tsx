import { Dialog, MenuItem, Select, Stack } from '@mui/material';
import { capitalize } from 'lodash';
import React, { useState } from 'react';

import {
  AssessmentPopup as AssessmentPopupDev,
  SelectionPill,
} from '@/devlink2';
import AUIButton from '@/src/components/Common/AUIButton';
import UITextField from '@/src/components/Common/UITextField';
import { useCreateAssessment } from '@/src/queries/assessment/dashboard';

import LevelTag from '../tags/levels';
import TypeTags from '../tags/types';
import { useAssessmentCreateEditModal } from '../../Stores/modal';

export type CreateEditPayload = Parameters<
  ReturnType<typeof useCreateAssessment>['mutate']
>[0];

const CreateEditPopup: React.FC<{
  type: 'create' | 'edit';
  initialFields: CreateEditPayload;
  disable: boolean;
  mutateFn: (
    // eslint-disable-next-line no-unused-vars
    fields: CreateEditPayload,
  ) => void;
}> = ({ type, initialFields, mutateFn, disable }) => {
  const popupTitle = `${capitalize(type)} Assessment`;
  const { open, setOpen } = useAssessmentCreateEditModal();
  const [fields, setFields] = useState<CreateEditPayload>(initialFields);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLevelSelect = (level: CreateEditPayload['level']) => {
    setFields((prev) => ({ ...prev, level }));
  };

  const handleTypeSelect = (type: CreateEditPayload['type']) => {
    setFields((prev) => ({ ...prev, type }));
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setFields(initialFields), 400);
  };

  const handleSubmit = async () => {
    handleClose();
    mutateFn(fields);
  };

  const title = (
    <UITextField
      name='title'
      placeholder='Enter assessment name'
      value={fields.title}
      onChange={handleChange}
    />
  );

  const description = (
    <UITextField
      name='description'
      placeholder='Briefly describe about the assessment'
      value={fields.description}
      onChange={handleChange}
      multiline={true}
      minRows={5}
    />
  );

  const levels = (
    <LevelSelector
      selectedLevel={fields.level}
      handleSelect={handleLevelSelect}
    />
  );

  const types = (
    <TypeSelector selectedType={fields.type} handleSelect={handleTypeSelect} />
  );

  const disabled =
    fields.title.trim() === '' || fields.description.trim() === '' || disable;
  const submit = (
    <Stack width={'100%'}>
      <AUIButton onClick={handleSubmit} disabled={disabled}>
        {popupTitle}
      </AUIButton>
    </Stack>
  );

  return (
    <Dialog open={open} onClose={handleClose}>
      <AssessmentPopupDev
        textPopupTitle={popupTitle}
        slotInputName={title}
        slotDescriptionTextarea={description}
        slotSelectionDropdown={types}
        slotButton={submit}
        slotAssesmentLevel={levels}
        onClickClose={{ onClick: handleClose }}
      />
    </Dialog>
  );
};

const LevelSelector: React.FC<{
  selectedLevel: CreateEditPayload['level'];
  // eslint-disable-next-line no-unused-vars
  handleSelect: (level: CreateEditPayload['level']) => void;
}> = ({ selectedLevel, handleSelect }) => {
  const levels: CreateEditPayload['level'][] = [
    'basic',
    'intermediate',
    'advanced',
  ];
  const cards = levels.map((level, i) => (
    <SelectionPill
      key={i}
      isSelected={selectedLevel === level}
      slotOption={<LevelTag level={level} />}
      onClickSelected={{ onClick: () => handleSelect(level) }}
    />
  ));
  return <>{cards}</>;
};

const TypeSelector: React.FC<{
  selectedType: CreateEditPayload['type'];
  // eslint-disable-next-line no-unused-vars
  handleSelect: (level: CreateEditPayload['type']) => void;
}> = ({ selectedType, handleSelect }) => {
  const types: CreateEditPayload['type'][] = [
    'programming',
    'cognitive',
    'culture',
    'language',
    'role',
    'situational',
    'software',
    'typing',
  ];
  const cards = types.map((type, i) => (
    <MenuItem key={i} value={type}>
      <TypeTags type={type} />
    </MenuItem>
  ));
  return (
    <Stack width={'100%'}>
      <Select
        value={selectedType}
        onChange={({ target: { value } }) =>
          handleSelect(value as CreateEditPayload['type'])
        }
        sx={{
          height: '40px',
          '&:hover': {
            '&& fieldset': {
              border: '1px solid #d0cccc',
            },
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #1F73B7 !important',
            boxShadow: '0 0 0 2.5px #b4cce4',
          },
        }}
      >
        {cards}
      </Select>
    </Stack>
  );
};

export default CreateEditPopup;
