/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useRouter } from 'next/router';
import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import ROUTES from '@/src/utils/routing/routes';

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
  const router = useRouter();

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
          <BreadcrumbLink
            href='#'
            onClick={() => {
              router.replace('/requests?tab=requests');
            }}
          >
            Requests
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <div className='flex flex-row justify-center items-center space-x-2'>
            <span className='text-sm'>
              {`Schedule ${formatSessions(
                selectedRequest.request_relation.map(
                  ({ interview_session }) => interview_session.name,
                ),
              )} interview with `}
            </span>
            <span
              className='text-sm text-accent-900 cursor-pointer'
              onClick={() => {
                window.open(
                  ROUTES['/jobs/[id]/application/[application_id]']({
                    id: jobDetails.id,
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
