import { useCreateRequest } from '../hooks';
import { Candidates } from './candidates';
import { Jobs } from './jobs';
import { RequestType } from './requestType';
import { Schedules } from './schedules';

export const Menu = () => {
  const step = useCreateRequest((state) => state.step);
  if (step === 0) return <RequestType />;
  if (step === 1) return <Jobs />;
  if (step === 2) return <Candidates />;
  if (step === 3) return <Schedules />;
  return <></>;
};
