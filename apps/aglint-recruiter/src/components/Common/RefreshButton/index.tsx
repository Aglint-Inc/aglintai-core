import { RefreshButton } from '@/devlink2/RefreshButton';

const RefreshBtn = ({ text, isDisabled, onClick, animatedDisable = true }) => {
  const style = {
    color: isDisabled ? 'var(--neutral-3)' : 'var(--neutral-4)',
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
