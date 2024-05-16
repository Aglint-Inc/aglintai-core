import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { CompanyEmailsTypeDB } from '@/src/types/companyEmailTypes';

import { supabaseAdmin } from '../supabase/supabaseAdmin';

export const fetchCompEmailTemplate = async (company_id: string) => {
  const [company] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter')
      .select('email_template')
      .eq('id', company_id),
  );

  return company.email_template as CompanyEmailsTypeDB;
};
