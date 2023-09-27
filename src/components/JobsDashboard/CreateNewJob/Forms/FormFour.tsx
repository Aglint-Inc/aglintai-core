import { NewJobStep4, ShareVia } from '@/devlink';

const FormFour = () => {
  return (
    <NewJobStep4
      slotShareVia={
        <ShareVia
          onClickCopy={{ onClick: () => {} }}
          isHowtoShareVisible={true}
        />
      }
    />
  );
};

export default FormFour;
