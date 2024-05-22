import Seo from '@/src/components/Common/Seo';
import SignUpComp from '@/src/components/SignUpComp';
import { SignupProvider } from '@/src/context/SingupContext/SignupContext';

const SignUpPage = () => {
  return (
    <>
      <Seo title='Sign Up | Aglint AI' description='AI for People Products' />
      <SignupProvider>
        <SignUpComp />
      </SignupProvider>
    </>
  );
};

export default SignUpPage;

SignUpPage.publicProvider = (page) => {
  return <>{page}</>;
};
