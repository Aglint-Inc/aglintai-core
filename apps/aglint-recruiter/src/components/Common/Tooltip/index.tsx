import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';

export const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    // maxWidth: '300px',
    background: 'var(--white)',
    padding: '0px',
    boxShadow: 'var(--shadow-3)',
    border: '1px solid var(--neutral-6)',
    borderRadius: 'var(--radius-2)',
    color: 'var(--neutral-12)',
    fontSize: 'var(--font-size-1)',
    fontWeight: 400,
  },
  [theme.breakpoints.up('sm')]: {
    '& .MuiTooltip-tooltip': {
      fontSize: 'inherit',
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
}));
