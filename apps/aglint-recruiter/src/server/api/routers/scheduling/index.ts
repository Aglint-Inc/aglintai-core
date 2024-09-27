import { createTRPCRouter } from '../../trpc';
import { scheduleDetails } from './details';
import { v1 } from './v1';

export const scheduling = createTRPCRouter({
  v1,
  details: scheduleDetails,
});
