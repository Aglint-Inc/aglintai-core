import React from 'react';

import { InlineEditField } from '@/devlink3';
import UITextField from '@/src/components/Common/UITextField';
import { useSchedulingAgent } from '@/src/context/SchedulingAgent/SchedulingAgentProvider';

import { setEdit, useSchedulingAgentStore } from '../store';

function EditTask() {
  const { editName } = useSchedulingAgent();
  const { edit } = useSchedulingAgentStore();

  return (
    <InlineEditField
      slotInput={
        <UITextField
          width='300px'
          rest={{
            autoFocus: true,
          }}
          value={edit.editValue}
          onChange={(e) => {
            setEdit({
              editValue: e.target.value,
            });
          }}
        />
      }
      onClickCancel={{
        onClick: () => {
          setEdit({
            isEdit: false,
            editValue: '',
          });
        },
      }}
      onClickDone={{
        onClick: () => {
          editName(edit.editValue);
          setEdit({
            isEdit: false,
            editValue: '',
          });
        },
      }}
    />
  );
}

export default EditTask;
