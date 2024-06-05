import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';

import { palette } from '@/src/context/Theme/Theme';

export const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 'none',
    background: '#fff',
    padding: '0px',
    boxShadow: '0px 4px 8px 0px #04444D26',
    border: '1px solid var(--neutral-6)',
    borderRadius: '10px',
    color: palette.grey[600],
    fontSize: '14px',
    fontWeight: 400,
  },
});
