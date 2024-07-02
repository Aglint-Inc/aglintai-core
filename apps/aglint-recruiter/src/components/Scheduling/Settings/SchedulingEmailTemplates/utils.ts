import { DatabaseTableInsert } from '@aglint/shared-types';

import { supabase } from '@/src/utils/supabase/client';

export async function upateEmailTemplate({
  id,
  data,
}: {
  id: string;
  data: DatabaseTableInsert['company_email_template'];
}) {
  const { data: emailDetails, error } = await supabase
    .from('company_email_template')
    .update({ ...data })
    .eq('id', id)
    .select()
    .single();

  if (!error) {
    return emailDetails;
  } else {
    return error;
  }
}

export const template_tabs = [
  {
    label: 'Email',
    key: 'email',
  },
  {
    label: 'Slack',
    key: 'slack',
  },
  {
    label: 'Agent',
    key: 'agent',
  },
  {
    label: 'Calender',
    key: 'calender',
  },
] as const;
