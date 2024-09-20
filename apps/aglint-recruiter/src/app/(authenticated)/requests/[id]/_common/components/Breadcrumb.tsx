/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import React from 'react';

import ROUTES from '@/utils/routing/routes';

interface BreadcrumbComponentProps {
  selectedRequest: {
    request_relation: Array<{ interview_session: { name: string } }>;
    application_id: string;
  };
  jobDetails: { id: string };
  candidateDetails: { first_name: string; last_name: string };
}

const RequestDetailsBreadcrumb: React.FC<BreadcrumbComponentProps> = ({
  selectedRequest,
  jobDetails,
  candidateDetails,
}) => {
  const formatSessions = (sessions: string[]) => {
    return sessions.join(', '); // Adjust formatting logic based on your needs
  };

  const getFullName = (firstName: string, lastName: string) => {
    return `${firstName} ${lastName}`;
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='/requests'>Requests</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <div className='flex flex-row items-center justify-center space-x-2'>
            <span className='text-sm'>
              {`Schedule ${formatSessions(
                selectedRequest.request_relation.map(
                  ({ interview_session }) => interview_session.name,
                ),
              )} interview with `}
            </span>
            <span
              className='text-accent-900 cursor-pointer text-sm'
              onClick={() => {
                window.open(
                  ROUTES['/jobs/[job]/application/[application_id]']({
                    job: jobDetails.id,
                    application_id: selectedRequest.application_id,
                  }) + '?tab=interview',
                  '_blank',
                );
              }}
            >
              {getFullName(
                candidateDetails.first_name,
                candidateDetails.last_name,
              )}
            </span>
          </div>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default RequestDetailsBreadcrumb;
