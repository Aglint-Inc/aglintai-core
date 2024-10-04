import { NextResponse } from 'next/server';

import {
  type ApiInterface,
  type NextApiRequest,
} from '@/interface/NextRoute.interface';

/**
 * A factory function that generates a response handler for an API request.
 *
 * @template T - The type of the API interface.
 * @param {import('next').NextApiRequest} req - The Next.js API request object.
 * @param {import('next').NextApiResponse} res - The Next.js API response object.
 * @returns {(method: 'POST' | 'GET', apiImplementation: (reqDetails: {
 *   body?: T['request'];
 *   requesterDetails: typeof requesterDetails;
 * }) => Promise<T['response'] | { error: string; status: number }>,
 *   required?: Array<keyof T['request']>) => Promise<void>} - The response handler function.
 */
export function routeHandlerFactory<T extends ApiInterface>(
  method: 'POST' | 'GET',
  req: NextApiRequest,
) {
  /**
   * Sends a response with the given data and error, or an error message if the status is 500.
   *
   * @param {Object} options - An object containing optional data and error properties.
   * @param {T} [options.data] - The data to be sent in the response.
   * @param {string} [options.error] - The error message to be sent in the response.
   * @param {number} [status] - The status code of the response. Defaults to 200 if no error, 500 otherwise.
   * @return {Promise<Response>} A Promise that resolves to the response object.
   */
  function getResponse(
    {
      data,
      error,
    }: {
      data?: T['response'];
      error?: string;
      // {
      //   data: Parameters<typeof logApi>[0];
      //   level: Parameters<typeof logApi>[1];
      // };
    },
    status?: number,
  ) {
    status = status || (error ? 500 : 200);
    // if (res.headersSent) return;
    return NextResponse.json(status === 200 ? data : { error }, { status });
  }
  const requesterDetails = {
    user_id: req.headers.get('x-requester-id'),
    role: req.headers.get('x-requester-role'),
    recruiter_id: req.headers.get('x-requester-rec_id'),
  };

  /**
   * Checks the HTTP method of the request and executes the provided API implementation.
   *
   * @param {('POST' | 'GET')} method - The HTTP method to check.
   * @param {(reqDetails: {
   *   body?: T['request'];
   *   requesterDetails: typeof requesterDetails;
   * }) => Promise<T['response'] | { error: string; status?: number }>} apiImplementation - The API implementation function.
   * @param {(keyof T['request'])[]} [required] - Optional array of required properties.
   * @return {Promise<void>} A Promise that resolves to void.
   */
  async function apiMethodHandler(
    apiImplementation: (
      // eslint-disable-next-line no-unused-vars
      reqDetails: {
        body?: T['request'];
        requesterDetails: typeof requesterDetails;
      },
      // eslint-disable-next-line no-unused-vars
    ) => Promise<T['response'] | { error: string; status?: number }>,
    required?: (keyof T['request'])[],
  ) {
    try {
      const reqDetails: {
        body?: T['request'];
        requesterDetails: typeof requesterDetails;
      } = {
        requesterDetails,
      };
      if (method === 'POST') {
        reqDetails.body = (await req.json()) as T['request'];
      }
      if (required?.length) {
        for (const item of required) {
          if (!reqDetails.body?.[item as keyof T['request']]) {
            return getResponse(
              {
                error: `Invalid request. Required ${method == 'GET' ? 'prams' : 'props'} missing`,
              },
              400,
            );
          }
        }
      }

      const response = await apiImplementation(reqDetails);
      if (response && typeof response === 'object' && 'error' in response) {
        return getResponse(
          {
            error: response.error,
          },
          response.status,
        );
      }
      return getResponse({
        data: response,
      });
    } catch (e: any) {
      console.error(e);
      return getResponse({ error: e.message }, 500);
    }
  }
  return apiMethodHandler;
}
