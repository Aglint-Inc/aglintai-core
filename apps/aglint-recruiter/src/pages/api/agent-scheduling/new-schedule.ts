import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { application_id } = req.body;
  try {
    //
    return res.status(200).send('OK');
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export default handler;
// session_id[]
// application_id
// availbility options
// date_range
//
