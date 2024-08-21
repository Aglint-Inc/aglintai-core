import { memo } from 'react';

import { NoData } from '@/devlink3/NoData';

export const Empty = memo(() => <NoData />);
Empty.displayName = 'Empty';
