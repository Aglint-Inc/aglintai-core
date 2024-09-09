import { ButtonSoft } from '@devlink/ButtonSoft';
import { ButtonSolid } from '@devlink/ButtonSolid';
import React from 'react';

import { useEditSession } from './hooks';
import { useEditSessionDrawerStore } from './store';

function ButtonGroup() {
  const { saving, errorValidation } = useEditSessionDrawerStore((state) => ({
    saving: state.saving,
    errorValidation: state.errorValidation,
  }));

  const { handleClose, handleSave } = useEditSession({ refetch: () => {} });

  return (
    <>
      <ButtonSoft
        textButton='Cancel'
        color={'neutral'}
        size={2}
        onClickButton={{ onClick: () => handleClose() }}
      />
      <ButtonSolid
        isDisabled={errorValidation.some((err) => err.error)}
        textButton='Save'
        size={2}
        isLoading={Boolean(saving)}
        onClickButton={{
          onClick: () => {
            if (!saving) {
              handleSave();
            }
          },
        }}
      />
    </>
  );
}

export default ButtonGroup;
