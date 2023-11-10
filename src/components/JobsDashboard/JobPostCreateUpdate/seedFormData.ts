import { get, isEmpty, isUndefined } from 'lodash';
import { nanoid } from 'nanoid';
import { v4 as uuidv4 } from 'uuid';

import { JobTypeDB } from '@/src/types/data.types';
import { Database } from '@/src/types/schema';

import { JobFormState } from './JobPostFormProvider';
import { scoreWheelDependencies } from '../../Common/ScoreWheel';

export const getSeedJobFormData = (
  recruiter?: Database['public']['Tables']['recruiter']['Row'],
) => {
  const seedFormState: JobFormState = {
    isFormOpen: false,
    createdAt: undefined,
    updatedAt: undefined,
    jobPostId: uuidv4(),
    syncStatus: '',
    formType: 'new',
    currSlide: 'details',
    formFields: {
      company: '',
      jobLocation: '',
      jobTitle: '',
      jobType: 'fullTime',
      department: '',
      logo: '',
      defaultJobType: [],
      defaultWorkPlaceTypes: [],
      workPlaceType: 'onSite',
      skills: [],
      jobDescription: '',
      interviewType: 'questions-preset',
      defaultAddress: [],
      defaultDepartments: [],
      interviewConfig: [
        {
          category: 'skill',
          copy: 'Skill',
          id: nanoid(),
          questions: [],
        },
        {
          category: 'behavior',
          copy: 'Behavior',
          id: nanoid(),
          questions: [],
        },
        {
          category: 'communication',
          copy: 'communication',
          id: nanoid(),
          questions: [],
        },
        {
          category: 'performance',
          copy: 'Performance',
          id: nanoid(),
          questions: [],
        },
        {
          category: 'education',
          copy: 'Education',
          id: nanoid(),
          questions: [],
        },
        {
          category: 'general',
          copy: 'General',
          id: nanoid(),
          questions: [],
        },
      ],
      screeningEmail: {
        date: new Date().toISOString(),
        isImmediate: true,
        emailTemplates: {},
      },
      newScreeningConfig: {
        screening: {
          qualificationRange: null,
          isManual: true,
        },
        interview: {
          qualificationRange: null,
          isManual: true,
        },
        interviewMail: {
          timestamp: null,
          isManual: true,
        },
        disqualifiedMail: {
          timestamp: null,
          isManual: true,
        },
        feedbackVisible: false,
      },
      resumeScoreSettings: {
        ...scoreWheelDependencies.initialScoreWheelWeights,
      },
      recruiterId: '',
      videoAssessment: false,
      introVideo: {
        id: '',
        question: '',
        videoId: '',
        videoQn: '',
        videoUrl: '',
      },
      startVideo: {
        id: '',
        question: "Thank you for taking the time to meet with us today. We're excited to have you here for this interview and learn more about your qualifications and experiences.Let's get started.",
        videoId: '',
        videoQn: '',
        videoUrl: '',
      },
      endVideo: {
        id: '',
        question: "Thank you,for your time and sharing your insights with us today. If you have any further questions or need more information from us, please don't hesitate to reach out. Wishing you a great day ahead",
        videoId: '',
        videoQn: '',
        videoUrl: '',
      },
      isDraftCleared: false,
      interviewInstrctions: `<p><strong>Assessment Instructions</strong></p><ul><li><p><strong><span>Quiet Environment</span></strong><br><span>Choose a quiet place to take the assessment where you will not be interrupted.</span></p></li><li><p><strong><span>Interruptions</span></strong><br><span>If the assessment is stopped for any reason, you will need to start over from the beginning.</span></p></li><li><p><strong><span>Question Types</span></strong><br><span>You will be asked questions based on the job requirements. Prepare yourself accordingly.</span></p></li><li><p><strong><span>Answer Submission<br></span></strong><span>You have the option to submit your answers via voice or by typing them out.</span></p></li><li><p><strong><span>Timing<br></span></strong><span>Feel free to answer the questions right after they are asked. There's no need to wait for a prompt to proceed.</span></p></li></ul><p></p><p><strong> Please take a moment to go through the tour before starting your assessment. Once you're ready, click the "Start Assessment" button. Good luck!</strong></p>`,
      interviewSetting: {
        assessmentValidity: {
          candidateRetry: 5,
          expirationDuration: 7,
        },
        isVideoAiGenerated: false,
        showInstructionVideo: true,
        aiGeneratedVideoInfo: {
          id: '',
          question: '',
          videoId: '',
          videoQn: '',
          videoUrl: '',
        },
        uploadedVideoInfo: {
          id: '',
          question: '',
          videoId: '',
          videoQn: '',
          videoUrl: '',
        },
      },
    },
    isJobPostReverting: false,
    jobPostStatus: 'draft',
  };

  if (recruiter) {
    const defaultAddress = get(recruiter, 'office_locations', []).map((s) => ({
      label: [s.city, s.region, s.country].filter(Boolean).join(', '),
      value: [s.city, s.region, s.country].filter(Boolean).join(', '),
    }));

    seedFormState.formFields.jobTitle = `${recruiter.name}'s First Job`;
    seedFormState.formFields.recruiterId = recruiter.id;
    seedFormState.formFields.company = recruiter.name;
    seedFormState.formFields.logo = recruiter.logo;
    seedFormState.formFields.videoAssessment = recruiter.video_assessment;
    seedFormState.formFields.defaultWorkPlaceTypes = Object.keys(
      recruiter.workplace_type,
    ).map((o) => {
      if (o === 'hybrid') {
        return {
          value: o,
          name: 'Hybrid',
        };
      } else if (o === 'onsite') {
        return {
          name: 'On Site',
          value: o,
        };
      } else if (o === 'offsite') {
        return {
          name: 'Off Site',
          value: o,
        };
      }
    });
    seedFormState.formFields.defaultJobType = Object.keys(
      recruiter.employment_type,
    ).map((o) => {
      if (o === 'contract') {
        return {
          name: 'Contract',
          value: o,
        };
      } else if (o === 'fulltime') {
        return {
          name: 'Full Time',
          value: o,
        };
      } else if (o === 'parttime') {
        return {
          name: 'Part Time',
          value: o,
        };
      } else if (o === 'temporary') {
        return {
          name: 'Temporary',
          value: o,
        };
      } else if (o === 'volunteer') {
        return {
          name: 'Volunteer',
          value: o,
        };
      } else if (o === 'internship') {
        return {
          name: 'Internship',
          value: o,
        };
      }
    });
    seedFormState.formFields.workPlaceType = 'onsite';
    seedFormState.formFields.jobType = 'fulltime';
    seedFormState.formFields.jobLocation = get(defaultAddress, '[0].value', '');
    seedFormState.formFields.department = get(recruiter, 'departments[0]', '');

    seedFormState.formFields.defaultAddress = defaultAddress;
    seedFormState.formFields.screeningEmail = {
      ...seedFormState.formFields.screeningEmail,
      emailTemplates: get(
        recruiter,
        'email_template',
        {},
      ) as JobFormState['formFields']['screeningEmail']['emailTemplates'],
    };
    seedFormState.formFields.defaultDepartments = get(
      recruiter,
      'departments',
      [],
    ).map((d) => ({ label: d, value: d }));
  }

  return seedFormState;
};

export const dbToClientjobPostForm = (
  jobPost: Partial<JobTypeDB>,
  recruiter: Database['public']['Tables']['recruiter']['Row'],
  jobPostStatus: string,
) => {
  const seedData = getSeedJobFormData(recruiter);
  const jp: JobFormState = {
    ...seedData,
    createdAt: jobPost.created_at,
    formType: 'edit',
    jobPostId: jobPost.id,
    currSlide: 'details',
    updatedAt: jobPost.updated_at || new Date().toUTCString(),
    formFields: {
      ...seedData.formFields,
      company: jobPost.company || seedData.formFields.company,
      workPlaceType:
        jobPost.workplace_type || seedData.formFields.workPlaceType,
      interviewConfig: get(
        jobPost,
        'screening_questions',
        seedData.formFields.interviewConfig,
      ) as any,
      interviewType: get(
        jobPost,
        'screening_setting.interviewType',
        'questions-preset',
      ),
      department: jobPost.department || seedData.formFields.department,
      jobDescription: jobPost.description || '',
      jobLocation: jobPost.location || seedData.formFields.jobLocation,
      logo: jobPost.logo || seedData.formFields.logo,
      skills: get(jobPost, 'skills', []) || [],
      jobTitle: jobPost.job_title || '',
      jobType: jobPost.job_type || seedData.formFields.jobType,
      newScreeningConfig: {
        screening: {
          ...(get(
            jobPost,
            'new_screening_setting.screening',
            seedData.formFields.newScreeningConfig.screening,
          ) as any),
        },
        interview: {
          ...(get(
            jobPost,
            'new_screening_setting.interview',
            seedData.formFields.newScreeningConfig.interview,
          ) as any),
        },
        interviewMail: {
          ...(get(
            jobPost,
            'new_screening_setting.interviewMail',
            seedData.formFields.newScreeningConfig.interviewMail,
          ) as any),
        },
        disqualifiedMail: {
          ...(get(
            jobPost,
            'new_screening_setting.disqualifiedMail',
            seedData.formFields.newScreeningConfig.disqualifiedMail,
          ) as any),
        },
        feedbackVisible: get(
          jobPost,
          'new_screening_setting.feedbackVisible',
          seedData.formFields.newScreeningConfig.feedbackVisible,
        ) as boolean,
      },
      resumeScoreSettings: {
        ...(get(jobPost, 'parameter_weights', {
          ...scoreWheelDependencies.initialScoreWheelWeights,
        }) as JobFormState['formFields']['resumeScoreSettings']),
      },
      videoAssessment: jobPost.video_assessment,
      startVideo:
        jobPost.start_video || (seedData.formFields.startVideo as any),
      endVideo: jobPost.end_video || (seedData.formFields.endVideo as any),
      interviewInstrctions: jobPost.interview_instructions,
      isDraftCleared: isUndefined(jobPost.draft)
        ? false
        : isEmpty(jobPost.draft),
      interviewSetting:
        jobPost.intro_videos || (seedData.formFields.interviewSetting as any),
    },
    jobPostStatus: jobPostStatus as any,
  };

  return jp;
};
