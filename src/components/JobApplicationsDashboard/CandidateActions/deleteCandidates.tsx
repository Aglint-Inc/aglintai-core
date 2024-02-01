/* eslint-disable security/detect-object-injection */
import { Dialog, Stack } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';

import { CandidateSelectionPopup } from '@/devlink2';
import { ButtonDangerBasicRegular } from '@/devlink3';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import { CountJobs } from '@/src/context/JobsContext/types';

import AUIButton from '../../Common/AUIButton';

const DeleteCandidate: React.FC<{
  applicationLimit: CountJobs;
  selectAll: boolean;
  setSelectAll: Dispatch<SetStateAction<boolean>>;
}> = ({ applicationLimit, selectAll, setSelectAll }) => {
  const {
    section,
    cardStates: {
      checkList: { list, disabled },
    },
    setCardStates,
    handleJobApplicationDelete,
  } = useJobApplications();
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const handleDeleteApplications = async () => {
    if (!disabled) {
      setOpen(false);
      setCardStates((prev) => ({
        ...prev,
        checkList: { ...prev.checkList, disabled: true },
      }));
      await handleJobApplicationDelete(list, selectAll, check);
      setCardStates((prev) => ({
        ...prev,
        checkList: {
          disabled: false,
          list: new Set(),
        },
      }));
      setSelectAll(false);
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCheck = () => {
    setCheck((prev) => !prev);
  };

  const count = selectAll ? applicationLimit[section] : list.size;

  const title = `Delete application${count === 1 ? '' : 's'}`;

  return (
    <>
      <ButtonDangerBasicRegular
        buttonText={title}
        buttonProps={{ onClick: () => handleOpen() }}
      />
      <DeleteCandidateDialog
        open={open}
        onClose={() => handleClose()}
        onSubmit={async () => await handleDeleteApplications()}
        checked={check}
        checkAction={() => handleCheck()}
        title={title}
        count={count}
      />
    </>
  );
};

export default DeleteCandidate;

const DeleteCandidateDialog = ({
  open,
  onClose,
  checked,
  onSubmit,
  checkAction,
  title,
  count = 0,
  name = null,
}: {
  open: boolean;
  checked: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => Promise<void>;
  checkAction: () => void;
  count?: number;
  name?: string;
}) => {
  const subTitle = getSubTitle(count, name);
  const description = getDescription(count, name);

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <CandidateSelectionPopup
        isCheckVisible={true}
        textHeader={title}
        textDescription={description}
        isChecked={checked}
        textCheck={subTitle}
        onclickCheck={{ onClick: () => checkAction() }}
        onclickClose={{ onClick: () => onClose() }}
        slotButtons={
          <Stack
            spacing={'10px'}
            mt={'10px'}
            direction={'row'}
            alignItems={'center'}
          >
            <AUIButton onClick={() => onClose()} variant='text'>
              Cancel
            </AUIButton>
            <AUIButton onClick={() => onSubmit()} variant={'primary'}>
              {title}
            </AUIButton>
          </Stack>
        }
      />
    </Dialog>
  );
};

const getDescription = (count: number = 0, name: string = null) => {
  if (name) return `Delete ${name}'s job application?`;
  return `Delete ${count} job application${count !== 1 ? 's' : ''}`;
};

const getSubTitle = (count: number = 0, name: string = null) => {
  if (name) {
    return `Proceed to delete ${name} from Aglint's candidate pool`;
  } else if (count === 0) return null;
  else {
    return `Proceed to delete the candidate${
      count !== 1 ? 's' : ''
    } from Aglint's candidate pool`;
  }
};
