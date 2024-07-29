import { render } from '@react-email/render';
import { createElement } from 'react'; // Import React to use React.createElement
import type { DatabaseEnums, EmailTemplateAPi } from '@aglint/shared-types';
import { ServerError } from './customErrors';

export const renderEmailTemplate = async <
  T extends DatabaseEnums['email_slack_types'],
>(
  template: T,
  payload: EmailTemplateAPi<T>['react_email_placeholders'],
) => {
  const {
    default: Template,
    dummy,
    getSubject,
  } = await import(`../../emails/${template}`);
  if (typeof getSubject !== 'function')
    throw new ServerError('getSubject is not a function type', 500);

  if (typeof dummy !== 'object')
    throw new ServerError('dummy data is not a object type', 500);

  const element = createElement(Template, payload);
  const html = render(element);
  return { html };
};
