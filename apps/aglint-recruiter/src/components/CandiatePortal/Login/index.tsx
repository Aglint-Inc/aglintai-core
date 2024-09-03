import { Form } from './form';
import { FormLayout } from './formlayout';

export const Login = () => {
  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <div className='flex-grow'>
          <FormLayout>
            <Form />
          </FormLayout>
        </div>
      </div>
    </>
  );
};