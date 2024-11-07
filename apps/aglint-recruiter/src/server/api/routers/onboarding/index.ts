import { createTRPCRouter } from '../../trpc';
import { getOnboard } from './read';

export const onboarding = createTRPCRouter({
  getOnboard,
});
