import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { Database } from '@/src/types/schema';

const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

type BodyParams = {
  user_name: string;
  user_id: string;
  chat_id: string;
};

//activity push that interviewer confiermed the slots
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { chat_id, user_id, user_name } = req.body as BodyParams;

  if (!user_id || !user_name)
    return res.status(400).send('missing required fields');

  try {
    const [chatHistory] = supabaseWrap(
      await supabaseAdmin
        .from('agent_chatx')
        .select('history')
        .eq('id', chat_id),
    );

    if (!chatHistory) {
      return res.status(404).send('chat_id does not exist');
    }

    let new_activity = {
      type: 'activity',
      value: `Slots have been confirmed for ${user_name}`,
      status: 'success',
      user_id: user_id,
      created_at: new Date().toISOString(),
    };
    chatHistory.history.push(new_activity);

    supabaseWrap(
      await supabaseAdmin.from('agent_activity').insert({
        agent_chat_id: chat_id,
        title: 'Interviewer confirmed slots',
        type: 'user',
        icon_status: 'success',
      }),
    );

    supabaseWrap(
      await supabaseAdmin
        .from('agent_chatx')
        .update({
          history: chatHistory.history,
        })
        .eq('id', chat_id),
    );

    return res.status(200).send('ok');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export default handler;
