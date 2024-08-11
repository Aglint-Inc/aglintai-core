import { NextResponse } from 'next/server';

// import { settings } from './utils/constants';
import { fetchTodoRequests } from '../utils/fetchRequests';
import { updateRequestStatus } from '../utils/updateRequestStatus';

export async function GET() {
  try {
    const requests: Awaited<ReturnType<typeof fetchTodoRequests>> =
      await fetchTodoRequests();
    if (!requests.length) throw new Error('to_do statu request not found');

    const promises = requests.map((request) => updateRequestStatus(request.id));

    Promise.all(promises)
      .then(() => {})
      .catch((error) => {
        throw new Error(error.message);
      });

    return NextResponse.json(
      {
        message: 'success',
        data: requests,
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
