import { ChatApp } from '../components/ChatApp/ChatApp';

function Page() {
  return (
    <>
      <ChatApp />
    </>
  );
}

Page.publicProvider = (page) => {
  return <>{page}</>;
};

export default Page;
