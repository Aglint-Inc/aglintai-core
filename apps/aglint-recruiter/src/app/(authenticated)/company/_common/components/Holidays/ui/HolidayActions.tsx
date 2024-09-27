import { Plus } from 'lucide-react';
import React from 'react';

import { UIButton } from '@/components/Common/UIButton';

type Props = Parameters<typeof UIButton>[0];

export const HolidayActions = (props: Props) => {
  return (
    <UIButton {...props} size='sm' leftIcon={<Plus />} variant='default'>
      Add Day Off
    </UIButton>
  );
};
