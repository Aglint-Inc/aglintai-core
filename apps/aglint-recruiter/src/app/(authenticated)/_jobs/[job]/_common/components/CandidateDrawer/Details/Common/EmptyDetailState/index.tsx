
import { GlobalEmptyState } from '@devlink/GlobalEmptyState';

import { capitalize } from '@/utils/text/textUtils';

import { getIconName, type Section } from '../../../utils';

export const EmptyDetailState = ({ section }: { section: Section }) => {
  return (
    <>
    <GlobalEmptyState
      iconName={getIconName(section)}
      textDesc={`No ${capitalize(section)} found`}
      styleEmpty={{ style: { backgroundColor: 'var(--neutral-2)' } }}
    />
    </>
    
  );
};
