import PhoneScreenTemplate from '@/src/components/NewScreening/PhoneScreenTemplate';
import { WithScreening } from '@/src/components/withScreening';
import PhoneScreeningProvider from '@/src/context/PhoneScreeningContext/PhoneScreeningContext';

const ScreeningQuestionsPage = () => {
  return (
    <>
      <WithScreening>
        <PhoneScreeningProvider>
          <PhoneScreenTemplate />
        </PhoneScreeningProvider>
      </WithScreening>
    </>
  );
};

export default ScreeningQuestionsPage;
