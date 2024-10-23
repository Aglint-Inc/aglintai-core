import InterviewTypeDetail from './_common/components';

async function Page({ params }: { params: { pool: string } }) {
  const { pool } = await params;
  return <InterviewTypeDetail module_id={pool} />;
}

export default Page;
