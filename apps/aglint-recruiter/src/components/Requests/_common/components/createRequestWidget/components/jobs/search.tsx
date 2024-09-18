import { memo } from 'react';

import { useCreateRequest, useCreateRequestActions } from '../../hooks';
import { RequestSearch } from '../common/requestSearch';

export const Search = memo(() => {
  const search = useCreateRequest((state) => state.payloads.jobs.search);
  const { setJobSearch } = useCreateRequestActions();
  return (
    <RequestSearch
      search={search}
      setSearch={setJobSearch}
      placeholder='Which job?'
    />
  );
});
Search.displayName = 'Search';
