/* eslint-disable security/detect-object-injection */
import { EmailTemplateFields, EmailTempPath } from '@aglint/shared-types';

import {
  CompanyEmailsTypeDB,
  EmailDynamicParams,
} from '@/src/types/companyEmailTypes';

export class EmailTemplateFiller {
  private all_company_temps: CompanyEmailsTypeDB;
  constructor(_all_company_temps?: CompanyEmailsTypeDB | null) {
    if (_all_company_temps) {
      this.all_company_temps = _all_company_temps;
    }
  }
  public fillEmail<T extends EmailTempPath>(
    templatePath: T,
    dynamic_fields: EmailDynamicParams<T>,
    email_template?: EmailTemplateFields,
  ): EmailTemplateFields {
    let updated_template = this.all_company_temps[templatePath];
    if (email_template) {
      updated_template = { ...email_template };
    }
    for (let key of Object.keys(dynamic_fields)) {
      updated_template.subject = updated_template.subject.replaceAll(
        key,
        dynamic_fields[String(key)],
      );
      updated_template.fromName = updated_template.fromName.replaceAll(
        key,
        dynamic_fields[String(key)],
      );
      updated_template.body = updated_template.body.replaceAll(
        key,
        dynamic_fields[String(key)],
      );
    }
    return updated_template;
  }
}
