import { supabase } from '@/src/utils/supabaseClient';
export async function updateFeedbackOnJobApplications(
  candidateDetails: { application_id: any },
  jobDetails: any,
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

  const maxScore = Number(
    jobDetails?.new_screening_setting?.interview?.qualificationRange?.max,
  );

  const minScore = Number(
    jobDetails?.new_screening_setting?.interview?.qualificationRange?.min,
  );
  const isManual = jobDetails?.new_screening_setting?.interview?.isManual;
  const { error } = await supabase
    .from('job_applications')
    .update({
      feedback: feedback,
      conversation: conversation,
      ai_interviewer_id: interviewIndex,
      status: isManual
        ? 'interviewing'
        : overAllScore >= maxScore
        ? 'qualified'
        : overAllScore < maxScore && overAllScore > minScore
        ? 'interviewing'
        : 'disqualified',
      interview_duration: interviewDuration,
    })
    .eq('application_id', candidateDetails?.application_id);
  if (!error) {
    return true;
  }
}

export async function getRecruiter(id: any) {
  const { data, error } = await supabase
    .from('recruiter')
    .select()
    .eq('id', id);

  if (!error) {
    return data[0];
  }
}

export async function updateRecruiter(id: string, value: boolean) {
  const { data, error } = await supabase
    .from('recruiter')
    .update({ video_assessment: value })
    .eq('id', id)
    .select();
  if (!error) {
    return data[0];
  }
}
