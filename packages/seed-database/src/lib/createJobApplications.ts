import { DatabaseTable, DatabaseTableInsert } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { getSupabaseServer } from '../supabaseAdmin';

export const createJobApplications = async ({
  company_candidates,
  job_details,
}: {
  company_candidates: {
    candidate_file: DatabaseTable['candidate_files'];
    candidate_detail: DatabaseTable['candidates'];
  }[];
  job_details: DatabaseTable['public_jobs'];
}) => {
  const supabaseAdmin = getSupabaseServer();
  const application: DatabaseTableInsert['applications'][] =
    company_candidates.map((candidate) => {
      return {
        job_id: job_details.id,
        recruiter_id: job_details.recruiter_id,
        candidate_file_id: candidate.candidate_file.id,
        candidate_id: candidate.candidate_detail.id,
        applied_at: new Date().toISOString(),
        bookmarked: false,
        is_resume_fetching: false,
        is_new: false,
        processing_status: 'success',
        status: 'new',
        source: 'manual_upload',
        processing_started_at: new Date().toISOString(),
        converted_at: null,
        overall_interview_score: -1,
        overall_score: 45,
        score_json: scoreJson,
      };
    });
  const applications = supabaseWrap(
    await supabaseAdmin.from('applications').insert(application).select()
  );
  console.log('Job applications are created for job', job_details.job_title);
  return applications;
};

const scoreJson: DatabaseTable['applications']['score_json'] = {
  badges: {
    skills: 2,
    schools: 0,
    positions: 0,
    jobHopping: 0,
    leadership: 86,
    careerGrowth: 84,
    jobStability: 85,
  },
  scores: {
    skills: 77,
    education: 0,
    experience: 60,
  },
  reasoning: {
    skills:
      "NAKYR DIALLO's skills align well with the job requirements, demonstrating strong capabilities in customer success management, leadership, edge computing, cloud computing, open source, communication, presentation, organization, data network systems architecture, market trends, renewal management, and upsell/cross-sell. While some secondary skills may not be directly mentioned, the overall skill set is well-suited for the role.",
    schools:
      "The education details provided do not align with the primary requirement of a Bachelor's degree in a related field for the job. Additionally, there is no indication of a Master's degree, which is a nice-to-have for the role.",
    positions:
      "NAKYR DIALLO's work experiences align with some aspects of the job requirements, particularly in leadership and customer success management. However, there are gaps in specific technical knowledge and experience related to edge computing, data network systems architecture, and open source technologies.",
  },
  relevance: {
    skills: {
      SQL: 'low',
      Python: 'low',
      Cybersecurity: 'low',
      'Customer Success': 'high',
      'Customer Retention': 'high',
      'Strategic Planning': 'medium',
      'Product Lifecycle Management': 'medium',
    },
    schools: {
      '0': 'low',
      '1': 'low',
      '2': 'low',
    },
    positions: {
      '0': 'low',
      '1': 'medium',
      '2': 'low',
    },
  },
};
