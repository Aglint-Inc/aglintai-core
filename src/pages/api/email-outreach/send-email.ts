import { NextApiRequest, NextApiResponse } from 'next';

// Import required modules
const nodemailer = require('nodemailer');

// Set up OAuth2 client

type BodyParams = {
  fromEmail: string;
  toEmail: string;
  access_token: string;
  refresh_token: string;
  subject: string;
  body: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { access_token, refresh_token, fromEmail, toEmail, body, subject } =
      req.body as BodyParams;
    if (
      !access_token ||
      !refresh_token ||
      !fromEmail ||
      !toEmail ||
      !body ||
      !subject
    )
      return res.status(400).send('missing required fields');

    // const client = new OAuth2Client(
    //   process.env.GOOGLE_CLIENT_ID,
    //   process.env.GOOGLE_CLIENT_SECRET,
    //   process.env.GOOGLE_REDIRECT_URI,
    // );

    // const gmail = google.gmail({ version: 'v1', auth: client });

    // const rawMessage = makeEmail();
    // const resp = await gmail.users.messages.send({
    //   userId: 'me',
    //   requestBody: {
    //     raw: rawMessage,
    //   },
    // });

    // console.log('Email sent:', resp.data);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: fromEmail, // User's Gmail address
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: refresh_token, // Refresh token obtained during the authorization process
        accessToken: access_token,
      },
    });

    // Compose email options
    const mailOptions = {
      from: fromEmail,
      to: toEmail,
      subject,
      html: body,
    };
    // Send email
    await transporter.sendMail(mailOptions);
    return res.status(200).send('Email sent');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default handler;
