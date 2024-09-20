import axios from 'axios';

export async function updateFeedbackOnJobApplications(
  application_id: any,
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

  await axios.post('/api/assessment/insert_assessment_results', {
    application_id: application_id,
    feedback: feedback,
    conversation: conversation,
    ai_interviewer_id: interviewIndex,
    interview_duration: interviewDuration,
    interview_score: overAllScore,
  });
  await axios.post('/api/assessment/update_applications', {
    application_id: application_id,
    status: isManual
      ? 'assessment'
      : overAllScore >= maxScore
        ? 'qualified'
        : overAllScore < maxScore && overAllScore > minScore
          ? 'assessment'
          : 'disqualified',
  });
  return true;
}

export async function getRecruiter(id: any) {
  try {
    const { data } = await axios.post('/api/assessment/access_recruiter', {
      id: id,
    });
    return data;
  } catch (error) {
    return error;
  }
}
