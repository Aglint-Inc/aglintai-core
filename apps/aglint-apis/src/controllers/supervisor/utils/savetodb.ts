import {FunctionNames} from '@aglint/shared-types';
import {CallBackAll} from '@aglint/shared-utils';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';

const saveToDB = async ({
  content,
  user_id,
  function_name,
  metadata,
}: {
  content: string;
  user_id: string;
  function_name: FunctionNames;
  metadata: CallBackAll[];
}) => {
  return (
    await supabaseAdmin
      .from('user_chat')
      .insert({
        type: 'agent',
        content,
        user_id,
        function: function_name,
        metadata,
      })
      .select()
      .throwOnError()
  ).data[0];
};

export const handleResults = async ({
  alterResults,
  is_test,
  user_id,
}: {
  alterResults: {
    team: string;
    message: any;
    function: any;
    payload: CallBackAll[];
  }[];
  is_test: boolean;
  user_id: string;
}) => {
  if (alterResults.length === 0) {
    const resSave = handleError({is_test, user_id});
    return resSave;
  } else {
    const lastMessage = alterResults[alterResults.length - 1];
    const resSave = await saveToDB({
      content: lastMessage.message,
      user_id,
      function_name: lastMessage.function,
      metadata: lastMessage.payload,
    });
    return resSave;
  }
};

export const handleError = async ({
  is_test,
  user_id,
}: {
  is_test: boolean;
  user_id: string;
}) => {
  let resSave: Awaited<ReturnType<typeof saveToDB>> = null;
  if (!is_test) {
    resSave = await saveToDB({
      content:
        'Sorry unable to process your request. Please try again later or contact support.',
      user_id,
      function_name: null,
      metadata: null,
    });
  } else {
    resSave = {
      content: 'Sorry unable to process your request. Please try again later.',
      id: crypto.randomUUID(),
      function: null,
      user_id,
      type: 'agent',
      created_at: new Date().toISOString(),
      metadata: null,
    };
  }
  return resSave;
};
