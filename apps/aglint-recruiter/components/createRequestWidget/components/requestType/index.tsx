import { useCreateRequesJobsPrefetch } from '@components/createRequestWidget/hooks';
import { Command } from '@components/ui/command';

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
