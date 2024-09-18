import { Command } from '@components/ui/command';

import { useCreateRequesJobsPrefetch } from '../../hooks';
import { List } from './list';
import { Search } from './search';

export const RequestType = () => {
  void useCreateRequesJobsPrefetch();
  return (
    <Command>
      <Search />
      <List />
    </Command>
  );
};
