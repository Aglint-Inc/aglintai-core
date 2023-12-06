/* eslint-disable no-unused-vars */
import { cronTrigger } from '@trigger.dev/sdk';
import { SendGrid } from '@trigger.dev/sendgrid';

import { client } from '../trigger';

// Creating instances of SendGrid and Slack clients.
const sendgrid = new SendGrid({
  id: 'sendgrid',
  apiKey: process.env.SENDGRID_API_KEY!,
});

// Defining a job that sends a weekly summary email to users and posts total numbers to Slack.
client.defineJob({
  id: 'reminder_email', // Unique identifier for the job.
  name: 'reminder email', // A specific name for the job.
  version: '1.0.0', // Version number for the job.
  integrations: { sendgrid }, // Integrating SendGrid and Slack clients into this job.
  trigger: cronTrigger({
    // Setting a cron schedule to run the job every 2 minutes.
    cron: '*/2 * * * *',
  }),
  enabled: false,
  run: async (payload, io, ctx) => {
    // Inside the 'run' function, several operations are performed to send weekly summaries and post to Slack.

    const users = [
      { name: 'Ravi', id: 1, email: 'ravi@aglinthq.com' },
      { name: 'Dheeraj', id: 2, email: 'dheeraj@aglinthq.com' },
    ];

    let sentCount = 0;

    // Iterating through the list of users.
    for (const user of users) {
      // Sending a weekly summary email to users with summaries enabled.
      await io.sendgrid.sendEmail(`Reminder message ${user.id}`, {
        to: user.email,
        from: 'admin@aglinthq.com', // The sender's email.
        subject: 'Your weekly summary',
        text: `Hi, ${user.name} welcome to Trigger.Dev`, // HTML content for the email.
      });
      sentCount++;
    }

    // Posting a message to Slack with a summary of the sent and unsent emails.
    // await io.slack.postMessage('Notify team', {
    //   text: `Weekly summary sent to ${sentCount} users and not sent to ${notSentCount} users`,
    //   channel: 'YOUR_CHANNEL_ID', // Specify the Slack channel ID for posting the message.
    // });

    io.logger.log(`${sentCount} email sent`);
  },
});
