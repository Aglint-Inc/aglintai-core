import { Stack } from '@mui/material';
import { PropsWithChildren } from 'react';

import { RequestProvider, useRequest } from '@/src/context/RequestContext';
import { Request, RequestProgress } from '@/src/queries/requests/types';

const Progression = ({ id }: PropsWithChildren<Pick<Request, 'id'>>) => {
  return (
    <RequestProvider request_id={id}>
      <List />
    </RequestProvider>
  );
};

export default Progression;

const List = () => {
  const {
    request_progress: { data, status },
  } = useRequest();
  if (status === 'error') return <>Error</>;
  if (status === 'pending') return <>Loading...</>;
  return (
    <Stack>
      {(data ?? []).map((props, i) => (
        <Progress key={i} {...props} />
      ))}
    </Stack>
  );
};

const Progress = (props: PropsWithChildren<RequestProgress>) => {
  return (
    <Stack>
      {JSON.stringify(props)}
      <Stack>---</Stack>
    </Stack>
  );
};
