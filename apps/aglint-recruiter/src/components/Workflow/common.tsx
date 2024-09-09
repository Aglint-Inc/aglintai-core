import type { WorkflowStore } from '@/context/Workflows/store';

import { UITextArea } from '../Common/UITextArea';
import UITextField from '../Common/UITextField';
import { Checkbox } from '@components/ui/checkbox';

export type Form = WorkflowStore['popup']['form'];

export const initialForm: Form = {
  auto_connect: {
    error: false,
    helperText: "Auto connect can't be empty",
    required: false,
    validation: () => true,
    value: false,
  },
  description: {
    error: false,
    helperText: "Description can't be empty",
    required: false,
    validation: (value) =>
      value && typeof value === 'string' && value.trim().length !== 0,
    value: '',
  },
  title: {
    error: false,
    helperText: "Title can't be empty",
    required: true,
    validation: (value) =>
      value && typeof value === 'string' && value.trim().length !== 0,
    value: '',
  },
};

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

export const Forms = ({
  form: { title, auto_connect, description },
  setForm,
}: {
  form: Form;
  // eslint-disable-next-line no-unused-vars
  setForm: (newForms: Partial<Form>) => void;
}) => {
  return (
    <>
      <UITextField
        label='Title'
        value={title.value}
        helperText={title.helperText}
        error={title.error}
        onFocus={() =>
          setForm({
            title: { ...title, error: false },
          })
        }
        onChange={(e) => {
          setForm({
            title: { ...title, value: e.target.value, error: false },
          });
        }}
      />
      <UITextArea
        label='Description'
        rows={5}
        value={description.value}
        helperText={description.helperText}
        error={description.error}
        onFocus={() =>
          setForm({
            description: { ...description, error: false },
          })
        }
        onChange={(e) => {
          setForm({
            description: {
              ...description,
              value: e.target.value,
              error: false,
            },
          });
        }}
      />
      <div className='flex items-center space-x-2'>
        <Checkbox
          id='auto-connect'
          checked={auto_connect.value}
          onCheckedChange={(checked) =>
            setForm({
              auto_connect: {
                ...auto_connect,
                value: checked === true,
              },
            })
          }
        />
        <label
          htmlFor='auto-connect'
          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        >
          Auto connect to all new jobs
        </label>
      </div>
    </>
  );
};
