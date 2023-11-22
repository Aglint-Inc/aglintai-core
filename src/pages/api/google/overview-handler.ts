/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
// import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(req.body);
    // if (req.body && Array.isArray(req.body)) {
    //   const applications = req.body;
    //   applications.map((application) => {
    //     axios.post(
    //       `${process.env.NEXT_PUBLIC_HOTS_NAME}/api/overview/overview-palm`,
    //       { application: application },
    //     );
    //   });
    // } else {
    //   console.log('missing req body');
    //   res.status(400).send('missing req body');
    // }
  } catch (error) {
    console.log(error, req.body.application_id);
    res.status(500).send(error.message);
  }
};

export default handler;
