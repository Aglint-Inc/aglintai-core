import { NextResponse } from 'next/server';
import PhoneScreeningResend from '../../../utils/email/phone-screening-resend/fetch';

interface ReqPayload {
  application_id: string;
}

export async function POST(req: Request) {
  const { application_id }: ReqPayload = await req.json();

  try {
    const data = await PhoneScreeningResend(application_id);
    return NextResponse.json(
      { message: 'success', data },
      {
        status: 200,
      },
    );
  } catch (e: any) {
    return NextResponse.json(
      {
        error: `${e.name}: mail_type:candidate_availability_request,  ${e.message}`,
      },
      {
        status: 400,
      },
    );
  }
}
