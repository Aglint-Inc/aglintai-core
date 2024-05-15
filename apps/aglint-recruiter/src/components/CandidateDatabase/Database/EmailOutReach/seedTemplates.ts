export const outReachTemplates: TemplateType[] = [
  {
    id: 0,
    name: 'Recruitment Inquiry',
    subject: "We're looking for talent to join our team",
    templateHtml: '',
    templateJson: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            { text: 'Hi ', type: 'text' },
            { type: 'cand-name', attrs: { label: 'Candidate Name' } },
            { text: ',', type: 'text' },
          ],
        },
        {
          type: 'paragraph',
          content: [
            { text: "I'm ", type: 'text' },
            { type: 'rec-name', attrs: { label: 'Recruiter Firstname' } },
            {
              text: ' Your profile stood out to me as a strong fit for our open role.',
              type: 'text',
            },
          ],
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
        { type: 'paragraph', content: [{ text: 'Best', type: 'text' }] },
        {
          type: 'paragraph',
          content: [
            { type: 'rec-name', attrs: { label: 'Recruiter Firstname' } },
          ],
        },
      ],
    },
  },
  {
    id: 1,
    name: 'Networking Connection',
    subject: 'Connection Request',
    templateHtml: '',
    templateJson: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            { text: 'Hi ', type: 'text' },
            { type: 'cand-name', attrs: { label: 'Candidate Name' } },
            { text: ',', type: 'text' },
          ],
        },
        {
          type: 'paragraph',
          content: [
            { text: "I'm ", type: 'text' },
            { type: 'rec-name', attrs: { label: 'Recruiter Firstname' } },
            {
              text: ", currently at Widgets Inc. and i'm willing to expand my network",
              type: 'text',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              text: 'Are you interested in finding some time to speak on zoom.',
              type: 'text',
            },
          ],
        },
        { type: 'paragraph', content: [{ text: 'Best,', type: 'text' }] },
        {
          type: 'paragraph',
          content: [
            { type: 'rec-name', attrs: { label: 'Recruiter Firstname' } },
          ],
        },
      ],
    },
  },
  {
    id: 2,
    name: 'Research Study Invitation',
    subject: 'Research study into the future of work',
    templateHtml: '',
    templateJson: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            { text: 'hi ', type: 'text' },
            { type: 'cand-name', attrs: { label: 'Candidate Name' } },
            { text: ',', type: 'text' },
          ],
        },
        {
          type: 'paragraph',
          content: [
            { text: "I'm ", type: 'text' },
            { type: 'rec-name', attrs: { label: 'Recruiter Firstname' } },
            {
              text: " and I'm doing research into post-pandemic work life balance. We're launching a new product in the space, and I'd love to get some feedback from someone like you who is ",
              type: 'text',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              text: 'If this sounds interesting to you, we could find some time to speak on a video call.',
              type: 'text',
            },
          ],
        },
        { type: 'paragraph', content: [{ text: 'Best,', type: 'text' }] },
        {
          type: 'paragraph',
          content: [
            { type: 'rec-name', attrs: { label: 'Recruiter Firstname' } },
          ],
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
