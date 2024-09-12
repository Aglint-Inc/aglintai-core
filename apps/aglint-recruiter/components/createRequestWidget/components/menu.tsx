import { useCreateRequest } from '../hooks';
import { Jobs } from './jobs';
import { RequestType } from './requestType';

export const Menu = () => {
  const selections = useCreateRequest((state) => state.selections);
  if (!selections.requestType) return <RequestType />;
  if (!selections.jobs) return <Jobs />;
  return <></>;
};
