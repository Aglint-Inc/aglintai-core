import { Collapse } from '@mui/material';
import { get } from 'lodash';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';

import { ScrDropdown } from '@/devlink2/ScrDropdown';
import { ScrQuestionEdit } from '@/devlink2/ScrQuestionEdit';
import { ScrQuestionOptionEdit } from '@/devlink2/ScrQuestionOptionEdit';
import { ToggleButton } from '@/devlink2/ToggleButton';
import UITextField from '@/src/components/Common/UITextField';
import { usePhoneScreening } from '@/src/context/PhoneScreeningContext/PhoneScreeningContext';

import { PhoneScreenQuestion } from '../../Jobs/Dashboard/JobPostCreateUpdate/JobPostFormProvider';
import { qnTypeToIcon } from './ScreeningComp';
import { qnTypeToLabel2 } from './utils';

const PhoneScreenNewQnForm = ({
  handleDelete,
  isEdit = false,
  qnPath,
  onClose,
}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const { handleUpdateFormFields, phoneScreenignForm } = usePhoneScreening();

  const editQn = get(phoneScreenignForm, qnPath) as PhoneScreenQuestion;

  const handleEditQn = (type: PhoneScreenQuestion['type']) => {
    if (type === 'multiSelect' || type === 'singleSelect') {
      handleUpdateFormFields({
        path: `${qnPath}`,
        value: {
          ...editQn,
          type: type,
          options: Array(2)
            .fill(0)
            .map(() => {
              return { id: nanoid(), option: '' };
            }),
        },
      });
    } else {
      handleUpdateFormFields({
        path: `${qnPath}.type`,
        value: type,
      });
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
        slotDropdown={
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
        }
        slotOptions={
          <>
            {editQn.options.map((op, idx) => (
              <ScrQuestionOptionEdit
                onclickRemove={{
                  onClick: () => {
                    const updOptions = editQn.options.filter(
                      (e) => e.id !== op.id,
                    );

                    handleUpdateFormFields({
                      path: `${qnPath}.options`,
                      value: updOptions,
                    });
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

                      handleUpdateFormFields({
                        path: `${qnPath}.options`,
                        value: updOptions,
                      });
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
                  handleUpdateFormFields({
                    path: `${qnPath}.description`,
                    value: e.target.value,
                  });
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
                  handleUpdateFormFields({
                    path: `${qnPath}.showDescription`,
                    value: !editQn.showDescription,
                  });
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
                handleUpdateFormFields({
                  path: `${qnPath}.question`,
                  value: e.target.value,
                });
              }}
              placeholder='Type your question Here'
            />
          </>
        }
        onclickAddOption={{
          onClick: () => {
            handleUpdateFormFields({
              path: `${qnPath}.options`,
              value: [
                ...editQn.options,
                {
                  id: nanoid(),
                  option: '',
                },
              ],
            });
          },
        }}
        onclickRequiredCheckbox={{
          onClick: () => {
            handleUpdateFormFields({
              path: `${qnPath}.isRequired`,
              value: !editQn.isRequired,
            });
          },
        }}
        isDeleteVisible={isEdit}
        onclickClose={{ onClick: onClose }}
      />
    </>
  );
};

export default PhoneScreenNewQnForm;
