import { NextResponse } from 'next/server';
import RequestCandidateSlot from '../../../utils/email/request_candidate_slot/fetch';

interface ReqPayload {
  application_id: string;
  request_id: string;
}

export async function POST(req: Request) {
  const { application_id, request_id }: ReqPayload = await req.json();

  try {
    const data = await RequestCandidateSlot(application_id, request_id);
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
