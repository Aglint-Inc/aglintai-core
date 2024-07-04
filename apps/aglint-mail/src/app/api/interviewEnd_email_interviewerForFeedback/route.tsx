import { NextResponse } from 'next/server';
import * as v from 'valibot';
import { interviewEndEmailInterviewerForFeedbackSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { sendMailFun } from '../../../utils/apiUtils/sendMail';
import { fetchUtil } from './fetch-util';

export async function POST(req: Request) {
  const { meta } = await req.json();
  try {
    const req_body = v.parse(
      interviewEndEmailInterviewerForFeedbackSchema,
      meta,
    );

    const { filled_comp_template, react_email_placeholders, recipient_email } =
      await fetchUtil(req_body);

    await sendMailFun({
      filled_comp_template,
      react_email_placeholders,
      recipient_email,
    });

    return NextResponse.json(
      { message: 'success' },
      {
        status: 200,
      },
    );
  } catch (e) {
    console.error(e);
    if (e) {
      return NextResponse.json(
        {
          error: `${e.name}:  ${e.message}`,
        },
        {
          status: 500,
        },
      );
    }
  }
}
