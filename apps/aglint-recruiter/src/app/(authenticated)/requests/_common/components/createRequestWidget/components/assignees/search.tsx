import { useCreateRequest, useCreateRequestActions } from '../../hooks';
import { RequestSearch } from '../common/requestSearch';

export const Search = () => {
  const search = useCreateRequest((state) => state.payloads.assignees.search);
  const { setAssigneeSearch } = useCreateRequestActions();
  return (
    <RequestSearch
      search={search}
      setSearch={setAssigneeSearch}
      placeholder='Whom to assign?'
    />
  );
};
