import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { isNumber } from 'lodash';
import { useState } from 'react';

import UITextField from '../../../Common/UITextField';
import { AddPreference } from './_common/AddPreference';
import { dialogFormContent } from './utils';

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

  const [, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosePop = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div style={{ position: 'relative' }}>
        <Popover>
          <PopoverTrigger asChild>
            <div />{' '}
            {/* Empty div as trigger, actual trigger is the UITextField */}
          </PopoverTrigger>
          <PopoverContent
            className='rounded-xl p-0 shadow-md'
            align='start'
            side='bottom'
            sideOffset={5}
          >
            {String(input).length > 0 && (
              <AddPreference
                textPreference={input}
                onClickAddPreference={{
                  onClick: handleSubmit,
                }}
              />
            )}
          </PopoverContent>
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
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              handleSubmit();
              handleClosePop();
            }
          }}
        />
      </div>
    </>
  );
};

export default FilterInput;
