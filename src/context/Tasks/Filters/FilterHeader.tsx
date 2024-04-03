import { InputAdornment } from '@mui/material';
import { Stack } from '@mui/system';
import React, { ReactNode } from 'react';

import Icon from '@/src/components/Common/Icons/Icon';
import UITextField from '@/src/components/Common/UITextField';
import FilterDropDown from '@/src/components/CompanyDetailComp/TeamManagement/FilterDropDown';

type FilterType<T> = {
  name: string;
  icon?: ReactNode;
  options: T[];
  value: T[];
  // eslint-disable-next-line no-unused-vars
  setValue: (value: T[]) => void;
};

export const FilterHeader = ({
  search,
  filters,
}: {
  search?: {
    value: string;
    // eslint-disable-next-line no-unused-vars
    setValue: (x: string) => void;
    placeholder?: string;
  };
  filters: FilterType<string>[];
}) => {
  return (
    <Stack direction={'row'} gap={1} px={2}>
      {Boolean(search) && (
        <Stack marginRight={5}>
          <UITextField
            width='400px'
            value={search.value}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Icon variant='JobSearch' height='14' />
                </InputAdornment>
              ),
            }}
            placeholder={search.placeholder}
            onChange={(e) => {
              search.setValue(e.target.value);
            }}
            borderRadius={10}
            height={42}
          />
        </Stack>
      )}
      {filters.map((filter, index) => (
        <FilterDropDown
          key={index}
          title={filter.name}
          itemList={filter.options}
          selectedItems={filter.value}
          setSelectedItems={(callback) => {
            filter.setValue(callback(filter.value));
          }}
          icon={filter.icon}
        />
      ))}
    </Stack>
  );
};
