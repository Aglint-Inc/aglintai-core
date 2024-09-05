import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { IconButtonSoft } from '@devlink/IconButtonSoft';
import React from 'react';

import UITextField from '@/components/Common/UITextField';

interface CustomSocialFieldProps {
  socialName: string;
  value: string;
  error: { error: boolean; msg: string };
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  onDelete: () => void;
  setError: React.Dispatch<React.SetStateAction<any>>;
}

const CustomSocialField: React.FC<CustomSocialFieldProps> = ({
  socialName,
  value,
  error,
  onChange,
  onDelete,
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <UITextField
          labelSize='medium'
          fullWidth
          value={value}
          placeholder={`${socialName}`}
          onBlur={() => onChange(value)}
          onChange={(e) => onChange(e.target.value)}
          error={error?.error}
          helperText={error?.msg}
        />
      </TooltipTrigger>
      <TooltipContent>
        <IconButtonSoft
          iconName='delete'
          color='error'
          iconColor='error'
          onClickButton={onDelete}
        />
      </TooltipContent>
    </Tooltip>
  );
};

export default CustomSocialField;
