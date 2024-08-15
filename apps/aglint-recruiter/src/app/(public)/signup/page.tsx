import { SeoPro } from '@/src/components/Common/SeoPro';
import SignUpComp from '@/src/components/SignUpComp';

const SignUpPage = () => {
  return (
    <>
      <SeoPro
        title='Sign Up | Aglint AI'
        description='AI for People Products'
      />
      <SignUpComp />
    </>
  );
};

export default SignUpPage;
