import { getRequestProgress, getRequests } from '.';

export type Request = Awaited<ReturnType<typeof getRequests>>[number];

export type RequestProgress = Awaited<
  ReturnType<typeof getRequestProgress>
>[number];
