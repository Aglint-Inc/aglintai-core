/* eslint-disable security/detect-object-injection */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { useRequests } from '@/src/context/RequestsContext';
import { Request, RequestResponse } from '@/src/queries/requests/types';

import Section from './Section';

function RequestSections() {
  const {
    requests: { data, isPlaceholderData, isFetched },
    filters,
  } = useRequests();
  const defaults = sectionDefaultsData.map(
    // eslint-disable-next-line no-unused-vars
    ({ requests, sectionName, ...rest }) => ({
      ...rest,
      sectionName,
      requests: data?.[sectionName],
    }),
  );

  const isFilterApplied =
    filters.status.length > 0 ||
    filters.type.length > 0 ||
    !!filters.title ||
    filters.jobs.length > 0 ||
    filters.applications.length > 0;

  if (
    isFilterApplied &&
    isFetched &&
    defaults.flatMap((d) => d.requests).length === 0
  )
    return (
      <>
        <GlobalEmptyState iconName='task_alt' textDesc='No results found' />
      </>
    );

  return (
    <>
      {defaults.map(({ color, requests, sectionIconName, sectionName }) => {
        if (isFilterApplied && isFetched && (requests ?? []).length === 0)
          return <></>;
        return (
          <section
            style={{
              paddingTop: '20px',
            }}
            data-req-section={sectionName}
            key={sectionName}
          >
            <Section
              requests={[...requests]}
              sectionName={sectionName}
              sectionIconName={sectionIconName}
              color={color}
              isLoadingRequests={isPlaceholderData}
            />
          </section>
        );
      })}
      <section
        data-req-section='back'
        style={{ minHeight: '10px', padding: '20px' }}
      ></section>
    </>
  );
}

export default RequestSections;

export const sectionDefaultsData = [
  {
    requests: [],
    sectionName: 'urgent_request',
    sectionIconName: 'flag_2',
    color: 'warning',
  },
  {
    requests: [],
    sectionName: 'schedule_request',

    sectionIconName: 'calendar_add_on',
    color: 'neutral',
  },
  {
    requests: [],
    sectionName: 'reschedule_request',

    sectionIconName: 'event_repeat',
    color: 'neutral',
  },
  {
    requests: [],
    sectionName: 'cancel_schedule_request',

    sectionIconName: 'event_busy',
    color: 'neutral',
  },
  {
    requests: [],
    sectionName: 'decline_request',

    sectionIconName: 'free_cancellation',
    color: 'neutral',
  },
  {
    requests: [],
    sectionName: 'completed_request',

    sectionIconName: 'check_circle',
    color: 'success',
  },
] as readonly {
  requests: Request[];
  sectionName: keyof RequestResponse;
  sectionIconName: string;
  color: string;
}[];
