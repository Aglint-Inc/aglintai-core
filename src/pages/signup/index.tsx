import SignUpComp from '@/src/components/SignUpComp';
import { AuthProvider } from '@/src/context/AuthContext/AuthContext';
import { SignupProvider } from '@/src/context/SingupContext/SignupContext';

const SignUpPage = () => {
  return (
    <>
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
