import { memo } from 'react';

import { useCreateRequest, useCreateRequestActions } from '../../hooks';
import { RequestSearch } from '../common/requestSearch';

export const Search = memo(() => {
  const search = useCreateRequest((state) => state.payloads.schedules.search);
  const { setScheduleSearch } = useCreateRequestActions();
  return (
    <RequestSearch
      search={search}
      setSearch={setScheduleSearch}
      placeholder='Which schedules?'
    />
  );
});
Search.displayName = 'Search';
