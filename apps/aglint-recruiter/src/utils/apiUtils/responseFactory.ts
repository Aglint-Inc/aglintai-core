import { NextApiResponse } from 'next';

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
