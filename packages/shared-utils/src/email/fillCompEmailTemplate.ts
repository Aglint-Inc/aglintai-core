/* eslint-disable @typescript-eslint/ban-ts-comment */
import type {
  DatabaseEnums,
  DatabaseTable,
  EmailTemplateAPi,
} from '@aglint/shared-types';
import { replaceAll } from '../replaceAll';
const { convert } = require('html-to-text');

export const fillCompEmailTemplate = <
  T extends DatabaseEnums['email_slack_types'],
>(
  dynamic_fields: EmailTemplateAPi<T>['comp_email_placeholders'],
  email_template: Pick<
    DatabaseTable['company_email_template'],
    'from_name' | 'body' | 'subject'
  >
) => {
  const updated_template = { ...email_template };
  if (!updated_template.from_name) {
    updated_template.from_name = '';
  }

  for (const key of Object.keys(dynamic_fields)) {
    updated_template.from_name = replaceAll(
      updated_template.from_name,
      `{{${key}}}`,
      // @ts-ignore
      dynamic_fields[String(key)]
    );

    updated_template.subject = convert(updated_template.subject);
    updated_template.subject = replaceAll(
      updated_template.subject,
      `{{${key}}}`,
      // @ts-ignore
      dynamic_fields[String(key)]
    );
    updated_template.body = replaceAll(
      updated_template.body,
      `{{${key}}}`,
      // @ts-ignore
      dynamic_fields[String(key)]
    );
  }

  return updated_template;
};
