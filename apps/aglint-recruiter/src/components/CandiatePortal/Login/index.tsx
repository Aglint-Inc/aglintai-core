import { Form } from './form';
import { FormLayout } from './formlayout';

export const Login = () => {
  return (
    <>
      <div className='flex min-h-screen flex-col'>
        <div className='flex-grow'>
          <FormLayout>
            <Form />
          </FormLayout>
        </div>
      </div>
    </>
  );
};
