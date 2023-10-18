import Interview from '@/src/components/Interview';
import { InterviewContextProvider } from '@/src/context/InterviewContext';
import { InterviewDetailsContextProvider } from '@/src/context/InterviewDetails';
import ScreenSizeProvider from '@/src/context/ResizeWindow/ResizeWindow';

function MockTestPage() {
  return (
    <div>
      <ScreenSizeProvider>
        <InterviewDetailsContextProvider>
          <InterviewContextProvider>
            <Interview />
          </InterviewContextProvider>
        </InterviewDetailsContextProvider>
      </ScreenSizeProvider>
    </div>
  );
}

export default MockTestPage;

MockTestPage.getLayout = (page) => {
  return <>{page}</>;
};
