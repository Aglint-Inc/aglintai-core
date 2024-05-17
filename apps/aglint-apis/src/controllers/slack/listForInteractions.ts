import {Request, Response} from 'express';
import {slackWeb} from 'src/services/slack/slackWeb';

export const listForInteractions = async (req: Request, res: Response) => {
  try {
    const {payload} = req.body;
    const interaction_data = JSON.parse(payload);
    const user_id = interaction_data.user.id;
    const action = JSON.parse(interaction_data).actions[0];

    // console.log(action);
    // console.log(user_id);
    if (action.action_id === 'available') {
      await slackWeb.chat.postMessage({
        channel: user_id,
        text: 'Thank you for RSVPing Yes!',
      });
    } else if (action.action_id === 'not_available') {
      await slackWeb.chat.postMessage({
        channel: user_id,
        text: 'Thank you for RSVPing Yes!',
      });
    }

    return res.status(200).send('ok');
  } catch (error: any) {
    console.error(error.message);
  }
};

// import {NextApiRequest, NextApiResponse} from 'next';
// import {WebClient} from '@slack/web-api';
// import querystring from 'querystring';
// import crypto from 'crypto';

// const token = process.env.SLACK_BOT_TOKEN;
// const signingSecret = process.env.SLACK_SIGNING_SECRET;
// const web = new WebClient(token);

// function verifySlackRequest(req: NextApiRequest): boolean {
//   const slackSignature = req.headers['x-slack-signature'] as string;
//   const requestBody = req.body;
//   const timestamp = req.headers['x-slack-request-timestamp'] as string;
//   const sigBasestring = `v0:${timestamp}:${querystring.stringify(requestBody)}`;
//   const mySignature = `v0=${crypto
//     .createHmac('sha256', signingSecret as string)
//     .update(sigBasestring, 'utf8')
//     .digest('hex')}`;

//   return crypto.timingSafeEqual(
//     Buffer.from(mySignature, 'utf8'),
//     Buffer.from(slackSignature, 'utf8')
//   );
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === 'POST') {
//     // if (!verifySlackRequest(req)) {
//     //   return res.status(400).send('Verification failed');
//     // }
//     console.log(req.body);

//     return res.status(200).send('ok');
//     const parsedBody = querystring.parse(req.body);
//     if (parsedBody.payload) {
//       const payload = JSON.parse(parsedBody.payload as string);

//       if (payload.type === 'block_actions') {
//         const action = payload.actions[0];
//         const userId = payload.user.id;

//         try {
//           if (action.action_id === 'rsvp_yes') {
//             await web.chat.postMessage({
//               channel: userId,
//               text: 'Thank you for RSVPing Yes!',
//             });
//           } else if (action.action_id === 'rsvp_no') {
//             await web.chat.postMessage({
//               channel: userId,
//               text: 'Sorry to hear you cannot attend.',
//             });
//           }

//           res.status(200).send('');
//         } catch (error) {
//           console.error('Error handling interaction:', error);
//           res.status(500).send('Internal Server Error');
//         }
//       } else {
//         res.status(400).send('Bad Request');
//       }
//     } else {
//       res.status(400).send('Bad Request');
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
