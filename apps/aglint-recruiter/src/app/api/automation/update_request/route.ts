import { NextResponse } from 'next/server';

import {
  fetchTodoRequests,
  updateRequestStatus,
} from '@/src/utils/automation/utils/update_request_functions';

export async function POST(req) {
  const { count } = await req.json();
  try {
    const requests: Awaited<ReturnType<typeof fetchTodoRequests>> =
      await fetchTodoRequests(count);

    if (!requests.length) {
      return NextResponse.json(
        {
          message: 'success',
          data: [],
        },
        { status: 200 },
      );
    }

    await updateRequestStatus(requests.map((request) => request.id));

    return NextResponse.json(
      {
        message: 'success',
        data: requests.map((req) => ({
          request_id: req.id,
          application_id: req.application_id,
        })),
      },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      { message: 'error ' + e.message },
      { status: 400 },
    );
  }
}
