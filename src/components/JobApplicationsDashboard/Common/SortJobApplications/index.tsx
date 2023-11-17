import { MenuItem, Select, Stack } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { CandidateSort, CandidateSortBody } from '@/devlink2';
import AUIButton from '@/src/components/Common/AUIButton';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import { CountJobs } from '@/src/context/JobsContext/types';

import {
  getBoundingSingleStatus,
  getBoundingStatus,
  useMouseClick,
} from '../../hooks';
import { CANDIDATE_SORT, capitalize, SortParameter } from '../../utils';

const SortJobApplications = ({
  setApplicationLimit,
}: {
  setApplicationLimit: Dispatch<SetStateAction<CountJobs>>;
}) => {
  const { searchParameters } = useJobApplications();
  const [sortVisibility, setSortVisibility] = useState(false);

  const [sort, setSort] = useState(searchParameters.sort);
  const handleClose = () => {
    if (sortVisibility) {
      setSortVisibility(false);
      setSort(searchParameters.sort);
    }
  };
  return (
    <Stack id={'SORTPARENT'}>
      <CandidateSort
        onclickSort={{
          onClick: () => {
            if (!sortVisibility) setSortVisibility(true);
          },
        }}
        slotBody={
          <ApplicationSortBody
            sort={sort}
            setSort={setSort}
            handleClose={handleClose}
            setApplicationLimit={setApplicationLimit}
          />
        }
        isSortBodyVisible={sortVisibility}
      />
    </Stack>
  );
};

const ApplicationSortBody = ({
  sort,
  setSort,
  handleClose,
  setApplicationLimit,
}: {
  sort: SortParameter;
  setSort: Dispatch<SetStateAction<SortParameter>>;
  handleClose: () => void;
  setApplicationLimit: Dispatch<SetStateAction<CountJobs>>;
}) => {
  const { searchParameters, handleJobApplicationFilter } = useJobApplications();
  const handleSubmit = async () => {
    const { confirmation, count } = await handleJobApplicationFilter({
      ...searchParameters,
      sort: sort,
    });
    if (confirmation) {
      setApplicationLimit(count);
    }
  };
  const disabled =
    searchParameters.sort.parameter === sort.parameter &&
    searchParameters.sort.ascending === sort.ascending;
  const sortButton = (
    <Stack>
      <AUIButton onClick={async () => await handleSubmit()} disabled={disabled}>
        Apply
      </AUIButton>
    </Stack>
  );
  const handleAsc = () => {
    setSort((prev) => {
      return { ...prev, ascending: true };
    });
  };
  const handleDesc = () => {
    setSort((prev) => {
      return { ...prev, ascending: false };
    });
  };
  const handleModify = (newParameter: SortParameter['parameter']) => {
    setSort((prev) => {
      return { ...prev, parameter: newParameter };
    });
  };
  const clickData = useMouseClick();
  useEffect(() => {
    if (clickData.click && clickData.x !== -1 && clickData.y !== -1) {
      if (getBoundingSingleStatus('SORTPARENT', clickData.x, clickData.y))
        setTimeout(() => handleClose(), 400);
      else if (!getBoundingStatus('SORTBODY', clickData.x, clickData.y))
        handleClose();
    }
  }, [clickData.click]);
  return (
    <Stack id={'SORTBODY'}>
      <CandidateSortBody
        slotInput={
          <CandidateSortInput
            parameter={sort.parameter}
            handleModify={(e) => handleModify(e)}
          />
        }
        isAscending={sort.ascending}
        isDescending={!sort.ascending}
        onclickAscending={{ onClick: () => handleAsc() }}
        onclickDescending={{ onClick: () => handleDesc() }}
        slotButton={sortButton}
      />
    </Stack>
  );
};

const CandidateSortInput = ({
  parameter,
  handleModify,
}: {
  parameter: SortParameter['parameter'];
  // eslint-disable-next-line no-unused-vars
  handleModify: (newParameter: SortParameter['parameter']) => void;
}) => {
  return (
    <Stack>
      <Select
        value={parameter}
        sx={{
          '.MuiSelect-select': { padding: '4px 0 4px 12px', fontSize: '14px' },
        }}
        onChange={(e) =>
          handleModify(e.target.value as SortParameter['parameter'])
        }
      >
        {CANDIDATE_SORT.map((o, i) => (
          <MenuItem key={i} value={o} className={'SORTBODY-Include'}>
            {capitalize(o)}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

export default SortJobApplications;
