import axios from 'axios';
import { google } from 'googleapis';
import { type NextApiRequest, type NextApiResponse } from 'next';

const jwtClient = new google.auth.JWT(
  'job-posting@aglint-cloud-381414.iam.gserviceaccount.com',
  null,
  '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDqUN/t/Hpclu7Q\nDpMIHH3YRBARMeTI2pxxFMNFl9PbcJpsul+4HFFyhfBpoXTNarXuXtf90v9g+mtQ\nfsBGfdI1hSuH5ZGnndYKURCuRCqMIEy/buw4z727hrS6Hqwht3XIetduql6Nn3ow\nhxt4L8NZRqoLMefxHMXbCFvcmEqaXiRiHrmjQDUSva3lrI5l2twZ7zLEC1bEuFZi\nSy3pnpjKJbkgPTwgww+4HFf/SFrEztI8eTW/gDaDFp5K4wJnakkNwjv/osfV5n/c\nBRd9N/n2psr7Z1pEDx6o+lxJMT5Nsl4G7ECcVz3vl10TXeV9+Bkp/tEKoLhXyYtv\nG137TBgBAgMBAAECggEABx14NEnDNTAt3aZgpXmYgm58KqqAQQ9e2mH0FUcZSz+/\nx7MP3KdK+5pYuNtq0KFHt56cilALulAWXcQQjn9r+H00C4EPh4aH4SmxowoNvPIu\n5G3/yTCZOUJblu5/IXm4v1MIG0ub+grUfvheT5urL9kBCTydZ31dPnPCNthOxSHN\ncvNKfDetesjJtmtC/yFHME9R58KY427Lljze1WPmR3+LpqrsoV71zJl6Jlk0AcRC\n0R/UwNxamkttkCvZne0QgmVe4ZzRFxnLgITaJHP+SfNxarXF+OQZuGOGHz36m/Hu\nvt7lAe7XBa9v5uM8kFHfRuayNGiboz90Tgd6y5nHwQKBgQD25hIluVA+I+1zdepW\n+tDfAZznPx6awOpyeMY0zDQk8w4yk29Z2u069UttNquCC8ydZ56FnzFFREvqKFNa\nQWQyNmNlIM1Fj+/+yKq2x23ZWSXZ9mP4XsrxqN7EDd9XdRsmkuuCi8XMseqPwp3y\nAIm4heQIdUU65ABNMmk7J++mIQKBgQDy9BAPMHNsrswMQrjgeuHw3OvUkOE7+Y3G\n9tCgvQj8jG5tH9herViUN3bcm4cJZoImwp3fnA2x4SFonnvn4slW8uoo/A7Qz2Fh\n0OvvtabI6iSOLD9xBY2twvb4pxtICOGcH11KNQZZVbxbK7Myr0uNVQTkqVpLT0G/\nQ6l7xv514QKBgDVK3+vonhtrodtkPlrb9K3OKVH42+BHd9ORoibPVQoMtKnSDRz2\nFnK9c7R1Mnv1lAr9zMfG3tm2rjQy1BsNNlVoS/gOJoC3WvRB2Cdv0JQzm+n6NwXr\nYB7ddogW/nhgPKYM3GznQqC2Xoz9Ux5jY1bC/7+boH/fqvj+wpwUOLRBAoGBANvN\na2oSj5rYWcsN4m1VP2zGsqXRnbTBBj/ntMB3xdWWx6D6mqqtceJGe8cC/pzGnSGs\nGWDgspMn9y3LlJYqW7XKd4c048KOnK/+cDaixY4oJ4JpDcyXFaMLLJ2xscDuKA8z\nYRdt+ZyBMLPbSXill1j6fj7R6NsRjY4ZDRDq6/SBAoGAMce89eLGg1enLc891e3g\nE6bREgeStKbFzKJ+qeaypWGTnc4LltCKmrppcck1q3HwKId+Cd6KaUXPLwS2JFPl\nqxzfoqn3xWHiYvpwLl7pCTwDtkboqT1cv4Exkl7XQu3Op48xxg+AIFuw1MPRxhN7\nCRZXLmc7hvPlBupzg42RMv4=\n-----END PRIVATE KEY-----\n',
  ['https://www.googleapis.com/auth/indexing'],
  null,
);

export type BodyParamsJobIndexing = {
  url: string;
  type: 'delete' | 'update';
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
  if (req.body.url === undefined) {
    res.status(400).json({ error: 'URL is required' });
  }

  const body = req.body as BodyParamsJobIndexing;

  jwtClient.authorize(async function (err, tokens) {
    if (err) {
      res.status(500).json({ error: 'Failed to authenticate' });
      return;
    }

    const options = {
      method: 'POST',
      url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokens.access_token}`,
      },
      data: {
        url: body.url, // Replace with your actual job URL
        type: body?.type === 'delete' ? 'URL_DELETED' : 'URL_UPDATED',
      },
    };

    try {
      const response = await axios(options);
      // eslint-disable-next-line no-console
      console.log(response.data);
      res.status(200).json(response.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).json({ error: 'Failed to submit URL for indexing' });
    }
  });
}
