import { useRequests } from '@/src/context/RequestsContext';

import { Request } from './Request';

const Body = () => {
  const {
    requests: { data, status },
  } = useRequests();
  if (status === 'error') return <>Error</>;
  if (status === 'pending') return <>Loading...</>;
  return (data ?? []).map((props, i) => (
    <Request key={props?.id ?? i} {...props} />
  ));
};

export default Body;
