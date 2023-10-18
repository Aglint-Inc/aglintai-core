import { supabase } from '@/src/utils/supabaseClient';
export async function updateFeedbackOnJobApplications(
  candidateDetails: { application_id: any },
  jobDetails: { screening_setting: { shortlist: { minInterviewScore: any } } },
  feedback: any,
  conversation: any,
  interviewIndex: any,
  interviewDuration: any,
) {
  const overAllScore = feedback?.length
    ? Math.floor(
        feedback?.reduce(
          (sum: number, entry: { rating: string }) =>
            sum +
            Number(
              String(entry.rating).includes('/')
                ? entry.rating.split('/')[0]
                : entry.rating,
            ),
          0,
        ) / feedback.length,
      )
    : 0;
  const { error } = await supabase
    .from('job_applications')
    .update({
      feedback: feedback,
      conversation: conversation,
      ai_interviewer_id: interviewIndex,
      status:
        overAllScore >=
        // @ts-ignore
        Number(jobDetails?.screening_setting?.shortlist?.minInterviewScore)
          ? 'qualified'
          : 'disqualified',
      interview_duration: interviewDuration,
    })
    .eq('application_id', candidateDetails?.application_id);
  if (!error) {
    return true;
  }
}
