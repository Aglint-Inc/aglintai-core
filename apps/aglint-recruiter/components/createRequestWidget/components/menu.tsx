import { useCreateRequest } from '../hooks';
import { Jobs } from './jobs';
import { RequestType } from './requestType';

export const Menu = () => {
  const step = useCreateRequest((state) => state.step);
  if (step === 0) return <RequestType />;
  if (step === 1) return <Jobs />;
  return <></>;
};
