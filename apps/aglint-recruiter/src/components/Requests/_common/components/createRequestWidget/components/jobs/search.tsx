import { useCreateRequest, useCreateRequestActions } from '../../hooks';
import { RequestSearch } from '../common/requestSearch';

export const Search = () => {
  const search = useCreateRequest((state) => state.payloads.jobs.search);
  const { setJobSearch } = useCreateRequestActions();
  return (
    <RequestSearch
      search={search}
      setSearch={setJobSearch}
      placeholder='Which job?'
    />
  );
};
