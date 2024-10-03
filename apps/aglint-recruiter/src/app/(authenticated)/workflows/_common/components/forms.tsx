import { Checkbox } from '@components/ui/checkbox';

import { UITextArea } from '@/components/Common/UITextArea';
import UITextField from '@/components/Common/UITextField';
import type { Form } from '@/workflows/types';

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
        value={title.value!}
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
        value={description.value!}
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
          checked={auto_connect.value!}
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
