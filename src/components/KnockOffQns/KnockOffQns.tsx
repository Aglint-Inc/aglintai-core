import { CandidateStart, PhoneScreenSuccess } from '@/devlink';
import { PhoneScreening } from '@/devlink';
import { YTransform } from '@/src/utils/framer-motions/Animation';

import CompanyLogo from './CompanyLogo';
import PhoneScreeningQn from './PhoneScreeningQn';
import { useScreeningCtx } from './ScreeningCtxProvider';
import AUIButton from '../Common/AUIButton';

const KnockOffQns = () => {
  const { state } = useScreeningCtx();

  let slide;
  if (state.showStartMessage) {
    slide = <StartSlide />;
  } else if (state.showEndMessage) {
    slide = <EndMessage />;
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
      <PhoneScreening
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
  const { updateState } = useScreeningCtx();
  return (
    <CandidateStart
      slotLogo={
        <>
          <CompanyLogo />
        </>
      }
      slotStartButton={
        <>
          <AUIButton
            onClick={() => {
              updateState({
                path: 'currentQn',
                value: 1,
              });
              updateState({
                path: 'showStartMessage',
                value: false,
              });
            }}
          >
            Start
          </AUIButton>
        </>
      }
    />
  );
};

const EndMessage = () => {
  return (
    <>
      <PhoneScreenSuccess slotLogo={<CompanyLogo />} />
    </>
  );
};

export default KnockOffQns;
