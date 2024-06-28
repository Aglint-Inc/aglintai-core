import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { capitalize } from '@/src/utils/text/textUtils';

import { type Section, getIconName } from '../../../utils';

export const EmptyDetailState = ({ section }: { section: Section }) => {
  return (
    <GlobalEmptyState
      iconName={getIconName(section)}
      textDesc={`No ${capitalize(section)} found`}
      styleEmpty={{ style: { backgroundColor: 'var(--neutral-2)' } }}
    />
  );
};
