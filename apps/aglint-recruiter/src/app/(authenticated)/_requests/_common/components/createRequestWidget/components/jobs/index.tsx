import { Command } from '@components/ui/command';

import { List } from './list';
import { Search } from './search';

export const Jobs = () => {
  return (
    <Command>
      <Search />
      <List />
    </Command>
  );
};
