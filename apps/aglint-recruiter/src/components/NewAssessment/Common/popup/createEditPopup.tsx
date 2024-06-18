import { Dialog, MenuItem, Stack } from '@mui/material';
import { capitalize } from 'lodash';
import React, { useEffect, useState } from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { AssessmentPopup as AssessmentPopupDev } from '@/devlink2/AssessmentPopup';
import { SelectionPill } from '@/devlink2/SelectionPill';
import UITextField from '@/src/components/Common/UITextField';
import { useCreateAssessment } from '@/src/queries/assessment';

import useAssessmentStore from '../../Stores';
import SelectionComp from '../components/selection';
import LevelTag from '../tags/levels';
import ModeTags from '../tags/modes';
import TypeTags from '../tags/types';

export type CreateEditPayload = Parameters<
  ReturnType<typeof useCreateAssessment>['mutation']['mutate']
>[0];

const CreateEditPopup: React.FC<{
  type: 'create' | 'edit';
  initialFields: CreateEditPayload;
  disable: boolean;
  mutateFn: (
    // eslint-disable-next-line no-unused-vars
    fields: CreateEditPayload,
  ) => void;
  success?: boolean;
  editQuestions?: () => void;
}> = ({
  type,
  initialFields,
  mutateFn,
  disable,
  success = false,
  editQuestions = () => {},
}) => {
  const popupTitle = `${capitalize(type)} Assessment`;

  const { createModal, setCreateModal } = useAssessmentStore((state) => ({
    createModal: state.createModal,
    setCreateModal: state.setCreateModal,
  }));
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

  const handleModeSelect = (mode: CreateEditPayload['mode']) => {
    setFields((prev) => ({ ...prev, mode }));
  };

  const handleClose = () => {
    setCreateModal(false);
    setTimeout(() => setFields(initialFields), 400);
  };

  const handleSubmit = async () => {
    handleClose();
    mutateFn(fields);
    if (type === 'edit') editQuestions();
  };

  useEffect(() => {
    if (success) setFields(initialFields);
  }, [success]);

  const title = (
    <UITextField
      name='title'
      placeholder='Enter assessment name'
      label='Assessment Name'
      required
      value={fields.title}
      onChange={handleChange}
    />
  );

  const description = (
    <UITextField
      name='description'
      label='Description'
      required
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

  const modes = (
    <ModeSelector selectedMode={fields.mode} handleSelect={handleModeSelect} />
  );

  const types = (
    <TypeSelector selectedType={fields.type} handleSelect={handleTypeSelect} />
  );

  const disabled =
    fields.title.trim() === '' || fields.description.trim() === '' || disable;
  const submit = (
    <Stack width={'100%'}>
      <ButtonSolid
        textButton={type === 'edit' ? 'Save changes' : popupTitle}
        isDisabled={disabled}
        onClickButton={{
          onClick: handleSubmit,
        }}
        size={2}
      />
    </Stack>
  );

  return (
    <Dialog open={createModal} onClose={handleClose}>
      <AssessmentPopupDev
        textPopupTitle={popupTitle}
        slotInputName={title}
        slotDescriptionTextarea={description}
        slotAssessmentMode={modes}
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
    <SelectionComp
      onChange={(e) => handleSelect(e.target.value)}
      value={selectedType}
    >
      {cards}
    </SelectionComp>
  );
};

const ModeSelector: React.FC<{
  selectedMode: CreateEditPayload['mode'];
  // eslint-disable-next-line no-unused-vars
  handleSelect: (mode: CreateEditPayload['mode']) => void;
}> = ({ selectedMode, handleSelect }) => {
  const types: CreateEditPayload['mode'][] = ['classic', 'verbal', 'visual'];
  const cards = types.map((type, i) => (
    <MenuItem key={i} value={type}>
      <ModeTags type={type} />
    </MenuItem>
  ));
  return (
    <SelectionComp
      onChange={(e) => handleSelect(e.target.value)}
      value={selectedMode}
    >
      {cards}
    </SelectionComp>
  );
};

export default CreateEditPopup;
