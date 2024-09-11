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
            <div className="flex items-center text-yellow-500">
              <Mail className="w-3 h-3 mr-2" />
              <p className="text-sm">Availability Requested</p>
            </div>
          ) : interview_meeting?.meeting_flow === 'self_scheduling' ? (
            <div className="flex items-center text-yellow-500">
              <MailPlus className="w-3 h-3 mr-2" />
              <p className="text-sm">Self Scheduling Requested</p>
            </div>
          ) : interview_meeting?.meeting_flow === 'mail_agent' ? (
            <div className="flex items-center text-yellow-500">
              <MailPlus className="w-3 h-3 mr-2" />
              <p className="text-sm">Assigned to Email Agent</p>
            </div>
          ) : interview_meeting?.meeting_flow === 'phone_agent' ? (
            <div className="flex items-center text-yellow-500">
              <Phone className="w-3 h-3 mr-2" />
              <p className="text-sm">Assigned to Phone Agent</p>
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
