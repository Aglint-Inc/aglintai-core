import { memo } from 'react';

import { useCreateRequest, useCreateRequestActions } from '../../hooks';
import { RequestSearch } from '../common/requestSearch';

export const Search = memo(() => {
  const search = useCreateRequest((state) => state.payloads.candidate.search);
  const { setCandidateSearch } = useCreateRequestActions();
  return (
    <RequestSearch
      search={search}
      setSearch={setCandidateSearch}
      placeholder='Which candidate?'
    />
  );
});
Search.displayName = 'Search';
