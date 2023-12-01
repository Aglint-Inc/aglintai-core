import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { MobileLinkJobs, SublinksJobs } from '@/devlink';
import { pageRoutes } from '@/src/utils/pageRouting';

export function JobSubLinks() {
  const router = useRouter();
  return <SublinksJobs isSearchJobs={router.pathname === pageRoutes.JOBS} />;
}

// Jobs mobile sub navbar================================

export function MobileJobNavBar({ collapse, setCollapse }) {
  return (
    <Stack position={'relative'}>
      <Stack borderRadius={'8px'} width={'100%'}>
        <Stack
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <MobileLinkJobs
            onClickJobs={{
              onClick: () => {
                if (collapse !== 0) {
                  setCollapse(0);
                } else {
                  setCollapse(false);
                }
              },
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}



export const allowedCountries = ['us', 'ca', 'gb', 'in', 'au', 'uk'];

export const getInitialEmailTemplate = (company_name: string) => {
  return {
    interview: {
      fromName: company_name || '',
      body: "<p>Dear [firstName],</p><p>Thank you for submitting your application for the [jobTitle] at [companyName]. We're pleased to announce that you've been selected for an interview.</p><p>You're welcome to choose an interview time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We wish you the best of luck and are eager to hear your insights!</p><p>Warm regards</p>",
      default: true,
      subject:
        "Congratulations! You've Been Selected for an Interview with [companyName]",
    },
    rejection: {
      fromName: company_name || '',
      body: '<p>Hi [firstName],</p><p>Thank you for your interest in the position [jobTitle].</p><p>We have reviewed your application and carefully considered your qualifications. Based on your profile and the number of other qualified applications, for the moment, we are not able to move forward in the recruiting process with you.</p><p>Good luck in your search!</p><p>Sincerely,</p><p>[companyName]</p>',
      default: true,
      subject: 'Your application at [companyName]',
    },
    application_recieved: {
      fromName: company_name || '',
      body: '<p>Hi [firstName],</p><p>You have successfully submitted your application for this position:</p><p>[jobTitle]</p><p>We will review your application shortly. If your profile match our requirements, we will be in touch to schedule the next steps in the process.</p><p>Thank you for your interest in [companyName].</p><p>If you have any queries about this job</p> <p>[supportLink]</p> <p>Sincerely,</p><p>[companyName]</p>',
      default: true,
      subject: 'We received your application for a position at [companyName]',
    },
    interview_resend: {
      fromName: company_name || '',
      body: "<p>Dear [firstName],</p><p>We noticed that you haven't given your interview for the [jobTitle] position at [companyName]. Don't miss this opportunity!</p><p>You're welcome to choose an interview time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We're looking forward to hearing from you soon!</p><p>Warm regards</p>",
      default: true,
      subject:
        'Reminder: Schedule Your Interview for [jobTitle] at [companyName]',
    },
  };
};


// Interview prep mobile sub navbar===============================
