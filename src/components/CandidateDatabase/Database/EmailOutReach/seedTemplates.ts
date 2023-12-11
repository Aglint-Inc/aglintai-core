export const outReachTemplates: TemplateType[] = [
  {
    id: 0,
    name: 'Template 1',
    subject: `We're looking for talent to join our team`,
    templateHtml: '',
    templateJson: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              text: 'Hi',
              type: 'text',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              text: "I'm ",
              type: 'text',
            },
            {
              type: 'cand-name',
              attrs: {
                label: 'Candidate Name',
              },
            },
            {
              text: ' Your profile stood out to me as a strong fit for our open role.',
              type: 'text',
            },
          ],
        },
        {
          type: 'AiPrompt',
          attrs: {
            aiPrompt:
              'Add one sentence on why the candidate is a good fit for this company and also mention candidates strength',
          },
        },
        {
          type: 'paragraph',
          content: [
            {
              text: 'Are you interested in finding some time to speak on Zoom?',
              type: 'text',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              text: 'Best',
              type: 'text',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'rec-name',
              attrs: {
                label: 'Recruiter Firstname',
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 1,
    name: 'Template 2',
    subject: 'Research study into the future of work',
    templateHtml: '',
    templateJson: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
        },
      ],
    },
  },
];

export type TemplateType = {
  id: number;
  name: string;
  subject: string;
  templateJson: any;
  templateHtml: string;
};
