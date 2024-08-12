import { getRequestProgress, getRequests, getUnfilteredRequests } from '.';

export type Request = Awaited<ReturnType<typeof getUnfilteredRequests>>[number];

export type RequestResponse = Awaited<ReturnType<typeof getRequests>>;

export type RequestProgress = Awaited<
  ReturnType<typeof getRequestProgress>
>[number];
