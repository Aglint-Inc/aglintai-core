import { type DatabaseTable } from '@aglint/shared-types';
import { Mail, MailPlus, Phone } from 'lucide-react';
import React from 'react';

function RequestStatusUnconfirmed({
  interview_meeting,
}: {
  interview_meeting: DatabaseTable['interview_meeting'];
}) {
  return (
    <>
      {interview_meeting?.status === 'waiting' && (
        <>
          {interview_meeting?.meeting_flow === 'candidate_request' ? (
            <div className='flex items-center text-yellow-500'>
              <Mail className='mr-2 h-3 w-3' />
              <p className='text-xs'>Availability Requested</p>
            </div>
          ) : interview_meeting?.meeting_flow === 'self_scheduling' ? (
            <div className='flex items-center text-yellow-500'>
              <MailPlus className='mr-2 h-3 w-3' />
              <p className='text-xs'>Self Scheduling Requested</p>
            </div>
          ) : interview_meeting?.meeting_flow === 'mail_agent' ? (
            <div className='flex items-center text-yellow-500'>
              <MailPlus className='mr-2 h-3 w-3' />
              <p className='text-xs'>Assigned to Email Agent</p>
            </div>
          ) : interview_meeting?.meeting_flow === 'phone_agent' ? (
            <div className='flex items-center text-yellow-500'>
              <Phone className='mr-2 h-3 w-3' />
              <p className='text-xs'>Assigned to Phone Agent</p>
            </div>
          ) : (
            ''
          )}
        </>
      )}
    </>
  );
}

export default RequestStatusUnconfirmed;
