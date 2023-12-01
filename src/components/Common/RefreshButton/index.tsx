import { RefreshButton } from '@/devlink2';

const RefreshBtn = ({ text, isDisabled, onClick }) => {
  const style = {
    color: isDisabled ? 'grey' : '#5293c7',
  };
  return (
    <RefreshButton
      text={isDisabled ? 'Loading' : text}
      iconProps={{
        className: isDisabled ? 'rotating' : null,
        style: { ...style },
      }}
      buttonProps={{
        onClick: async () => await onClick(),
        style: { ...style },
      }}
    />
  );
};

export default RefreshBtn;
