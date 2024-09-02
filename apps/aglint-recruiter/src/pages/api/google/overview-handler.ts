/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import axios from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';

const url = `${process.env.NEXT_PUBLIC_HOST_NAME}/api/google/overview`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.body && Array.isArray(req.body)) {
      console.log(req.body.length, 'applications length');

      const applications = req.body;
      await Promise.all(
        applications.map(async (application) => {
          try {
            await axios.post(`${url}`, {
              application: application,
            });
            console.log(
              'Request successful for application:',
              application.application_id,
            );
          } catch (error) {
            console.error(
              'Error for application:',
              application.application_id,
              error.message,
            );
            // You might want to handle errors here
          }
        }),
      );
      return res.status(200).send('success');
    } else {
      console.log('missing req body');
      return res.status(400).send('missing req body');
    }
  } catch (error) {
    console.log(error, req.body.application_id);
    return res.status(500).send(error.message);
  }
};

export default handler;
