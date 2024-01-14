import { Collapse } from '@mui/material';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';

import {
  ScrDropdown,
  ScrQuestionEdit,
  ScrQuestionOptionEdit,
  ToggleButton,
} from '@/devlink2';
import AUIButton from '@/src/components/Common/AUIButton';
import UITextField from '@/src/components/Common/UITextField';

import { qnTypeToIcon } from './PhoneScreening';
import { qnTypeToLabel2 } from './utils';
import { PhoneScreenQuestion } from '../../JobPostFormProvider';

const PhoneScreenNewQnForm = ({
  defaultEditQn,
  handleCancel,
  handleDelete,
  handleDone,
  isEdit = false,
}) => {
  const [editQn, setEditQn] = useState<PhoneScreenQuestion>(defaultEditQn);
  const [showDropDown, setShowDropDown] = useState(false);

  const handleEditQn = (type: PhoneScreenQuestion['type']) => {
    if (type === 'multiSelect' || type === 'singleSelect') {
      setEditQn((prev) => ({
        ...prev,
        type: type,
        options: Array(2)
          .fill(0)
          .map(() => {
            return { id: nanoid(), option: '' };
          }),
      }));
    } else {
      setEditQn((prev) => ({
        ...prev,
        type: type,
      }));
    }
  };

  return (
    <>
      <ScrQuestionEdit
        isReqChecked={editQn?.isRequired}
        isOptionsVisible={editQn?.type !== 'shortAnswer'}
        onclickDelete={{
          onClick: handleDelete,
        }}
        slotOptions={
          <>
            {editQn.options.map((op, idx) => (
              <ScrQuestionOptionEdit
                onclickRemove={{
                  onClick: () => {
                    const updOptions = editQn.options.filter(
                      (e) => e.id !== op.id,
                    );
                    setEditQn((prev) => ({
                      ...prev,
                      options: updOptions,
                    }));
                  },
                }}
                key={op.id}
                count={idx + 1}
                slotInput={
                  <UITextField
                    value={op.option}
                    placeholder='Type Here'
                    onChange={(e) => {
                      const updOptions = editQn.options.map((t) => {
                        if (t.id === op.id) {
                          t.option = e.target.value;
                          return { ...t };
                        }
                        return t;
                      });
                      setEditQn((prev) => ({
                        ...prev,
                        options: updOptions,
                      }));
                    }}
                  />
                }
              />
            ))}
          </>
        }
        isDescriptionVisible={true}
        slotDescription={
          <>
            <Collapse in={editQn.showDescription} unmountOnExit translate='yes'>
              <UITextField
                multiline
                fullWidth
                placeholder='Type Here'
                minRows={2}
                maxRows={3}
                value={editQn.description}
                onChange={(e) => {
                  setEditQn((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                }}
              />
            </Collapse>
          </>
        }
        slotDescriptionToggle={
          <>
            <ToggleButton
              isActive={editQn.showDescription}
              isInactive={!editQn.showDescription}
              onclickToggle={{
                onClick: () => {
                  setEditQn((prev) => ({
                    ...prev,
                    showDescription: !prev.showDescription,
                  }));
                },
              }}
            />
          </>
        }
        slotQuestionInput={
          <>
            <UITextField
              multiline
              fullWidth
              minRows={1}
              maxRows={3}
              value={editQn?.question}
              onChange={(e) => {
                setEditQn((p) => ({ ...p, question: e.target.value }));
              }}
            />
            <ScrDropdown
              slotSelectedIcon={qnTypeToIcon(editQn?.type)}
              selectedText={qnTypeToLabel2(editQn.type)}
              onclickMultiSelect={{
                onClick: () => {
                  handleEditQn('multiSelect');
                  setShowDropDown((prev) => !prev);
                },
              }}
              onclickShortAnswer={{
                onClick: () => {
                  handleEditQn('shortAnswer');
                  setShowDropDown((prev) => !prev);
                },
              }}
              onclickSingleSelect={{
                onClick: () => {
                  handleEditQn('singleSelect');
                  setShowDropDown((prev) => !prev);
                },
              }}
              isOptionsBodyVisible={showDropDown}
              onclickTrigger={{
                onClick: () => {
                  setShowDropDown((prev) => !prev);
                },
              }}
            />
          </>
        }
        onclickAddOption={{
          onClick: () => {
            setEditQn((prev) => ({
              ...prev,
              options: [
                ...editQn.options,
                {
                  id: nanoid(),
                  option: '',
                },
              ],
            }));
          },
        }}
        onclickRequiredCheckbox={{
          onClick: () => {
            setEditQn((prev) => ({
              ...prev,
              isRequired: !prev.isRequired,
            }));
          },
        }}
        isDeleteVisible={isEdit}
        slotButtons={
          <>
            <AUIButton variant='text' size='medium' onClick={handleCancel}>
              Cancel
            </AUIButton>
            <AUIButton
              variant='primary'
              size='medium'
              disabled={editQn.question.length === 0}
              onClick={() => {
                handleDone(editQn);
              }}
            >
              {isEdit ? 'Update' : 'Add'}
            </AUIButton>
          </>
        }
      />
    </>
  );
};

export default PhoneScreenNewQnForm;
