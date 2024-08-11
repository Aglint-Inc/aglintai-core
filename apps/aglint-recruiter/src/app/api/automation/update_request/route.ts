import { NextResponse } from 'next/server';

// import { settings } from './utils/constants';
import { fetchTodoRequests } from '../utils/fetchRequests';
import { updateRequestStatus } from '../utils/updateRequestStatus';

export async function GET() {
  try {
    const requests: Awaited<ReturnType<typeof fetchTodoRequests>> =
      await fetchTodoRequests();

    if (!requests.length) {
      return NextResponse.json(
        {
          message: 'success',
          data: [],
        },
        { status: 200 },
      );
    }

    const promises = requests.map((request) => updateRequestStatus(request.id));

    Promise.all(promises).catch((error) => {
      throw new Error(error.message);
    });

    return NextResponse.json(
      {
        message: 'success',
        data: requests.map((req) => ({
          request_id: req.id,
          application_id: req.id,
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
