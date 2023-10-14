const Priority = {
  low: '#467B7C',

  medium: '#467B7C',

  high: '#F79A3E',

  highest: '#D93F4C',
};
// export const mapPriority = (level: string) => {
//   return Priority[String(level.toLocaleLowerCase())]?.text;
// };
export const mapPriorityColor = (level: string) => {
  return Priority[String(level.toLocaleLowerCase())];
};

const Status = {
  open: '#3498DB',
  pending: '#F1C40F',
  'on hold': '#95A5A6',
  resolved: '#228F67',
  escalated: '#9B59B6',
  canceled: '#34495E',
  reopened: '#E74C3C',
};
export const mapStatusColor = (status: string) => {
  return Status[String(status.toLocaleLowerCase())];
};
// export const mapPriorityColor = (level: string) => {
//   return Priority[String(level.toLocaleLowerCase())];
// };

// const Status = {
//   open: '#3498DB',
//   pending: '#F1C40F',
//   'on hold': '#95A5A6',
//   resolved: '#228F67',
//   escalated: '#9B59B6',
//   canceled: '#34495E',
//   reopened: '#E74C3C',
// };
// export const mapStatusColor = (status: string) => {
//   return Status[String(status.toLocaleLowerCase())];
// };

export const allPriority = ['low', 'medium', 'high', 'highest'];
export const allStatus = [
  // 'open',
  'pending',
  'in progress',
  'on hold',
  'resolved',
  'escalated',
  'canceled',
  'reopened',
];

export function fillEmailTemplate(
  template: string,
  email: {
    first_name: string;
    last_name: string;
    job_title: string;
    company_name: string;
  },
) {
  let filledTemplate = template;

  const placeholders = {
    '[firstName]': email.first_name,
    '[lastName]': email.last_name,
    '[jobTitle]': email.job_title,
    '[companyName]': email.company_name,
  };

  for (const [placeholder, value] of Object.entries(placeholders)) {
    // eslint-disable-next-line security/detect-non-literal-regexp
    const regex = new RegExp(placeholder.replace(/\[|\]/g, '\\$&'), 'g');
    filledTemplate = filledTemplate.replace(regex, value);
  }

  return filledTemplate;
}
