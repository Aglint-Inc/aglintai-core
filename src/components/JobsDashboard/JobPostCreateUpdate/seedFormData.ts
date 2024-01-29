import { get, isEmpty, isUndefined } from 'lodash';
import { nanoid } from 'nanoid';
import { v4 as uuidv4 } from 'uuid';

import { JobTypeDB } from '@/src/types/data.types';
import { Database } from '@/src/types/schema';

import { JobFormState } from './JobPostFormProvider';

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
        skills: 0,
        experience: 0,
        education: 0,
      },
      isjdChanged: false,
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
        question:
          "Thank you for taking the time to meet with us today. We're excited to have you here for this interview and learn more about your qualifications and experiences. Let's get started.",
        videoId: '',
        videoQn: '',
        videoUrl: '',
      },
      endVideo: {
        id: '',
        question:
          "Thank you,for your time and sharing your insights with us today. If you have any further questions or need more information from us, please don't hesitate to reach out. Wishing you a great day ahead",
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
      assessment: false,
      jdJson: {
        title: '',
        level: 'Mid-level',
        educations: [],
        rolesResponsibilities: [],
        skills: [],
      },
      phoneScreening: {
        startMessage:
          'Welcome to the candidate application form. Please fill out the following information',
        endMessage:
          'Thank you for taking your time. We will get back to you shortly',
        questions: [],
      },
      isPhoneScreenEnabled: false,
    },
    isJobPostReverting: false,
    jobPostStatus: 'draft',
    currentAssmSlides: 'instructions',
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
      screeningEmail: {
        isImmediate: true,
        date: '',
        emailTemplates: (jobPost.email_template as any) || emailTemps,
      },
      department: jobPost.department || seedData.formFields.department,
      jobDescription: jobPost.description || '',
      jobLocation: jobPost.location || seedData.formFields.jobLocation,
      logo: jobPost.logo || seedData.formFields.logo,
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
          skills: 0,
          experience: 0,
          education: 0,
        }) as JobFormState['formFields']['resumeScoreSettings']),
      },
      videoAssessment: jobPost.video_assessment,
      startVideo:
        jobPost.start_video || (seedData.formFields.startVideo as any),
      endVideo: jobPost.end_video || (seedData.formFields.endVideo as any),
      interviewInstrctions:
        jobPost.interview_instructions ||
        seedData.formFields.interviewInstrctions,
      isDraftCleared: isUndefined(jobPost.draft)
        ? false
        : isEmpty(jobPost.draft),
      interviewSetting:
        jobPost.intro_videos || (seedData.formFields.interviewSetting as any),
      assessment: jobPost.assessment || false,
      jdJson: jdJsonToItems(
        (jobPost.jd_json as any) || seedData.formFields.jdJson,
      ),
      phoneScreening:
        (jobPost.phone_screening as any) || seedData.formFields.phoneScreening,
      isjdChanged:
        (jobPost.jd_changed as any) || seedData.formFields.isjdChanged,
      isPhoneScreenEnabled:
        (jobPost.phone_screen_enabled as any) ||
        seedData.formFields.isPhoneScreenEnabled,
    },
    jobPostStatus: jobPostStatus as any,
  };

  return jp;
};

let emailTemps = {
  interview: {
    body: "<p>Dear [firstName],</p><p>Thank you for submitting your application for the [jobTitle] at [companyName]. We're pleased to announce that you've been selected for an interview.</p><p>You're welcome to choose an interview time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We wish you the best of luck and are eager to hear your insights!</p><p>Warm regards</p>",
    default: true,
    subject:
      "Congratulations! You've Been Selected for an Interview with [companyName]",
    fromName: 'aglint',
  },
  rejection: {
    body: '<p>Hi [firstName],</p><p>Thank you for your interest in the position [jobTitle].</p><p>We have reviewed your application and carefully considered your qualifications. Based on your profile and the number of other qualified applications, for the moment, we are not able to move forward in the recruiting process with you.</p><p>Good luck in your search!</p><p>Sincerely,</p><p>[companyName]</p>',
    default: true,
    subject: 'Your application at [companyName]',
    fromName: 'aglint',
  },
  phone_screening: {
    body: '<p>Dear [firstName],</p><p>I hope this message finds you well. We appreciate your interest in the [jobTitle] position at [companyName], and we are excited to move forward with your application.</p><p>After reviewing your application, we would like to invite you to participate in a phone screening interview. This initial conversation will give us the opportunity to learn more about your experiences, skills, and how they align with the requirements of the role.</p><p>Please click on the following link to access the phone screening interview: [phoneScreeningLink]</p><p>Best regards ,</p><p>[companyName]</p>',
    default: true,
    subject:
      'Invitation to Phone Screening Interview for [firstName] - [jobTitle] Position at [companyName]',
    fromName: 'aglint',
  },
  interview_resend: {
    body: "<p>Dear [firstName],</p><p>We noticed that you haven't given your interview for the [jobTitle] position at [companyName]. Don't miss this opportunity!</p><p>You're welcome to choose an interview time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We're looking forward to hearing from you soon!</p><p>Warm regards</p>",
    default: true,
    subject:
      'Reminder: Schedule Your Interview for [jobTitle] at [companyName]',
    fromName: 'aglint',
  },
  application_recieved: {
    body: '<p>Hi [firstName],</p><p>You have successfully submitted your application for this position [jobTitle]:</p><p>We will review your application shortly. If your profile match our requirements, we will be in touch to schedule the next steps in the process.</p><p>Thank you for your interest in [companyName].</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>Sincerely,</p><p>[companyName]</p>',
    default: true,
    subject:
      'We received your application for a position [jobTitle] at [companyName]',
    fromName: 'aglint',
  },
  phone_screening_resend: {
    body: "<p>Dear [firstName],</p><p>We hope this message finds you well. We wanted to bring to your attention that we have not yet received your screening form submission for the [jobTitle] position at [companyName]. We wouldn't want you to miss out on this exciting opportunity!</p><p>Please click on the link below to initiate the phone screening process:</p><p>[phoneScreeningLink]</p><p>We're looking forward to hearing from you soon!</p><p>Warm regards,</p><p>[<span>companyName</span>]</p>",
    default: true,
    subject:
      'Reminder: Complete Your Phone Screening for [jobTitle] Position at [companyName]',
    fromName: 'aglint',
  },
};

const jdJsonToItems = (jdJson: JobFormState['formFields']['jdJson']) => {
  jdJson.educations = jdJson.educations.map((e) => ({ ...e, id: nanoid() }));
  jdJson.skills = jdJson.skills.map((e) => ({ ...e, id: nanoid() }));
  jdJson.rolesResponsibilities = jdJson.rolesResponsibilities.map((e) => ({
    ...e,
    id: nanoid(),
  }));

  return jdJson;
};
