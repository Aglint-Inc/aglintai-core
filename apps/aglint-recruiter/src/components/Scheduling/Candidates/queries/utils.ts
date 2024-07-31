import { DatabaseEnums, DatabaseTable, DB } from '@aglint/shared-types';
import { createServerClient } from '@supabase/ssr';

export const addScheduleActivity = async ({
  title,
  application_id,
  description,
  task_id,
  logged_by,
  supabase,
  created_by,
  metadata,
  module = 'scheduler',
}: {
  title: string;
  application_id: string;
  description?: string;
  task_id?: string;
  logged_by: DatabaseTable['application_logs']['logged_by'];
  supabase: ReturnType<typeof createServerClient<DB>>;
  created_by: string;
  metadata?: DatabaseTable['application_logs']['metadata'];
  module?: DatabaseEnums['modules'];
}) => {
  const { data, error } = await supabase.from('application_logs').insert({
    application_id,
    title,
    description,
    task_id,
    created_by,
    logged_by,
    metadata,
    module,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
