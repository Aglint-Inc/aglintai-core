import Seo from '@components/Common/Seo';

// import { PageNothing } from '@/devlink';

export default function InternalServerError() {
  return (
    <>
      <Seo
        title='Internal server Error'
        description='AI Powered Talent Development Platform.'
      />
      PageNothing
      {/* <PageNothing /> */}
    </>
  );
}

// InternalServerError.publicProvider = (page) => {
//   return <>{page}</>;
// };
