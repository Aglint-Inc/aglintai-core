import { nanoid } from 'nanoid';

import { PhoneScreenQuestion } from '../../Jobs/Dashboard/JobPostCreateUpdate/JobPostFormProvider';

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
      'Are you willing to undergo a background check, in accordance with local law/regulations ?',
    questionLabel: 'Backgound Check',
  },
  {
    id: nanoid(),
    description: '',
    isRequired: false,
    options: [],
    question: 'What is your average deal size in [Currency] (in thousands) ?',
    questionLabel: 'Average Deal Size',
    showDescription: false,
    type: 'shortAnswer',
  },

  {
    id: nanoid(),
    description: '',
    showDescription: false,

    type: 'singleSelect',
    isRequired: true,
    options: [
      {
        id: nanoid(),
        option: 'Yes',
      },
      {
        id: nanoid(),
        option: 'No',
      },
    ],
    question: `Do you have a valid driver's license ?`,
    questionLabel: 'Drivers Licence',
  },
  {
    id: nanoid(),
    description: '',
    showDescription: false,

    type: 'singleSelect',
    isRequired: true,
    options: [
      {
        id: nanoid(),
        option: 'Yes',
      },
      {
        id: nanoid(),
        option: 'No',
      },
    ],
    question: `Are you willing to take a drug test, in accordance with local law/regulations ?`,
    questionLabel: 'Drug Test',
  },
  {
    id: nanoid(),
    type: 'singleSelect',
    description: '',
    showDescription: false,

    isRequired: true,
    options: [
      { id: nanoid(), option: 'High School' },
      { id: nanoid(), option: `Bachelor's` },
      { id: nanoid(), option: `Master's` },
      {
        id: nanoid(),
        option: `Ph.D.`,
      },
    ],
    question: `Have you completed the following level of education: [Degree] ?`,
    questionLabel: 'Education',
  },

  {
    id: nanoid(),
    showDescription: false,

    type: 'singleSelect',
    isRequired: true,
    description: '',

    options: [
      {
        id: nanoid(),
        option: 'Yes',
      },
      {
        id: nanoid(),
        option: 'No',
      },
    ],
    question: `Are you comfortable working in a hybrid setting ?`,
    questionLabel: 'Hybrid Work',
  },
  {
    id: nanoid(),
    showDescription: false,

    type: 'singleSelect',
    isRequired: true,
    description: '',

    options: [
      {
        id: nanoid(),
        option: 'Yes',
      },
      {
        id: nanoid(),
        option: 'No',
      },
    ],
    question: `Are you comfortable commuting to this job's location ?`,
    questionLabel: 'Location',
  },
  {
    id: nanoid(),
    showDescription: false,

    type: 'singleSelect',
    isRequired: true,
    description: '',

    options: [
      {
        id: nanoid(),
        option: 'Yes',
      },
      {
        id: nanoid(),
        option: 'No',
      },
    ],
    question: `We must fill this position urgently. Can you start immediately?`,
    questionLabel: 'Urgent Hiring Need',
  },
  {
    id: nanoid(),
    type: 'singleSelect',
    description: '',
    isRequired: true,
    showDescription: false,
    options: [
      {
        id: nanoid(),
        option: 'Yes',
      },
      {
        id: nanoid(),
        option: 'No',
      },
    ],
    question: ` Will you now or in the future require sponsorship for employment visa status ?`,
    questionLabel: 'Visa Status',
  },
  {
    id: nanoid(),
    type: 'shortAnswer',
    showDescription: false,
    description: '',
    isRequired: true,
    options: [],
    question: `Can you confirm your work authorization and eligibility to work remotely without any restrictions in the USA ?`,
    questionLabel: 'Work Authorisation',
  },
  {
    id: nanoid(),
    type: 'multiSelect',
    description: '',
    isRequired: true,
    showDescription: false,
    options: [
      {
        id: nanoid(),
        option: 'Visual (e.g., videos, diagrams)',
      },
      {
        id: nanoid(),
        option: 'Auditory (e.g., lectures, discussions)',
      },
      {
        id: nanoid(),
        option:
          'Kinesthetic (e.g., hands-on activities, practical application)',
      },
    ],
    question: `When acquiring new skills or knowledge, what is your preferred learning style ?`,
    questionLabel: 'Learning Style',
  },
  {
    id: nanoid(),
    type: 'multiSelect',
    description: '',
    isRequired: true,
    showDescription: false,
    options: [
      {
        id: nanoid(),
        option: 'Authoritative',
      },
      {
        id: nanoid(),
        option: 'Transformational',
      },
      {
        id: nanoid(),
        option: 'Servant',
      },
      {
        id: nanoid(),
        option: 'Collaborative',
      },
    ],
    question: `What leadership style do you find most effective or inspiring ?`,
    questionLabel: 'Leadership Style',
  },
  {
    id: nanoid(),
    type: 'singleSelect',
    description: '',
    isRequired: true,
    showDescription: false,
    options: [
      {
        id: nanoid(),
        option: 'Yes',
      },
      {
        id: nanoid(),
        option: 'No',
      },
    ],
    question: `Are you comfortable working in an onsite setting ?`,
    questionLabel: 'Onsite Work',
  },
  {
    id: nanoid(),
    type: 'singleSelect',
    description: '',
    isRequired: true,
    showDescription: false,
    options: [
      {
        id: nanoid(),
        option: 'Yes',
      },
      {
        id: nanoid(),
        option: 'No',
      },
    ],
    question: `Are you comfortable working in a remote setting ?`,
    questionLabel: 'Remote Work',
  },
];
