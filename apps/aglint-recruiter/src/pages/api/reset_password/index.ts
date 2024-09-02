import { createClient } from '@supabase/supabase-js';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { type API_reset_password } from './type';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const redirectTo = `${process.env.NEXT_PUBLIC_HOST_NAME}/reset-password`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { email } = req.body as unknown as API_reset_password['request'];
    if (!email) {
      return res
        .status(400)
        .send(
          getResponse({ error: 'Invalid request. Required props missing.' }),
        );
    }

    const isAllowed = await server_checkUserRolePermissions({
      getVal: (name) => req.cookies[String(name)],
      roles: ['admin'],
    });
    if (isAllowed) {
      const { error: emailError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo,
        },
      );

      if (!emailError) {
        return res.send(getResponse({ passwordReset: true }));
      } else {
        return res.status(200).send(
          getResponse({
            error:
              emailError.message || 'Error in resending the invite to user.',
          }),
        );
      }
    }
    return res
      .status(200)
      .send(getResponse({ error: 'error in validations role' }));
  }
  res.setHeader('Allow', 'POST');
  res.status(405).end('Method Not Allowed!');
}

const getResponse = (data: { passwordReset?: boolean; error?: string }) => {
  return { passwordReset: false, error: null, ...data };
};

import { type DatabaseEnums, type DB } from '@aglint/shared-types';
import { createServerClient } from '@supabase/ssr';

/**
 * Checks if a user has certain roles based on their authentication.
 *
 * @param {object} options - Options object.
 * @param {(name: string) => string} options.getVal - Function to retrieve a value associated with a given name (e.g., cookies).
 * @param {DatabaseEnums['user_roles'][]} options.roles - Array of user roles to check against.
 * @returns {Promise<boolean>} - Promise resolving to a boolean indicating whether the user possesses any of the specified roles.
 *
 * @example
 * // Import the function
 * import { server_checkUserRolePermissions } from '.../xyz';
 * import { NextApiRequest } from 'next';
 *
 * // Example roles to check against
 * const exampleRoles = ['admin', 'hiring_manager'];
 *
 * // Example usage with Next.js API route
 * const hasPermission = await server_checkUserRolePermissions({
 *   getVal: (name) => req.cookies[String(name)], // Retrieves cookies from the request object
 *   roles: exampleRoles,
 * });
 *
 * if (hasPermission) {
 *   console.log('User has permission!');
 * } else {
 *   console.log('User does not have permission.');
 * }
 *
 * @param {NextApiRequest} req - The request object, typically provided in Next.js API routes.
 * @notes
 * - Ensure that the `getVal` function is properly implemented to retrieve the necessary value, such as cookies, for authentication.
 * - Provide the appropriate `roles` array containing the roles to be checked against.
 * - Handle any errors thrown by the function or returned from the asynchronous operations.
 */
export const server_checkUserRolePermissions = async ({
  getVal,
  roles,
}: {
  // eslint-disable-next-line no-unused-vars
  getVal: (name: string) => string;
  roles: DatabaseEnums['user_roles'][];
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
          //   set(name: string, value: string, options: { [key: string]: any }) {
          //     res.setHeader('Set-Cookie', `${name}=${value}; ${options}`);
          //   },
          //   remove(name: string) {
          //     res.setHeader('Set-Cookie', `${name}=; Max-Age=0`);
          //   },
        },
      },
    );

    return await supabase.auth.getUser().then(({ data, error }) => {
      if (error) throw new Error(error.message);
      if (data.user.id) {
        return supabase
          .from('recruiter_relation')
          .select('id,roles(name)')
          .eq('user_id', data.user.id)
          .eq('is_active', true)
          .then(({ data, error }) => {
            if (error) throw new Error(error.message);
            return (roles as string[]).includes(data[0].roles.name);
          });
      }
      throw new Error('Failed to load auth user.');
    });
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves the role of a user based on their authentication\.
 *
 * @param {object} options - Options object.
 * @param {(name: string) => string} options.getVal - Function to retrieve a value associated with a given name (e.g., cookies).
 * @returns {Promise<{role: string, user_id: string}>} - Promise resolving to an object containing the user's role and ID.
 *
 * @example
 * // Import the function
 * import { server_getUserRoleAndId } from '.../xyz';
 *
 * // Example function to retrieve value based on name
 * const exampleGetVal = (name: string) => {
 *   // Implement your custom logic to retrieve the value based on the name
 *   return ''; // Example: Dummy implementation, replace with actual logic
 * };
 *
 * try {
 *   const { role, user_id } = await server_getUserRoleAndId({
 *     getVal: exampleGetVal,
 *   });
 *
 *   console.log('User role:', role);
 *   console.log('User ID:', user_id);
 * } catch (error) {
 *   console.error('An error occurred:', error);
 * }
 *
 * @notes
 * - Ensure that the `getVal` function is properly implemented to retrieve the necessary value, such as cookies, for authentication.
 * - The function retrieves the user's role and ID from the database based on authentication status.
 * - Handle any errors thrown by the function or returned from the asynchronous operations.
 */
export const server_getUserRoleAndId = async ({
  getVal,
}: {
  // eslint-disable-next-line no-unused-vars
  getVal: (name: string) => string;
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

    return await supabase.auth.getUser().then(({ data, error }) => {
      if (error) throw new Error(error.message);
      if (data.user.id) {
        return supabase
          .from('recruiter_relation')
          .select('id,roles(name)')
          .eq('user_id', data.user.id)
          .eq('is_active', true)
          .then(({ data: dataR, error }) => {
            if (error) throw new Error(error.message);
            return { role: dataR[0].roles.name, user_id: data.user.id };
          });
      }
      throw new Error('Failed to load auth user.');
    });
  } catch (error) {
    throw new Error(error);
  }
};
