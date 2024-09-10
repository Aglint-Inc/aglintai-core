import type { Form } from '@/workflows/types';

export const validate = (form: Form) => {
  const newForms = Object.assign(
    {},
    ...Object.entries(form).map(([key, value]) => ({
      [key]: {
        ...value,
        error: value.required
          ? !value.validation(value.value as never)
          : value.value
            ? !value.validation(value.value as never)
            : false,
      },
    })),
  ) as typeof form;
  const error = !!Object.values(newForms).find(({ error }) => error === true);
  return { newForms, error };
};
