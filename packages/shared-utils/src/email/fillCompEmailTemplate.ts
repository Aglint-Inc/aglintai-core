//@ts-nocheck
import type {
  DatabaseEnums,
  DatabaseTable,
  EmailTemplateAPi,
} from '@aglint/shared-types';
import { replaceAll } from '../replaceAll';
import { parse } from 'node-html-parser';

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
      dynamic_fields[String(key)]
    );

    updated_template.subject = htmlToText(updated_template.subject);
    updated_template.subject = replaceAll(
      updated_template.subject,
      `{{${key}}}`,
      dynamic_fields[String(key)]
    );
    updated_template.body = replaceAll(
      updated_template.body,
      `{{${key}}}`,
      dynamic_fields[String(key)]
    );
  }

  return updated_template;
};

const htmlToText = (html: string) => {
  const text = parse(html).text;
  return text;
};
