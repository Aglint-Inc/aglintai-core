import { Popover } from '@mui/material';
import { isNumber } from 'lodash';
import { useState } from 'react';

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
    handleClosePop();
    if (String(input).length === 0) return;
    handleAdd(input);
    type === 'string' && setInput('');
    type === 'number' && setInput(0);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosePop = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div style={{ position: 'relative' }}>
        <Popover
          disableAutoFocus
          id='filter-input'
          open={open}
          anchorEl={anchorEl}
          onClose={handleClosePop}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{ vertical: -14, horizontal: 0 }}
          slotProps={{
            paper: {
              style: {
                border: 'none',
                borderRadius: '10px',
                boxShadow: '0px 4px 8px 0px rgba(4, 68, 77, 0.15)',
              },
            },
          }}
        >
          {String(input).length > 0 && (
            <AddPreference
              textPreference={input}
              onClickAddPreference={{
                onClick: handleSubmit,
              }}
            />
          )}
        </Popover>
        <UITextField
          value={input ?? ''}
          onChange={(e) => {
            if (type === 'number' && isNumber(e.target.value)) {
              setInput(Number(e.target.value));
            } else {
              setInput(e.target.value);
            }
            if (String(e.target.value).length === 0) {
              handleClosePop();
            } else {
              handleClick(e);
            }
          }}
          placeholder={dialogFormContent[String(path)]?.placeholder}
          type={type}
          InputProps={{
            onKeyDown: (e) => {
              if (e.code === 'Enter') {
                handleSubmit();
                handleClosePop();
              }
            },
          }}
        />
      </div>
    </>
  );
};

export default FilterInput;
