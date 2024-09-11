import { createTRPCRouter } from '../../trpc';
import { selfScheduleInstruction } from './selfScheduleInstruction';

export const textTransform = createTRPCRouter({
  selfScheduleInstruction,
});
