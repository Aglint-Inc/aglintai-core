import { createTRPCRouter } from '../../trpc';
import { geoCodeLocation } from './google/geoCodeLocation';

export const utility = createTRPCRouter({
  geoCodeLocation,
});
