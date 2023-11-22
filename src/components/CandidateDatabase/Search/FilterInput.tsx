import { Paper } from '@mui/material';
import { isNumber } from 'lodash';
import React, { useState } from 'react';

import { AddPreference } from '@/devlink';

import { dialogFormContent } from '../data';
import UITextField from '../../Common/UITextField';

const FilterInput = ({
  type = 'string',
  handleAdd,
  path,
}: {
  type?: 'string' | 'number';
  // eslint-disable-next-line no-unused-vars
  handleAdd: (s: any) => void;
  path: string;
}) => {
  const [input, setInput] = useState<string | number>(
    type == 'number' ? 0 : '',
  );

  const handleSubmit = () => {
    if (String(input).length === 0) return;
    handleAdd(input);
    type === 'string' && setInput('');
    type === 'number' && setInput(0);
  };
  return (
    <>
      <div style={{ position: 'relative' }}>
        <UITextField
          value={input ?? ''}
          onChange={(e) => {
            if (type === 'number' && isNumber(e.target.value)) {
              setInput(Number(e.target.value));
            } else {
              setInput(e.target.value);
            }
          }}
          placeholder={dialogFormContent[String(path)]?.placeholder}
          type={type}
          InputProps={{
            onKeyDown: (e) => {
              if (e.code === 'Enter') {
                handleSubmit();
              }
            },
          }}
        />
        {String(input).length > 0 && (
          <Paper
            sx={{
              mt: 0.5,
              position: 'absolute',
              width: '100%',
              border: 'none',
            }}
          >
            <AddPreference
              textPreference={input}
              onClickAddPreference={{
                onClick: handleSubmit,
              }}
            />
          </Paper>
        )}
      </div>
    </>
  );
};

export default FilterInput;
