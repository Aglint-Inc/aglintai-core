import Seo from '@/src/components/Common/Seo';
import SignUpComp from '@/src/components/SignUpComp';
import { AuthProvider } from '@/src/context/AuthContext/AuthContext';
import { SignupProvider } from '@/src/context/SingupContext/SignupContext';

const SignUpPage = () => {
  return (
    <>
      <Seo
        title='Aglint for Employers | Signup'
        description='AI for People Products'
      />
      <AuthProvider>
        <SignupProvider>
          <SignUpComp />
        </SignupProvider>
      </AuthProvider>
    </>
  );
};

export default SignUpPage;

SignUpPage.getLayout = (page) => {
  return <>{page}</>;
};
