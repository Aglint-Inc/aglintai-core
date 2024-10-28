// Fixed InterviewModuleName type and corrected property typos

import { DatabaseTable } from '@aglint/shared-types';

export type InterviewModuleName =
  | 'Data Science Case Study'
  | 'Behavioral Interview'
  | 'Final Interview with Hiring Manager'
  | 'Technical Screening'
  | 'DevOps Practical Assessment'
  | 'Frontend Technical Interview'
  | 'Backend Technical Interview'
  | 'Career Aspirations Discussion';

export const interview_modules: (Pick<
  DatabaseTable['interview_module'],
  'description' | 'duration_available' | 'settings' | 'instructions'
> & {
  name: InterviewModuleName;
})[] = [
  {
    name: 'Data Science Case Study',
    description:
      "Assess the candidate's ability to analyze data, build models, and generate insights.",
    duration_available: {
      activeDuration: 30,
      availabletimeSlots: [],
    },
    settings: null,
    instructions:
      'Candidates will be given a dataset to analyze and will be asked to present their findings and recommendations. You may use Python, R, or any other tool you are comfortable with. Be prepared to explain your methodology and the rationale behind your decisions.',
  },
  {
    name: 'Behavioral Interview',
    description:
      "Understand the candidate's soft skills, cultural fit, and ability to work within a team.",
    duration_available: {
      activeDuration: 30,
      availabletimeSlots: [],
    },
    settings: null,
    instructions:
      'This interview will focus on your past experiences, how you handled various work situations, and how you interact with others. Prepare to discuss specific examples of how you dealt with challenges or collaborated with teammates.',
  },
  {
    name: 'Final Interview with Hiring Manager',
    description:
      "Make a final assessment of the candidate's suitability for the role, including both technical and cultural fit.",
    duration_available: {
      activeDuration: 30,
      availabletimeSlots: [],
    },
    settings: null,
    instructions:
      'This will be a comprehensive interview covering both technical skills and cultural fit. Be ready to discuss your overall career goals, how you can contribute to the team, and why you believe you are the right fit for the position.',
  },
  {
    name: 'Technical Screening',
    description:
      "Assess the candidate's technical skills and problem-solving abilities.",
    duration_available: {
      activeDuration: 30,
      availabletimeSlots: [],
    },
    settings: {
      noShadow: 1,
      noReverseShadow: 2,
      require_training: true,
      reqruire_approval: false, // Fixed typo
    },
    instructions:
      'Candidates will be asked to solve coding challenges and answer technical questions related to the job role. Ensure you have a stable internet connection and are in a quiet environment. The interview will be conducted via an online coding platform.',
  },
  {
    name: 'DevOps Practical Assessment',
    description:
      "Test the candidate's ability to manage infrastructure, CI/CD pipelines, and deployments.",
    duration_available: {
      activeDuration: 30,
      availabletimeSlots: [],
    },
    settings: {
      noShadow: 2,
      noReverseShadow: 1,
      require_training: true,
      reqruire_approval: false, // Fixed typo
    },
    instructions:
      'You will be tasked with setting up a CI/CD pipeline, configuring cloud infrastructure, or managing containerized applications. Ensure you are familiar with tools like Docker, Kubernetes, and Jenkins.',
  },
  {
    name: 'Frontend Technical Interview',
    description:
      "Evaluate the candidate's proficiency in frontend technologies like HTML, CSS, and JavaScript.",
    duration_available: {
      activeDuration: 30,
      availabletimeSlots: [],
    },
    settings: {
      noShadow: 2,
      noReverseShadow: 2,
      require_training: true,
      reqruire_approval: false, // Fixed typo
    },
    instructions:
      'Prepare to discuss your past projects and demonstrate your knowledge of frontend frameworks like React. You may be asked to complete a live coding task or to review and improve a sample UI design.',
  },
  {
    name: 'Backend Technical Interview',
    description:
      "Examine the candidate's understanding of backend systems, databases, and API development.",
    duration_available: {
      activeDuration: 30,
      availabletimeSlots: [],
    },
    settings: {
      noShadow: 3,
      noReverseShadow: 3,
      require_training: false,
      reqruire_approval: true, // Fixed typo
    },
    instructions:
      "The interview will focus on backend architecture, database management, and API development. You may need to write and optimize queries or design a system's backend. Be ready to discuss past experiences with backend development.",
  },
  {
    name: 'Career Aspirations Discussion',
    description:
      'Assess the candidate’s career aspirations, motivations, and fit for the company culture.',
    duration_available: {
      activeDuration: 30,
      availabletimeSlots: [],
    },
    settings: null,
    instructions:
      'This interview will focus on your career goals, motivations, and how you align with the company’s culture. Prepare to discuss your long-term aspirations and how you see yourself contributing to the organization.',
  },
];
