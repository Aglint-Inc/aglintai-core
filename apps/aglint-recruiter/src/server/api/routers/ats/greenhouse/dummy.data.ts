import { type GreenhouseJobStagesAPI } from './types';

export const JobStageData: GreenhouseJobStagesAPI = [
  {
    id: 72200,
    name: 'Face to Face',
    created_at: '2015-11-22T05:31:37.263Z',
    updated_at: '2015-11-22T05:31:37.263Z',
    job_id: 146218,
    priority: 0,
    interviews: [
      {
        id: 6001,
        name: 'Cultural Fit Interview',
        schedulable: true,
        estimated_minutes: 30,
        default_interviewer_users: [
          {
            id: 821,
            first_name: 'Robert',
            last_name: 'Robertson',
            name: 'Robert Robertson',
            employee_id: '100377',
          },
        ],
        interview_kit: {
          id: 9128,
          content:
            '<h5>Purpose</h5><span>Determine whether or not the candidate would be a strong fit.</span>',
          questions: [
            {
              id: 11052,
              question: 'Is this person really a good fit?',
            },
          ],
        },
      },
      {
        id: 6002,
        name: 'Executive Interview',
        schedulable: true,
        created_at: '2015-11-22T05:31:37.263Z',
        updated_at: '2015-11-22T05:31:37.263Z',
        job_id: 146219,
        estimated_minutes: 60,
        default_interviewer_users: [
          {
            id: 4080,
            first_name: 'Kate',
            last_name: 'Austen',
            name: 'Kate Austen',
            employee_id: '12345',
          },
        ],
        interview_kit: {
          id: 9129,
          content:
            '<h5>Purpose</h5><span>See if they can work with the boss.</span>',
          questions: [
            {
              id: 11053,
              question: "What's their favorite color?",
            },
            {
              id: 11054,
              question: 'Do they really want to work here?',
            },
          ],
        },
      },
    ],
  },
  {
    id: 72199,
    name: 'Offer',
    created_at: '2015-11-22T05:31:37.263Z',
    updated_at: '2015-11-22T05:31:37.263Z',
    job_id: 146220,
    priority: 1,
    interviews: [],
  },
  {
    id: 72194,
    name: 'Application Review',
    created_at: '2015-11-22T05:31:37.263Z',
    updated_at: '2015-11-22T05:31:37.263Z',
    job_id: 146221,
    priority: 2,
    interviews: [
      {
        id: 8004,
        name: 'Application Review',
        schedulable: false,
        interview_kit: {
          id: 9130,
          content: null,
          questions: [],
        },
      },
    ],
  },
];
