import { RefreshButton } from '@/devlink2';

const RefreshBtn = ({ text, isDisabled, onClick, animatedDisable = true }) => {
  const style = {
    color: isDisabled ? 'grey' : '#5293c7',
  };
  return (
    <RefreshButton
      text={isDisabled ? (animatedDisable ? 'Loading' : text) : text}
      iconProps={{
        className: isDisabled ? (animatedDisable ? 'rotating' : null) : null,
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
