import { CommandInput } from '@components/ui/command';

import { useCreateRequest, useCreateRequestActions } from '../../hooks';

export const Search = () => {
  const search = useCreateRequest((state) => state.payloads.requestType.search);
  const { setRequestTypeSearch } = useCreateRequestActions();
  return (
    <CommandInput
      value={search}
      onValueChange={setRequestTypeSearch}
      placeholder='What type of request?'
    />
  );
};
