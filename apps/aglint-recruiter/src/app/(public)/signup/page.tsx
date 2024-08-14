import { SeoPro } from '@/src/components/Common/SeoPro';
import SignUpComp from '@/src/components/SignUpComp';
import { SignupProvider } from '@/src/context/SingupContext/SignupContext';

const SignUpPage = () => {
  return (
    <>
      <SeoPro
        title='Sign Up | Aglint AI'
        description='AI for People Products'
      />
      <SignupProvider>
        <SignUpComp />
      </SignupProvider>
    </>
  );
};

export default SignUpPage;
