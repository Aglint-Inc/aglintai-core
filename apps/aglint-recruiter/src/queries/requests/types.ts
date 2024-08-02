import { getRequestProgress, getRequests } from '.';

export type RequestQueryParams = {
  assigner_id: string;
};

export type RequestProgressQueryParams = {
  request_id: string;
};

export type Request = Awaited<ReturnType<typeof getRequests>>[number];

export type RequestProgress = Awaited<
  ReturnType<typeof getRequestProgress>
>[number];
