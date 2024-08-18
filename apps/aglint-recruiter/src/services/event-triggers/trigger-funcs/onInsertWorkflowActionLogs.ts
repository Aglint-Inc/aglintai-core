import { DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export const onInsertWorkflowActionLogs = async ({
  new_data,
}: {
  new_data: DatabaseTable['workflow_action_logs'];
}) => {
  if (dayjsLocal(new_data.execute_at).diff(dayjsLocal(), 'second') <= 5) {
    supabaseWrap(
      await supabaseAdmin.rpc('run_workflow_action', {
        action_id: new_data.id,
      }),
    );
  }
};
