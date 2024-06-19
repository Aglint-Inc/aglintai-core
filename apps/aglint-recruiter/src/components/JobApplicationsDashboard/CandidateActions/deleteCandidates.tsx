/* eslint-disable security/detect-object-injection */
import { Dialog, Stack } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { CandidateSelectionPopup } from '@/devlink2/CandidateSelectionPopup';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import { CountJobs } from '@/src/context/JobsContext/types';

const DeleteCandidate: React.FC<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  applicationLimit: CountJobs;
  selectAll: boolean;
  setSelectAll: Dispatch<SetStateAction<boolean>>;
}> = ({ open, setOpen, applicationLimit, selectAll, setSelectAll }) => {
  const {
    section,
    cardStates: {
      checkList: { list, disabled },
    },
    setCardStates,
    handleJobApplicationDelete,
  } = useJobApplications();
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
  const handleClose = () => {
    setOpen(false);
  };

  const handleCheck = () => {
    setCheck((prev) => !prev);
  };

  const count = selectAll ? applicationLimit[section] : list.size;

  const title = `Delete Application${count === 1 ? '' : 's'}`;

  return (
    <>
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
        isWarningVisible={true}
        textWarning={`By clicking 'Delete', the application${
          count === 1 ? '' : 's'
        } will be removed from this job, and it cannot be undone. Any related interview schedules will also be deleted.`}
        textHeader={title}
        textDescription={description}
        isChecked={checked}
        textCheck={subTitle}
        onclickCheck={{ onClick: () => checkAction() }}
        onclickClose={{ onClick: () => onClose() }}
        slotMoveAssessment={<></>}
        slotButtons={
          <Stack
            spacing={'var(--space-2)'}
            mt={'var(--space-2)'}
            direction={'row'}
            alignItems={'center'}
          >
            <ButtonGhost
              textButton='Cancel'
              size={2}
              color={'neutral'}
              highContrast={true}
              onClickButton={{ onClick: () => onClose() }}
            />
            <ButtonSolid
              textButton='Delete'
              size={2}
              color={'error'}
              highContrast={true}
              onClickButton={{ onClick: () => onSubmit() }}
            />
          </Stack>
        }
      />
    </Dialog>
  );
};

const getDescription = (count: number = 0, name: string = null) => {
  if (name) return `Delete ${name}'s job application?`;
  return `Delete ${count} application${count !== 1 ? 's' : ''}`;
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
