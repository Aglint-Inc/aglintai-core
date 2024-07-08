import { DatabaseEnums, DB } from '@aglint/shared-types';
import sgMail from '@sendgrid/mail';
import { createServerClient } from '@supabase/ssr';
import { NextApiRequest, NextApiResponse } from 'next';

import { API_request_feedback } from './type';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const {
      session_id,
      relation_id,
      candidate,
      job_id,
      receiver,
      //   deadline,
      //   candidateName,
      //   JobTitle,
      //   feedbackFormLink,
      //   interviewerName,
      //   company,
    } = req.body as API_request_feedback['request'];
    if (!session_id || !relation_id || !candidate || !job_id || !receiver) {
      return res
        .status(400)
        .send(
          getResponse({ error: 'Invalid request. Required props missing.' }),
        );
    }

    const { sender, job_title, company, meeting_id } =
      await checkPermissionsAndGetDetails({
        job_id,
        getVal: (name) => req.cookies[String(name)],
        roles: ['admin'],
        session_id,
      });

    if (sender) {
      const email = getEmail({
        candidateName: candidate.name,
        deadline: 'lol hour',
        feedbackFormLink: `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/view?meeting_id=${meeting_id}&tab=feedback`,
        interviewerName: receiver.name,
        jobTitle: job_title,
        sender: {
          name: sender.name,
          company: company,
          jobTitle: sender.job_title,
        },
      });
      //   return res.status(200).send(email);
      await sgMail.send({
        from: { name: sender.name, email: sender.email },
        to: receiver.email,
        subject: email.subject,
        html: email.content,
      });
      return res.status(200).send(getResponse({ emailSent: true }));
    }
    return res
      .status(200)
      .send(getResponse({ error: 'error in validations role' }));
  }
  res.setHeader('Allow', 'POST');
  res.status(405).end('Method Not Allowed!');
}

const getResponse = (data: { emailSent?: boolean; error?: string }) => {
  return { emailSent: false, error: null, ...data };
};

const checkPermissionsAndGetDetails = async ({
  getVal,
  roles,
  job_id,
  session_id,
}: {
  // eslint-disable-next-line no-unused-vars
  getVal: (name: string) => string;
  roles: DatabaseEnums['user_roles'][];
  job_id: string;
  session_id: string;
}) => {
  try {
    const supabase = createServerClient<DB>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return getVal(name);
          },
        },
      },
    );

    return await supabase.auth.getUser().then(async ({ data, error }) => {
      if (error) throw new Error(error.message);
      if (data.user.id) {
        const asyncCalls = await Promise.all([
          supabase
            .from('recruiter_relation')
            .select(
              'role,recruiter_user!public_recruiter_relation_user_id_fkey( first_name, last_name, position)',
            )
            // .select('*')
            .eq('user_id', data.user.id)
            .single()
            .then(({ data: rData, error }) => {
              if (error) throw new Error(error.message);
              if (roles.includes(rData.role)) {
                return {
                  email: data.user.email,
                  name: `${rData.recruiter_user.first_name || ''} ${rData.recruiter_user.last_name || ''}`.trim(),
                  job_title: rData.recruiter_user.position,
                };
              }
              throw new Error('request rejected.');
            }),
          //   supabase
          //     .from('interview_module_relation')
          //     .select(
          //       '*, interview_module(*), recruiter_user(email, first_name, last_name , recruiter_relation(recruiter(name))) ',
          //     )
          //     .eq('id', relation_id)
          supabase
            .from('public_jobs')
            .select('job_title, company')
            .eq('id', job_id)
            .single()
            .then(({ data: jData, error }) => {
              if (error) throw new Error(error.message);
              return jData;
            }),
          supabase
            .from('interview_session')
            .select('meeting_id')
            .eq('id', session_id)
            .then(({ data: Data, error }) => {
              if (error) throw new Error(error.message);
              return Data;
            }),
        ]);
        return {
          sender: asyncCalls[0],
          job_title: asyncCalls[1].job_title,
          company: asyncCalls[1].company,
          meeting_id: asyncCalls[2][0].meeting_id,
        };
      }
      throw new Error('Failed to load auth user.');
    });
  } catch (error) {
    throw new Error(error);
  }
};

const getEmail = ({
  candidateName,
  jobTitle,
  interviewerName,
  deadline,
  feedbackFormLink,
  sender,
}: {
  candidateName: string;
  jobTitle: string;
  interviewerName: string;
  deadline: string;
  feedbackFormLink: string;
  sender: { name: string; jobTitle: string; company: string };
}) => {
  return {
    subject: `Feedback Request for ${candidateName} Interview - ${jobTitle}`,
    content: `<p>Hi ${interviewerName},</p>
<p>I hope this message finds you well. Could you please provide your feedback for ${candidateName}'s interview for the ${jobTitle} position? Your insights are crucial for our decision-making process.</p>
<p>Please submit your feedback using the link below by ${deadline}:</p>
<a href='${feedbackFormLink}'>Feedback Link</a>
<p>Thank you for your cooperation and valuable input.</p>
<p>Best regards,
<br/>${sender.name}
<br/>${sender.jobTitle}
<br/>${sender.company} Recruitment Team.</p>`,
  };
};
