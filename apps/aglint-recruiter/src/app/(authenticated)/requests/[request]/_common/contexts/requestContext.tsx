'use client';

import { getRequestFormattedDetails } from '@request/utils/getRequestFormattedDetails';
import { useRequests } from '@requests/hooks/useRequests';
import { useQuery } from '@tanstack/react-query';
import { createContext, type PropsWithChildren } from 'react';
import { useCallback, useMemo, useState } from 'react';

import { useRouterPro } from '@/hooks/useRouterPro';
import { requestQueries } from '@/queries/requests';

type RequestParams = Parameters<(typeof requestQueries)['request_progress']>[0];

const useRequestContext = ({ request_id }: RequestParams) => {
  const { pathName } = useRouterPro();
  const isRequestPage = useMemo(() => {
    return !!request_id && pathName === '/requests/[request]';
  }, [pathName, request_id]);
  const [collapse, setCollapse] = useState(false);

  const {
    handleUpdateRequest: updateRequest,
    handleAsyncUpdateRequest: asyncUpdateRequest,
    handleDeleteRequest: deleteRequest,
    handleAsyncDeleteRequest: asyncDeleteRequest,
    mutationQueue,
    requests: { data: requests },
  } = useRequests();

  const enabled = isRequestPage || collapse;

  const request_progress = useQuery(
    requestQueries.request_progress({
      request_id,
      enabled,
    }),
  );

  const request_workflow = useQuery(
    requestQueries.request_workflow({ request_id, enabled }),
  );

  const requestDetails = useMemo(() => {
    return Object.values(requests!)
      .flat()
      ?.find((request) => request.id === request_id);
  }, [requests, request_id]);

  const handleUpdateRequest = useCallback(
    (
      requestPayload: Parameters<
        typeof updateRequest
      >[0]['payload']['requestPayload'],
    ) =>
      updateRequest({
        payload: { requestId: request_id, requestPayload },
      }),
    [request_id, updateRequest],
  );

  const handleAsyncUpdateRequest = useCallback(
    async (
      requestPayload: Parameters<
        typeof asyncUpdateRequest
      >[0]['payload']['requestPayload'],
    ) =>
      await asyncUpdateRequest({
        payload: { requestId: request_id, requestPayload },
      }),
    [request_id, asyncUpdateRequest],
  );
  const handleDeleteRequest = useCallback(
    () =>
      deleteRequest({
        payload: { requestId: request_id },
      }),
    [request_id, deleteRequest],
  );
  const handleAsyncDeleteRequest = useCallback(
    async () =>
      await asyncDeleteRequest({
        payload: { requestId: request_id },
      }),
    [request_id, asyncUpdateRequest],
  );

  const isMutating = useMemo(
    () => mutationQueue.includes(request_id),
    [mutationQueue, request_id],
  );

  const getSimpReqStatus = useCallback(() => {
    return getRequestFormattedDetails({
      request_progress: request_progress.data!,
      request_workflow: request_workflow.data!,
      is_slack_enabled: false,
      is_workflow_enabled: true,
    });
  }, [request_progress.data, request_workflow.data]);

  return {
    progressMetaInfo: getSimpReqStatus(),
    request_progress: {
      ...request_progress,
      data: request_progress.data ?? [],
    },
    request_workflow: {
      ...request_workflow,
      data: request_workflow.data ?? [],
    },
    handleDeleteRequest,
    handleAsyncDeleteRequest,
    handleUpdateRequest,
    handleAsyncUpdateRequest,
    isMutating,
    collapse,
    setCollapse,
    requestDetails: requestDetails!,
  };
};

type RequestContextType = typeof useRequestContext;

export const RequestContext = createContext<
  ReturnType<RequestContextType> | undefined
>(undefined);

export const RequestProvider = (
  props: PropsWithChildren<Parameters<RequestContextType>['0']>,
) => {
  const value = useRequestContext(props);
  return (
    <RequestContext.Provider value={value}>
      {props.children}
    </RequestContext.Provider>
  );
};
