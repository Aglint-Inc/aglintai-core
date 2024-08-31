import { Form } from './form';
import { FormLayout } from './formlayout';
import {Footer} from '../Layout/Footer';

export const Login = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <FormLayout>
            <Form />
          </FormLayout>
        </div>
        <div className="sticky bottom-0">
          <Footer />
        </div>
      </div>
    </>
  );
};
