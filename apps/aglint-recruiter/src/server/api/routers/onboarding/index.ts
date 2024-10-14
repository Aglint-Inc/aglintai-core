import { createTRPCRouter } from '../../trpc';
import { getOnboard } from './getOnboard';

export const onboarding = createTRPCRouter({
  getOnboard,
});
