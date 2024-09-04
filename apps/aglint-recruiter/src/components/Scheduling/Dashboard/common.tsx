import { NoData } from '@devlink3/NoData';
import { memo } from 'react';

export const Empty = memo(() => <NoData />);
Empty.displayName = 'Empty';
