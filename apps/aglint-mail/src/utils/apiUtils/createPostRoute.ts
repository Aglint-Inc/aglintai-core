import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { fromError } from 'zod-validation-error';

export const createPostRoute = (schema: any, func: any) => {
  const POST = async (req: Request) => {
    try {
      console.log('oka', 1);
      const payload = await req.text();
      console.log('oka', 1);
      let parsed_body;
      if (schema) {
        parsed_body = schema.parse(payload);
      } else {
        parsed_body = payload;
      }
      console.log('oka', 1);
      const response = await func(parsed_body);
      return NextResponse.json(response, {
        status: 200,
      });
    } catch (error: any) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        return NextResponse.json({ error: validationError }, { status: 500 });
      }
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  };
  return POST;
};
