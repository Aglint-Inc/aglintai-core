import { render } from '@react-email/render';
import { ServerError } from './customErrors';
import { validatePayload } from './validate-payload';
import React from 'react'; // Import React to use React.createElement

export const renderEmailTemplate = async (filename: string, payload = {}) => {
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

  console.log('payload', payload);

  const element = React.createElement(Template, payload);
  const html = render(element);
  return { html, subject: getSubject(payload) };
};
