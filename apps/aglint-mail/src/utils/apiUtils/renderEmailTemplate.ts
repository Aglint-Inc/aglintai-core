import { render } from '@react-email/render';
import { createElement } from 'react'; // Import React to use React.createElement
import { ServerError } from './customErrors';

interface Payload {
  subject: string;
  body: string;
}

export const renderEmailTemplate = async (
  filename: string,
  payload = {} as Payload,
) => {
  const {
    default: Template,
    dummy,
    getSubject,
  } = await import(`../../emails/${filename}`);
  if (typeof getSubject !== 'function')
    throw new ServerError('getSubject is not a function type', 500);

  if (typeof dummy !== 'object')
    throw new ServerError('dummy data is not a object type', 500);

  // validatePayload(dummy, payload); //validate the incoming payload

  const element = createElement(Template, payload);
  const html = render(element);
  return { html, subject: getSubject(payload.subject) };
};
