import { Dialog, Stack } from '@mui/material';

// import axios from 'axios';
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
  checked,
  destination,
  onSubmit,
  checkAction,
  count = 0,
  name = null,
}: {
  open: boolean;
  checked: boolean;
  onClose: () => void;
  destination: JobApplicationSections;
  onSubmit: () => Promise<void>;
  checkAction: () => Promise<void>;
  count?: number;
  name?: string;
}) => {
  const title = capitalize(destination);
  const subTitle = getSubTitle(destination, count, name);
  const description = getDescription(destination, count, name);
  const showCheck = checkVisibility(destination);

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <CandidateSelectionPopup
        isCheckVisible={showCheck}
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
              {checked && showCheck ? 'Send Email & Move' : title}
            </AUIButton>
          </Stack>
        }
      />
    </Dialog>
  );
};

const checkVisibility = (destination: JobApplicationSections) => {
  return (
    destination === JobApplicationSections.SCREENING ||
    destination === JobApplicationSections.ASSESSMENT ||
    destination === JobApplicationSections.DISQUALIFIED
  );
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
      case JobApplicationSections.SCREENING:
        return `Proceed to send a screening email to ${name}`;
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
      case JobApplicationSections.SCREENING:
        return `Proceed to send a screening email to the candidate${
          count !== 1 ? 's' : ''
        }`;
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
