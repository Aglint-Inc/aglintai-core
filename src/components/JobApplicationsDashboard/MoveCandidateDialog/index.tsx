import { Dialog, Stack } from '@mui/material';
// import axios from 'axios';
import { useState } from 'react';

import { CandidateSelectionPopup } from '@/devlink2';
import {
  // JobApplicationsData,
  JobApplicationSections,
} from '@/src/context/JobApplicationsContext/types';

// import { pageRoutes } from '@/src/utils/pageRouting';
import { capitalize } from '../utils';
import AUIButton from '../../Common/AUIButton';

export const MoveCandidateDialog = ({
  open,
  onClose,
  destination,
  onSubmit,
  checkAction,
  count = 0,
  name = null,
}: {
  open: boolean;
  onClose: () => void;
  destination: JobApplicationSections;
  onSubmit: () => Promise<void>;
  checkAction: () => Promise<void>;
  count?: number;
  name?: string;
}) => {
  const [check, setCheck] = useState(false);
  const title = capitalize(destination);
  const subTitle = getSubTitle(destination, count, name);
  const description = getDescription(destination, count, name);
  const showCheck = checkVisibility(destination);
  const handleSubmit = async () => {
    await onSubmit();
    check && (await checkAction());
  };

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <CandidateSelectionPopup
        isCheckVisible={showCheck}
        // isCheckVisible={showCheck}
        textHeader={title}
        textDescription={description}
        isChecked={check}
        textCheck={subTitle}
        onclickCheck={{ onClick: () => setCheck((prev) => !prev) }}
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
            <AUIButton
              onClick={async () => await handleSubmit()}
              variant={'primary'}
            >
              {check && showCheck ? 'Send Email & Move' : title}
            </AUIButton>
          </Stack>
        }
      />
    </Dialog>
  );
};

// eslint-disable-next-line no-unused-vars
const checkVisibility = (destination: JobApplicationSections) => {
  return false;
  // return (
  //   destination === JobApplicationSections.ASSESSMENT ||
  //   destination === JobApplicationSections.DISQUALIFIED
  // );
};

const getDescription = (
  destination,
  count: number = 0,
  name: string = null,
) => {
  if (name) return `Move ${name} to ${capitalize(destination)} stage?`;
  return `Move ${count} candidate${count !== 1 ? 's' : ''} to ${capitalize(
    destination,
  )} stage`;
};

const getSubTitle = (
  destination: JobApplicationSections,
  count: number = 0,
  name: string = null,
) => {
  if (name) {
    switch (destination) {
      case JobApplicationSections.ASSESSMENT:
        return `Proceed to send an assessment email to ${name}`;
      case JobApplicationSections.DISQUALIFIED:
        return `Proceed to send a rejection email to ${name}`;
      default:
        return null;
    }
  } else if (count === 0) return null;
  else {
    switch (destination) {
      case JobApplicationSections.ASSESSMENT:
        return `Proceed to send an assessment email to the candidate${
          count !== 1 ? 's' : ''
        }`;
      case JobApplicationSections.DISQUALIFIED:
        return `Proceed to send a rejection email to the candidate${
          count !== 1 ? 's' : ''
        }`;
      default:
        return null;
    }
  }
};
