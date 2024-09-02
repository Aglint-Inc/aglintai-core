/* eslint-disable react/no-unescaped-entities */

import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { render } from '@react-email/render';
import { type PostgrestError } from '@supabase/supabase-js';
import { type NextApiRequest, type NextApiResponse } from 'next';
import * as React from 'react';

import Footer from './components/footer';
import Header from './components/header';
import { box, container, main, paragraph } from './styles';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const subject = `Welcome to Aglint - Your Registration is Successful!`;

const Onboarding = ({
  name = 'Brian',
  flags = { sourcing: true, scheduling: true },
}: Omit<OnboardingProps, 'email'>) => (
  <Html>
    <Head />
    <Preview>{subject}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Header />
          <Text style={paragraph}>
            <strong>Dear {name},</strong>
          </Text>
          <Text style={paragraph}>
            Thank you for registering with Aglint! We're excited to have you
            onboard.
          </Text>

          <Text style={paragraph}>What's Next ?</Text>
          <Text style={paragraph}>
            <strong>Create a Job Posting :</strong>
          </Text>
          <Text style={paragraph}>
            Go to the 'Jobs' section in your dashboard .
            <br /> Click on 'Create Job' to begin .
            <br /> Fill in the job details, including title, description, and
            requirements .
            <br /> Submit your job posting for candidates to see .
          </Text>
          {flags.sourcing && (
            <>
              <Text style={paragraph}>
                <strong>Source Candidates :</strong>
              </Text>
              <Text style={paragraph}>
                Navigate to the 'Candidates' tab .
                <br /> Use our search tools to find ideal candidates .
                <br /> Review candidate profiles .
                <br /> Shortlist candidates for your job postings .
              </Text>
            </>
          )}
          {flags.scheduling && (
            <>
              <Text style={paragraph}>
                <strong>Schedule interviews :</strong>
              </Text>
              <Text style={paragraph}>
                Navigate to the 'Scheduler' tab .
                <br /> Create interview modules.
                <br /> Schedule interviews with interview modules.
              </Text>
            </>
          )}

          <Text style={paragraph}>
            Best regards,
            <br />
            The Aglint Team
            <br />
            <Link
              style={{
                color: 'var(--accent-11)',
                textDecoration: 'underline',
              }}
              href='support@aglinthq.com'
            >
              {' '}
              support@aglinthq.com
            </Link>
          </Text>

          <Footer />
        </Section>
      </Container>
    </Body>
  </Html>
);

const getRecruiterOnboardingTemplate = (
  props: Omit<OnboardingProps, 'email'>,
) => {
  const html = render(<Onboarding {...props} />);
  return { html, subject };
};

const sendMail = async (props: OnboardingProps) => {
  // if (process.env.NEXT_PUBLIC_HOST_NAME !== process.env.NEXT_PUBLIC_WEBSITE)
  //   return;
  const { email, ...safePayload } = props;
  const { html, subject } = getRecruiterOnboardingTemplate(safePayload);
  const mail = {
    to: email,
    from: {
      name: 'Aglint Admin',
      email: 'messenger@aglinthq.com',
    },
    subject,
    html,
  };
  await sgMail.send(mail);
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RecruiterOnboardingEmailApi['response']>,
) => {
  const { name, flags, email } =
    req.body as RecruiterOnboardingEmailApi['request'];
  if (!name || !flags || !email) {
    res.status(400).send({
      data: false,
      error: { message: 'Invalid parameters' },
    } as RecruiterOnboardingEmailApi['response']);
    return;
  }
  try {
    await sendMail({ name, email, flags });
    res.status(200).send({
      data: true,
      error: null,
    } as RecruiterOnboardingEmailApi['response']);
    return;
  } catch (e) {
    res.status(400).send({
      data: false,
      error: { message: e },
    } as RecruiterOnboardingEmailApi['response']);
    return;
  }
};

export default handler;

type OnboardingProps = RecruiterOnboardingEmailApi['request'];

export type RecruiterOnboardingEmailApi = {
  request: {
    name: string;
    email: string;
    flags: {
      sourcing: boolean;
      scheduling: boolean;
    };
  };
  response: {
    data: boolean;
    error: PostgrestError;
  };
};
