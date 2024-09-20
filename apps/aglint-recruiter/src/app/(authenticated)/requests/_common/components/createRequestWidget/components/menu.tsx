import { useCreateRequest } from '../hooks';
import { Assignees } from './assignees';
import { Candidates } from './candidates';
import { Final } from './final';
import { Jobs } from './jobs';
import { RequestType } from './requestType';
import { Schedules } from './schedules';

export const Menu = () => {
  const step = useCreateRequest((state) => state.step);
  if (step === 0) return <RequestType />;
  if (step === 1) return <Jobs />;
  if (step === 2) return <Candidates />;
  if (step === 3) return <Schedules />;
  if (step === 4) return <Assignees />;
  if (step === 5) return <Final />;
  return <></>;
};
