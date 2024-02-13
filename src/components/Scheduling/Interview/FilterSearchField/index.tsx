import React from 'react';

import UITextField from '@/src/components/Common/UITextField';

import { setFilter } from '../store';

function FilterSearchField() {
  return (
    <>
      <UITextField
        placeholder='Search in all interviews'
        onChange={(e) => {
          setFilter({ textSearch: e.target.value });
        }}
      />
    </>
  );
}

export default FilterSearchField;
