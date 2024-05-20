import Seo from '@components/Common/Seo';

// import { PageNothing } from '@/devlink/PageNothing';

export default function InternalServerError() {
  return (
    <>
      <Seo
        title='Internal server Error'
        description='AI for People Products'
      />
      PageNothing
      {/* <PageNothing /> */}
    </>
  );
}

// InternalServerError.publicProvider = (page) => {
//   return <>{page}</>;
// };
