// Fixed type for stage_break_duration and corrected property typos

import { DatabaseTable } from '@aglint/shared-types';
import { InterviewModuleName } from './interview_module';

export type SeedJobType = Pick<
  DatabaseTable['public_jobs'],
  'slug' | 'job_title' | 'description'
> & {
  int_stages: {
    stage_name: string;
    sessions: (Pick<
      DatabaseTable['interview_session'],
      | 'interviewer_cnt'
      | 'session_type'
      | 'schedule_type'
      | 'session_duration'
      | 'break_duration'
    > & {
      name: InterviewModuleName | 'Debrief';
    })[];
  }[];
  stage_break_duration?: number; // Added correct property name
};

export const seedJobs: SeedJobType[] = [
  {
    slug: 'senior-software-engineer-full-stack',
    job_title: 'Senior Software Engineer - Full Stack - Multi Day Plan',
    description:
      'As a Senior Software Engineer - Full Stack, you will be responsible for designing, developing, and maintaining scalable web applications. You will work closely with our product team to implement new features and improve existing systems. The ideal candidate has extensive experience in both frontend and backend development, with a deep understanding of cloud technologies.',
    int_stages: [
      {
        stage_name: 'Technical Interview',
        sessions: [
          {
            name: 'Backend Technical Interview',
            interviewer_cnt: 5,
            session_type: 'individual',
            schedule_type: 'google_meet',
            session_duration: 30,
            break_duration: 30,
          },
          {
            name: 'Frontend Technical Interview',
            interviewer_cnt: 2,
            session_type: 'panel',
            schedule_type: 'google_meet',
            session_duration: 30,
            break_duration: 30,
          },
          {
            name: 'Data Science Case Study',
            interviewer_cnt: 5,
            session_type: 'individual',
            schedule_type: 'google_meet',
            session_duration: 30,
            break_duration: 30,
          },
        ],
      },
      {
        stage_name: 'Debrief',
        sessions: [
          {
            name: 'Final Interview with Hiring Manager',
            interviewer_cnt: 5,
            session_type: 'panel',
            schedule_type: 'phone_call',
            session_duration: 30,
            break_duration: 30,
          },
          {
            name: 'Debrief',
            interviewer_cnt: 1,
            session_type: 'debrief',
            schedule_type: 'phone_call',
            session_duration: 30,
            break_duration: 30,
          },
        ],
      },
    ],
  },
  {
    slug: 'backend-engineer',
    job_title: 'Backend Engineer - Single Day Plan',
    description:
      'The Backend Engineer will be responsible for developing robust backend services and APIs. You will work on system architecture, data management, and ensure seamless integration with frontend components. Proficiency in Node.js, databases, and RESTful APIs is required.',
    int_stages: [
      {
        stage_name: 'Technical Interview',
        sessions: [
          {
            name: 'Data Science Case Study',
            interviewer_cnt: 3,
            session_type: 'individual',
            schedule_type: 'google_meet',
            session_duration: 45,
            break_duration: 30,
          },
          {
            name: 'Backend Technical Interview',
            interviewer_cnt: 2,
            session_type: 'panel',
            schedule_type: 'google_meet',
            session_duration: 30,
            break_duration: 30,
          },
        ],
      },
      {
        stage_name: 'HR Interview',
        sessions: [
          {
            name: 'Final Interview with Hiring Manager',
            interviewer_cnt: 1,
            session_type: 'individual',
            schedule_type: 'phone_call',
            session_duration: 30,
            break_duration: 60,
          },
        ],
      },
    ],
    stage_break_duration: 0, // Corrected property name
  },
  {
    slug: 'devops-engineer',
    job_title: 'DevOps Engineer - Multi Day Plan',
    description:
      'As a DevOps Engineer, you will manage the infrastructure and deployment processes to ensure high availability and scalability. Experience with CI/CD pipelines, Docker, Kubernetes, and cloud services like AWS or Azure is essential.',
    int_stages: [
      {
        stage_name: 'Initial Interviews',
        sessions: [
          {
            name: 'Frontend Technical Interview',
            interviewer_cnt: 4,
            session_type: 'panel',
            schedule_type: 'google_meet',
            session_duration: 40,
            break_duration: 30,
          },
          {
            name: 'Backend Technical Interview',
            interviewer_cnt: 3,
            session_type: 'individual',
            schedule_type: 'google_meet',
            session_duration: 45,
            break_duration: 30,
          },
        ],
      },
      {
        stage_name: 'Advanced Technical Interview',
        sessions: [
          {
            name: 'Backend Technical Interview',
            interviewer_cnt: 2,
            session_type: 'panel',
            schedule_type: 'google_meet',
            session_duration: 30,
            break_duration: 60,
          },
          {
            name: 'Backend Technical Interview',
            interviewer_cnt: 2,
            session_type: 'individual',
            schedule_type: 'google_meet',
            session_duration: 30,
            break_duration: 60,
          },
        ],
      },
      {
        stage_name: 'HR Interview',
        sessions: [
          {
            name: 'Career Aspirations Discussion',
            interviewer_cnt: 1,
            session_type: 'individual',
            schedule_type: 'phone_call',
            session_duration: 30,
            break_duration: 60,
          },
        ],
      },
    ],
    stage_break_duration: 2880, // Corrected property name (24 * 60 * 2)
  },
  {
    slug: 'data-scientist',
    job_title: 'Data Scientist - Single Day Plan',
    description:
      'We are seeking a Data Scientist to analyze large datasets and extract actionable insights. You will develop machine learning models, conduct statistical analysis, and work with cross-functional teams to drive data-driven decisions.',
    int_stages: [
      {
        stage_name: 'Technical Interview',
        sessions: [
          {
            name: 'Data Science Case Study',
            interviewer_cnt: 3,
            session_type: 'individual',
            schedule_type: 'google_meet',
            session_duration: 40,
            break_duration: 30,
          },
          {
            name: 'Backend Technical Interview',
            interviewer_cnt: 2,
            session_type: 'panel',
            schedule_type: 'google_meet',
            session_duration: 35,
            break_duration: 30,
          },
        ],
      },
      {
        stage_name: 'HR Interview',
        sessions: [
          {
            name: 'Career Aspirations Discussion',
            interviewer_cnt: 1,
            session_type: 'individual',
            schedule_type: 'phone_call',
            session_duration: 30,
            break_duration: 60,
          },
        ],
      },
    ],
    stage_break_duration: 0, // Corrected property name
  },
];
