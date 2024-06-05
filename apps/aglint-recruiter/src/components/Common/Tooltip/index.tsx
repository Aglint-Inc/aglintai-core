import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';

export const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 'none',
    background: 'var(--white)',
    padding: '0px',
    boxShadow: 'var(--shadow-3)',
    border: '1px solid var(--neutral-6)',
    borderRadius: 'var(--radius-2)',
    color: 'var(--neutral-12)',
    fontSize: 'var(--font-size-2)',
    fontWeight: 400,
  },
});
