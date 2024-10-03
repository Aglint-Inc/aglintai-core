import { CApiError } from '@aglint/shared-utils';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { fromError } from 'zod-validation-error';

export const createPostRoute = (schema: any, func: any, is_form?: boolean) => {
  const POST = async (req: Request) => {
    try {
      let payload: any;
      if (is_form) {
        payload = await req.formData();
      } else {
        payload = await req.json();
      }

      let parsed_body;
      if (schema) {
        parsed_body = schema.parse(payload);
      } else {
        parsed_body = payload;
      }

      const response = await func(parsed_body);
      if (!response) {
        return NextResponse.json(null, { status: 204 });
      }
      return NextResponse.json(response, {
        status: 200,
      });
    } catch (error: any) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        return NextResponse.json({ error: validationError }, { status: 400 });
      } else if (error instanceof CApiError) {
        console.error(error.type, error.message);
        console.error(error.type, error.structuredErrorData);
        return NextResponse.json(
          { error: error.message },
          { status: error.status },
        );
      }
      console.error(error.type);
      console.error(error.message);
      console.error(error.stack);

      return NextResponse.json(
        { error: 'Some thing went wrong' },
        { status: 500 },
      );
    }
  };
  return POST;
};
