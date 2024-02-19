import { createClient } from '@supabase/supabase-js';
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export const config = {
  runtime: 'edge',
};

export default async function handler(req, res) {
  if (req.body.table && req.body.details) {
    const { data, error } = await supabase
      .from(req.body.table)
      .insert(req.body.details)
      .select();

    if (!error) {
      res.status(200).send(data);
    } else {
      res.status(400).send({ data: null, error: error.message });
    }
  } else {
    res.status(400).send({
      data: null,
      error: !req.body.table
        ? 'table is required in body'
        : 'details needed in body',
    });
  }
}
