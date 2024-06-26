import {
  ApiInterface,
  NextApiRequest,
  NextApiResponse,
} from '@/src/interface/NextApiRequest.interface';

/**
 * Returns a function that sends a response with the given data and error, or an error message if the status is 500.
 *
 * @param {NextApiResponse} res - The Next.js API response object.
 * @return {Function} A function that takes an object with optional data and error properties, and an optional status code.
 *                    The function sends the response with the given data and error, or an error message if the status is 500.
 */
export const getResponseFactory = <T>(res: NextApiResponse) => {
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
      data?: T;
      error?: string;
    },
    status?: number,
  ) {
    status = status || (error ? 500 : 200);
    return res.status(status).send(status === 200 ? data : { error });
  }
  return getResponse;
};

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
export function apiRequestHandlerFactory<T extends ApiInterface>(
  req: NextApiRequest,
  res: NextApiResponse,
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
    },
    status?: number,
  ) {
    status = status || (error ? 500 : 200);
    return res.status(status).send(status === 200 ? data : { error });
  }
  const requesterDetails = {
    user_id: req.headers['x-requester-id'] as string,
    role: req.headers['x-requester-role'] as string,
    recruiter_id: req.headers['x-requester-rec_id'] as string,
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
    method: 'POST' | 'GET',
    // eslint-disable-next-line no-unused-vars
    apiImplementation: (reqDetails: {
      body?: T['request'];
      requesterDetails: typeof requesterDetails;
    }) => Promise<T['response'] | { error: string; status?: number }>,
    required?: (keyof T['request'])[],
  ) {
    try {
      if (req.method !== method) {
        res.setHeader('Allow', method);
        return res.status(405).end('Method Not Allowed!'); // Method Not Allowed
      }
      const reqDetails: {
        body?: T['request'];
        requesterDetails: typeof requesterDetails;
      } = {
        requesterDetails,
      };
      if (method === 'POST') {
        reqDetails.body = req.body as T['request'];
      }
      if (required?.length) {
        for (const item of required) {
          if (!reqDetails.body?.[String(item)]) {
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
      if (typeof response === 'object' && 'error' in response) {
        return getResponse({ error: response.error }, response.status);
      }
      return getResponse({ data: response });
    } catch (e) {
      return getResponse({ error: e.message }, 500);
    }
  }
  return apiMethodHandler;
}
