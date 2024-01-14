import { nanoid } from 'nanoid';

import { PhoneScreenQuestion } from '../../JobPostFormProvider';

export const qnTypeToLabel2 = (type: PhoneScreenQuestion['type']) => {
  if (type === 'shortAnswer') return 'Short answer';
  if (type === 'multiSelect') return 'Multi select';
  if (type === 'singleSelect') return 'Single select';
};

export const seedQns: PhoneScreenQuestion[] = [
  {
    id: nanoid(),
    type: 'shortAnswer',
    description: '',
    showDescription: false,
    isRequired: true,
    options: [],
    question:
      'Can you provide a brief overview of your professional background and how it aligns with the responsibilities of an Enterprise Customer Success Manager ?',
    questionLabel: 'Backgound check',
  },
  {
    id: nanoid(),
    description: '',

    type: 'singleSelect',
    isRequired: true,
    showDescription: false,

    options: [
      {
        id: nanoid(),
        option: ' Advanced proficiency',
      },
      {
        id: nanoid(),
        option: 'Intermediate proficiency',
      },
      {
        id: nanoid(),
        option: 'Basic proficiency',
      },
      {
        id: nanoid(),
        option: 'Limited proficiency',
      },
    ],

    question:
      'Which of the following best describes your expertise with [relevant skills]? (Select all that apply)',
    questionLabel: 'Expertise with skill',
  },
  {
    id: nanoid(),
    description: '',
    showDescription: false,

    type: 'shortAnswer',
    isRequired: true,
    options: [],
    question: `This role may involve occasional travel. Do you possess a valid driver's license, and are you comfortable with potential travel requirements?`,
    questionLabel: 'Drivers licence',
  },
  {
    id: nanoid(),
    type: 'multiSelect',
    description: '',
    showDescription: false,

    isRequired: true,
    options: [
      { id: nanoid(), option: 'Remote' },
      { id: nanoid(), option: 'Hybrid' },
      { id: nanoid(), option: 'Onsite' },
    ],
    question: `Which workplace type do you have the most experience with, and how do you ensure productivity and collaboration within that setting?`,
    questionLabel: 'Workplace type',
  },
  {
    id: nanoid(),
    type: 'shortAnswer',
    description: '',
    showDescription: false,

    isRequired: true,
    options: [],
    question:
      'Our company has a policy requiring a drug test as part of the hiring process. Are you comfortable undergoing a drug test as part of the onboarding process?',
    questionLabel: 'Drug test',
  },
  {
    id: nanoid(),
    showDescription: false,

    type: 'shortAnswer',
    isRequired: true,
    description: '',

    options: [],
    question: `Please elaborate on your experience managing enterprise-level customer relationships, highlighting any notable achievements or challenges you've successfully navigated.`,
    questionLabel: 'Experience',
  },
  {
    id: nanoid(),
    showDescription: false,

    type: 'shortAnswer',
    isRequired: true,
    description: '',

    options: [],
    question: `What is your current visa status in the country where you would be working remotely, and do you have any restrictions that might affect your eligibility for the role?`,
    questionLabel: 'Industry experience',
  },
  {
    id: nanoid(),
    type: 'shortAnswer',
    description: '',
    isRequired: true,
    showDescription: false,
    options: [],
    question: `What is your current visa status in the country where you would be working remotely, and do you have any restrictions that might affect your eligibility for the role?`,
    questionLabel: 'Visa status',
  },
  {
    id: nanoid(),
    type: 'shortAnswer',
    showDescription: false,
    description: '',
    isRequired: true,
    options: [],
    question: `Can you confirm your work authorization and eligibility to work remotely without any restrictions in the [country]?`,
    questionLabel: 'Work authorisation',
  },
];
