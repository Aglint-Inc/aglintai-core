/* eslint-disable security/detect-object-injection */
import { MenuItem, Select, Stack } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import {
  CandidateFilter,
  CandidateFilterBody,
  CandidateFilterOption,
} from '@/devlink2';
import AUIButton from '@/src/components/Common/AUIButton';
import UITextField from '@/src/components/Common/UITextField';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import { JobApplicationSections } from '@/src/context/JobApplicationsContext/types';
import { CountJobs } from '@/src/context/JobsContext/types';

import {
  getBoundingSingleStatus,
  getBoundingStatus,
  useMouseClick,
} from '../../hooks';
import { CANDIDATE_FILTERS, capitalize, FilterParameter } from '../../utils';

const FilterJobApplications = ({
  setApplicationLimit,
}: {
  setApplicationLimit: Dispatch<SetStateAction<CountJobs>>;
}) => {
  const {
    searchParameters,
    handleJobApplicationFilter,
    applicationDisable,
    section,
  } = useJobApplications();
  const [filterVisibility, setFilterVisibility] = useState(false);
  const modifiedFilters = searchParameters.filter.reduce((acc, curr) => {
    if (
      !(
        section === JobApplicationSections.NEW &&
        curr.parameter === 'interview_score'
      )
    )
      acc.push(curr);
    return acc;
  }, []);
  const [filters, setFilters] = useState([...modifiedFilters]);
  const filterCount = modifiedFilters.length;
  const handleClose = () => {
    if (filterVisibility) {
      setFilterVisibility(false);
      setFilters([...modifiedFilters]);
    }
  };

  useEffect(() => {
    setFilters([...modifiedFilters]);
  }, [section]);

  const handleReset = async () => {
    if (!applicationDisable) {
      const { confirmation, count } = await handleJobApplicationFilter({
        ...searchParameters,
        filter:
          section === JobApplicationSections.NEW
            ? searchParameters.filter.reduce((acc, curr) => {
                if (curr.parameter === 'interview_score') acc.push(curr);
                return acc;
              }, [])
            : [],
      });
      if (confirmation) {
        setApplicationLimit(count);
        setFilters([]);
      }
    }
  };
  return (
    <Stack id={'FILTERPARENT'}>
      <CandidateFilter
        onclickReset={{
          onClick: async () => await handleReset(),
        }}
        isResetVisible={filterCount > 0}
        filterCount={filterCount}
        isCountVisible={filterCount > 0}
        filterHeaderProps={{
          onClick: () => {
            if (!filterVisibility) setFilterVisibility(true);
          },
        }}
        slotBody={
          <ApplicationFilterBody
            filters={filters}
            setFilters={setFilters}
            handleClose={handleClose}
            setApplicationLimit={setApplicationLimit}
          />
        }
        isFilterBodyVisible={filterVisibility}
      />
    </Stack>
  );
};

const ApplicationFilterBody = ({
  filters,
  setFilters,
  handleClose,
  setApplicationLimit,
}: {
  filters: FilterParameter[];
  setFilters: Dispatch<SetStateAction<FilterParameter[]>>;
  handleClose: () => void;
  setApplicationLimit: Dispatch<SetStateAction<CountJobs>>;
}) => {
  const {
    searchParameters,
    handleJobApplicationFilter,
    applicationDisable,
    setApplicationDisable,
    section,
  } = useJobApplications();
  const handleAddFilter = () => {
    setFilters((prev) => {
      return [
        ...prev,
        { parameter: 'resume_score', condition: '>', count: null },
      ];
    });
  };

  const handleSubmit = async () => {
    if (!applicationDisable) {
      setApplicationDisable(true);
      const { confirmation, count } = await handleJobApplicationFilter({
        ...searchParameters,
        filter: [
          ...filters,
          ...searchParameters.filter.reduce((acc, curr) => {
            if (
              section === JobApplicationSections.NEW &&
              curr.parameter === 'interview_score'
            )
              acc.push(curr);
            return acc;
          }, []),
        ],
      });
      if (confirmation) {
        setApplicationLimit(count);
      }
      setApplicationDisable(false);
    }
  };
  const disabled =
    (filters.length === 0 && searchParameters.filter.length === 0) ||
    filters.reduce((acc, curr, i) => {
      if (acc || curr.count === null) {
        return true;
      } else if (
        i + 1 > searchParameters.filter.length ||
        curr.condition !== searchParameters.filter[i].condition ||
        curr.count !== searchParameters.filter[i].count ||
        curr.parameter !== searchParameters.filter[i].parameter
      ) {
        return false;
      }
    }, false);
  const filterButtons = (
    <Stack flexDirection={'row'} justifyContent={'space-between'}>
      <AUIButton onClick={() => handleAddFilter()}>Add filter</AUIButton>
      <AUIButton
        onClick={async () => await handleSubmit()}
        disabled={disabled || applicationDisable}
      >
        Apply filters
      </AUIButton>
    </Stack>
  );
  const clickData = useMouseClick();
  useEffect(() => {
    if (clickData.click && clickData.x !== -1 && clickData.y !== -1) {
      if (getBoundingSingleStatus('FILTERPARENT', clickData.x, clickData.y))
        setTimeout(() => handleClose(), 400);
      else if (!getBoundingStatus('FILTERBODY', clickData.x, clickData.y))
        handleClose();
    }
  }, [clickData.click]);
  return (
    <Stack id={'FILTERBODY'}>
      <CandidateFilterBody
        slotFilters={
          filters.length !== 0 ? (
            <CandidateFilters filters={filters} setFilters={setFilters} />
          ) : null
        }
        slotButtons={filterButtons}
      />
    </Stack>
  );
};

const CandidateFilters = ({
  filters,
  setFilters,
}: {
  filters: FilterParameter[];
  setFilters: Dispatch<SetStateAction<FilterParameter[]>>;
}) => {
  const handleRemove = (index: number) => {
    setFilters((prev) => prev.filter((f, i) => i !== index));
  };
  const handleModify = (index: number, newFilter: FilterParameter) => {
    setFilters((prev) =>
      prev.reduce((acc, curr, i) => {
        if (index === i) acc.push(newFilter);
        else acc.push(curr);
        return acc;
      }, []),
    );
  };
  return (
    <>
      {filters.map((f, i) => (
        <CandidateFilterOptionComp
          key={i}
          filter={f}
          index={i}
          handleRemove={(i) => handleRemove(i)}
          handleModify={(i, n) => handleModify(i, n)}
        />
      ))}
    </>
  );
};

const CandidateFilterOptionComp = ({
  filter,
  index,
  handleRemove,
  handleModify,
}: {
  filter: FilterParameter;
  index: number;
  // eslint-disable-next-line no-unused-vars
  handleRemove: (index: number) => void;
  // eslint-disable-next-line no-unused-vars
  handleModify: (index: number, newFilter: FilterParameter) => void;
}) => {
  return (
    <CandidateFilterOption
      onclickRemove={{ onClick: () => handleRemove(index) }}
      slotInputs={
        <CandidateFilterInputs
          filter={filter}
          handleModify={(n) => handleModify(index, n)}
        />
      }
    />
  );
};

const CandidateFilterInputs = ({
  filter,
  handleModify,
}: {
  filter: FilterParameter; // eslint-disable-next-line no-unused-vars
  handleModify: (newFilter: FilterParameter) => void;
}) => {
  return (
    <>
      <CandidateFilterPrimaryDropDown
        parameter={filter.parameter}
        handleModify={(e) => handleModify({ ...filter, parameter: e })}
      />
      <CandidateFilterSecondaryDropDown
        condition={filter.condition}
        handleModify={(e) => handleModify({ ...filter, condition: e })}
      />
      <CandidateFilterEntry
        count={filter.count}
        handleModify={(e) => handleModify({ ...filter, count: e })}
      />
    </>
  );
};

const CandidateFilterPrimaryDropDown = ({
  parameter,
  handleModify,
}: {
  parameter: FilterParameter['parameter'];
  // eslint-disable-next-line no-unused-vars
  handleModify: (newParameter: FilterParameter['parameter']) => void;
}) => {
  const { section } = useJobApplications();
  return (
    <Select
      value={parameter}
      sx={{
        '.MuiSelect-select': { padding: '4px 0 4px 12px', fontSize: '14px' },
      }}
      onChange={(e) =>
        handleModify(e.target.value as FilterParameter['parameter'])
      }
    >
      {CANDIDATE_FILTERS.parameters.reduce((acc, curr, i) => {
        if (
          !(
            curr === 'interview_score' && section === JobApplicationSections.NEW
          )
        )
          acc.push(
            <MenuItem key={i} value={curr} className={'FILTERBODY-Include'}>
              {capitalize(curr)}
            </MenuItem>,
          );
        return acc;
      }, [])}
    </Select>
  );
};
const CandidateFilterSecondaryDropDown = ({
  condition,
  handleModify,
}: {
  condition: FilterParameter['condition'];
  // eslint-disable-next-line no-unused-vars
  handleModify: (newCondition: FilterParameter['condition']) => void;
}) => {
  const getSupportText = (o) => {
    switch (o) {
      case '=':
        return 'Equals';
      case '<>':
        return 'Not equals';
      case '<':
        return 'Less than';
      case '<=':
        return 'Less than or equal';
      case '>':
        return 'Greater than';
      case '>=':
        return 'Greater than or equal';
      default:
        return capitalize(o);
    }
  };
  return (
    <Select
      value={condition}
      sx={{
        '.MuiSelect-select': { padding: '4px 0 4px 12px', fontSize: '14px' },
      }}
      onChange={(e) =>
        handleModify(e.target.value as FilterParameter['condition'])
      }
    >
      {CANDIDATE_FILTERS.conditions.map((o, i) => (
        <MenuItem key={i} value={o} className={'FILTERBODY-Include'}>
          {getSupportText(o)}
        </MenuItem>
      ))}
    </Select>
  );
};
const CandidateFilterEntry = ({
  count,
  handleModify,
}: {
  count: number;
  // eslint-disable-next-line no-unused-vars
  handleModify: (count: FilterParameter['count']) => void;
}) => {
  const validate = (e) => {
    if (e === '') return null;
    return e;
  };
  return (
    <UITextField
      defaultValue={count}
      type='number'
      onChange={(e) =>
        handleModify(
          validate(e.target.value) as unknown as FilterParameter['count'],
        )
      }
    />
  );
};

export default FilterJobApplications;
