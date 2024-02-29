import PhoneScreenTemplate from '@/src/components/NewScreening/PhoneScreenTemplate';
import PhoneScreeningProvider from '@/src/context/PhoneScreeningContext/PhoneScreeningContext';

const ScreeningQuestionsPage = () => {
  return (
    <>
      <PhoneScreeningProvider>
        <PhoneScreenTemplate />
      </PhoneScreeningProvider>
    </>
  );
};

export default ScreeningQuestionsPage;
