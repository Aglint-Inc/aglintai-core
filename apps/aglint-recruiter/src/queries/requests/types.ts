import { type getRequestProgress, type getRequests, type getUnfilteredRequests } from '.';

export type Request = Awaited<ReturnType<typeof getUnfilteredRequests>>[number];

export type RequestResponse = ReturnType<typeof getRequests>;

export type RequestProgress = Awaited<
  ReturnType<typeof getRequestProgress>
>[number];
