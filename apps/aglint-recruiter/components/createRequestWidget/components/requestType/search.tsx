import {
  useCreateRequest,
  useCreateRequestActions,
} from '@components/createRequestWidget/hooks';
import { CommandInput } from '@components/ui/command';

export const Search = () => {
  const search = useCreateRequest((state) => state.payloads.requestType.search);
  const { setRequestTypeSearch } = useCreateRequestActions();
  return (
    <CommandInput
      placeholder='What type of request?'
      value={search}
      onValueChange={setRequestTypeSearch}
    />
  );
};
