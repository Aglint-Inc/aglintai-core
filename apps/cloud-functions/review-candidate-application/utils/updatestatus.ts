import { get, isEmpty } from 'lodash';
// import { sendCandidateEmail } from './sendEmail';
import { ScreeningConfig } from '../schema/screeningsetting.types';
import {
  CandidatesType,
  JobApplicationType,
} from '../schema/db/database.types';
import { sendCandidateEmail } from './sendEmail';
import { supabase, supabaseWrap } from '../config/supabaseClient';
import { logApi } from './logApi';

export const updatestatus = async (
  screeningSetting: ScreeningConfig,
  overAllScore: number,
  candidateApplication: JobApplicationType,
  candidate: CandidatesType,
  templates: any,
  isAssessmentEnable: boolean,
  companyName: string,
  jobRole: string
) => {
  let status = '';
  try {
    if (!isAssessmentEnable) return 'assesment disabled';

    if (screeningSetting.screening.isManual) {
      return 'manual screening';
    }

    let isMoveAllApplicantsToInterview =
      !screeningSetting.screening.isManual &&
      !screeningSetting.screening.qualificationRange;
    let scheduledInterviewMailTime = getScheduledTime(
      screeningSetting.interviewMail.timestamp
    );

    let scheduledDisqualifiedMailTime = getScheduledTime(
      screeningSetting.disqualifiedMail.timestamp
    );

    let isSendInterviewMailImmediate =
      !screeningSetting.interviewMail.isManual &&
      scheduledInterviewMailTime === null;

    let isSendDisqulifiedMailImmediate =
      !screeningSetting.disqualifiedMail.isManual &&
      scheduledDisqualifiedMailTime === null;

    if (
      isMoveAllApplicantsToInterview ||
      overAllScore >= screeningSetting.screening.qualificationRange.max
    ) {
      // overallscore gt max score and interviewmail is scheduled
      !screeningSetting.interviewMail.isManual &&
        (await sendCandidateEmail(
          templates.interview,
          {
            company_name: companyName,
            first_name: candidate.first_name,
            job_title: jobRole,
            last_name: candidate.last_name as string,
            candidateEmail: candidate.email,
            interview_link: `${process.env.APP_BASE_URL}/interview?id=${candidateApplication.id}`,
            sendAt: isSendInterviewMailImmediate
              ? undefined
              : scheduledInterviewMailTime,
            support_link:
              process.env.APP_BASE_URL +
              `/support/create?id=${candidateApplication.id}`,
          },
          get(templates, 'interview.fromName', companyName || '')
        ));

      await supabaseWrap(
        await supabase
          .from('applications')
          .update({
            status: 'assessment',
            status_emails_sent: screeningSetting.interview.isManual
              ? undefined
              : {
                  interviewing: true,
                },
          })
          .match({
            id: candidateApplication.id,
          })
      );
      status = `moved application status to ${'interviewing'}`;
    } else if (
      overAllScore < screeningSetting?.screening?.qualificationRange?.min
    ) {
      //candidate scores is below minimum

      !screeningSetting.disqualifiedMail.isManual &&
        (await sendCandidateEmail(
          templates.rejection,
          {
            company_name: companyName || '',
            first_name: candidate.first_name,
            job_title: jobRole || '',
            last_name: candidate.last_name as string,
            candidateEmail: candidate.email,
            sendAt: isSendDisqulifiedMailImmediate
              ? undefined
              : scheduledDisqualifiedMailTime,
          },
          get(templates, 'rejection.fromName', companyName || '')
        ));
      await supabaseWrap(
        await supabase
          .from('job_applications')
          .update({
            status: 'disqualified',
            emails: screeningSetting.disqualifiedMail.isManual
              ? undefined
              : {
                  disqualified: true,
                },
          })
          .match({
            application_id: candidateApplication.id,
          })
      );
      status = `moved application status to ${'disqualified'}`;
    } else {
      status = 'no action';
    }
  } catch (err: any) {
    logApi(err);
    status = err.name + ' - ' + err.message;
  }
  return status;
};

const getScheduledTime = (timeStamp: string | null) => {
  if (!timeStamp) return undefined;
  let scheduledTime;
  let currDate = new Date();
  let currHour = currDate.getUTCHours();
  let scheduledHours = new Date(timeStamp).getUTCHours();
  let scheduledMinute = new Date(timeStamp).getUTCMinutes();
  scheduledTime = new Date();
  scheduledTime.setUTCHours(scheduledHours);
  scheduledTime.setUTCMinutes(scheduledMinute);
  scheduledTime = Math.floor(scheduledTime.getTime() / 1000);
  if (currHour > scheduledHours) {
    scheduledTime += 24 * 60 * 60;
  }
  return scheduledTime;
};
