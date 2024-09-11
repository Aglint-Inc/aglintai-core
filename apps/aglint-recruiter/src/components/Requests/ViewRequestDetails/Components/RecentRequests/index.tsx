import { Badge } from '@components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { useApplicantRequests } from '@/components/Requests/_common/hooks/useApplicantRequests';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

function RecentRequests({ applicationId }: { applicationId: string }) {
  const { query } = useRouter();
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const { data: requestList, status } = useApplicantRequests({
    application_id: applicationId,
  });
  const recentRequests =
    status === 'success'
      ? requestList.filter((item) => item.id !== query?.id)
      : [];
  if (status === 'pending') {
    return (
      <Card className='bg-white shadow-sm'>
        <CardHeader>
          <CardTitle className='text-xl font-semibold'>
            Recent Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm'>Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  } else
    return (
      <Card className='bg-white shadow-sm'>
        <CardHeader>
          <CardTitle className='text-xl font-semibold'>
            Recent Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {recentRequests.length === 0 ? (
              <>Recent Requests Not Found ...</>
            ) : (
              recentRequests.map((request, index) => {
                const jobDetails = request.applications.public_jobs;
                const sessions = request.request_relation.map(
                  (item) => item.interview_session,
                );
                return (
                  <div
                    key={index}
                    className='border rounded-lg overflow-hidden'
                  >
                    <div
                      className='flex items-center justify-between p-4 cursor-pointer bg-gray-50'
                      onClick={() =>
                        setExpandedCard(expandedCard === index ? null : index)
                      }
                    >
                      <div>
                        <h3 className='font-medium'>{jobDetails.job_title}</h3>
                        <p className='text-sm text-gray-500'>
                          {jobDetails.departments.name}
                        </p>
                      </div>
                      <div className='text-right flex items-center space-x-2'>
                        <p className='text-sm'>
                          {sessions.length} interview session
                          {sessions.length !== 1 ? 's' : ''}
                        </p>
                        <Badge
                          variant='outline'
                          className={`${
                            request.status === 'completed'
                              ? 'bg-green-50 text-green-700'
                              : request.status == 'in_progress'
                                ? 'bg-yellow-50 text-yellow-700'
                                : 'bg-gray-50 text-gray-700'
                          }`}
                        >
                          {capitalizeFirstLetter(request.status)}
                        </Badge>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            expandedCard === index ? 'transform rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>
                    {expandedCard === index && (
                      <div className='p-4 bg-white'>
                        <h4 className='font-medium mb-2'>
                          Interview Sessions:
                        </h4>
                        <ul className='list-disc pl-5 space-y-1'>
                          {sessions.map((session, sessionIndex) => (
                            <li key={sessionIndex} className='text-sm'>
                              {session.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    );
}

export default RecentRequests;
