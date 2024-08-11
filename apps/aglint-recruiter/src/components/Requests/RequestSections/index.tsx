/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Collapse } from '@mui/material';
import React, { useEffect } from 'react';

import { useRequests } from '@/src/context/RequestsContext';
import { useRouterPro } from '@/src/hooks/useRouterPro';
import { Request as RequestType } from '@/src/queries/requests/types';

import Section from './Section';

function RequestSections() {
  const [isLoadingRequests, setIsLoadingRequests] = React.useState(true);
  const { queryParams } = useRouterPro();
  const {
    requests: { status, data: requestList },
  } = useRequests();
  const [sectionsData, setSectionsData] = React.useState(
    sectionDefaultsData(queryParams.section),
  );
  useEffect(() => {
    if (requestList?.length) {
      const updatedSections = sectionDefaultsData(queryParams.section).map(
        (section) => {
          if (status === 'success' && requestList.length > 0) {
            section.requests = requestList.filter(
              ({ priority, type, status }) => {
                if (section.sectionName === 'urgent') {
                  return priority === 'urgent' && status !== 'completed';
                }
                if (section.sectionName === 'completed') {
                  return status === 'completed';
                }
                return type === section.sectionName && status !== 'completed';
              },
            );
          }
          return section;
        },
      );

      setSectionsData(updatedSections);
    }
    setIsLoadingRequests(false);
  }, [requestList]);
  function handleOpenCollapsed(i: number) {
    setSectionsData((pre) => {
      pre[Number(i)].isCollapsed = !pre[Number(i)].isCollapsed;
      return [...pre];
    });
  }
  return (
    <>
      {sectionsData.map(
        ({ requests, sectionName, sectionIconName, isCollapsed, color }, i) => (
          <div
            key={i}
            style={{
              padding: '12px',
              backgroundColor: 'var(--neutral-2)',
              borderRadius: '8px',
            }}
          >
            <Collapse
              onClick={() => {
                handleOpenCollapsed(i);
              }}
              collapsedSize={20}
              key={i}
              in={isCollapsed}
            >
              <Section
                requests={requests}
                sectionName={sectionName}
                sectionIconName={sectionIconName}
                color={color}
                isLoadingRequests={isLoadingRequests}
              />
            </Collapse>
          </div>
        ),
      )}
    </>
  );
}

export default RequestSections;

const sectionDefaultsData = (param) => [
  {
    requests: [],
    sectionName: 'urgent' as RequestType['priority'],
    isCollapsed: param === 'urgent',
    sectionIconName: 'flag_2',
    color: 'warning',
  },
  {
    requests: [],
    sectionName: 'schedule_request' as RequestType['type'],
    isCollapsed: param === 'schedule_request',
    sectionIconName: 'calendar_add_on',
    color: 'neutral',
  },
  {
    requests: [],
    sectionName: 'reschedule_request' as RequestType['type'],
    isCollapsed: param === 'reschedule_request',
    sectionIconName: 'event_repeat',
    color: 'neutral',
  },
  {
    requests: [],
    sectionName: 'cancel_schedule_request' as RequestType['type'],
    isCollapsed: param === 'cancel_schedule_request',
    sectionIconName: 'event_busy',
    color: 'neutral',
  },
  {
    requests: [],
    sectionName: 'decline_request' as RequestType['type'],
    isCollapsed: param === 'decline_request',
    sectionIconName: 'free_cancellation',
    color: 'neutral',
  },
  {
    requests: [],
    sectionName: 'completed' as RequestType['status'],
    isCollapsed: param === 'completed',
    sectionIconName: 'check_circle',
    color: 'success',
  },
];
