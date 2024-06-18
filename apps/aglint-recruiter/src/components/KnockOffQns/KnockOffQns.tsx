import { ButtonSolid } from '@/devlink/ButtonSolid';
import { CandidateStart } from '@/devlink/CandidateStart';
import { PhoneScreenings } from '@/devlink/PhoneScreenings';
import { PhoneScreenSuccess } from '@/devlink/PhoneScreenSuccess';
import PhoneScreeningFormSubmit from '@/public/lottie/PhoneScreeningFormSubmit';
import { YTransform } from '@/src/utils/framer-motions/Animation';

import CompanyLogo from './CompanyLogo';
import PhoneScreeningQn from './PhoneScreeningQn';
import { useScreeningCtx } from './ScreeningCtxProvider';

const KnockOffQns = () => {
  const { state } = useScreeningCtx();

  let slide;
  if (state.showEndMessage) {
    slide = <EndMessage />;
  } else if (state.showStartMessage) {
    slide = <StartSlide />;
  } else if (state.currentQn > 0) {
    slide = (
      <PhoneScreeningQn
        path={`phoneScreen[${state.currentQn - 1}]`}
        qnNo={state.currentQn}
      />
    );
  }
  return (
    <>
      <PhoneScreenings
        isPreviewEnable={state.isPreview}
        isPrevDisable={false}
        slotStep={
          <>
            <YTransform uniqueKey={state.currentQn}>{slide}</YTransform>
          </>
        }
      />
    </>
  );
};

const StartSlide = () => {
  const { updateState, state } = useScreeningCtx();
  return (
    <CandidateStart
      slotLogo={
        <>
          <CompanyLogo />
        </>
      }
      slotStartButton={
        <>
          <ButtonSolid
            textButton='Start'
            size={2}
            onClickButton={{
              onClick: () => {
                updateState({
                  path: 'currentQn',
                  value: 1,
                });
                updateState({
                  path: 'showStartMessage',
                  value: false,
                });
              },
            }}
          />
        </>
      }
      textWelcome={state.startMessage}
    />
  );
};

const EndMessage = () => {
  const { state } = useScreeningCtx();

  return (
    <>
      <PhoneScreenSuccess
        textSubmitted={
          state.formFilledDate
            ? 'Already submitted the form'
            : 'Form submitted successfully.'
        }
        slotLogo={<CompanyLogo />}
        slotLottie={
          <>
            <PhoneScreeningFormSubmit />
          </>
        }
        textSuccess={state.endMessage}
        onClickSupport={{
          onClick: () => {
            if (!state.isPreview)
              window.open(
                `${process.env.NEXT_PUBLIC_HOST_NAME}/support/create?id=${state.applicationId}`,
              );
          },
        }}
      />
    </>
  );
};

export default KnockOffQns;
