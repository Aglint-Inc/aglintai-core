import { LinearProgress } from '@mui/material';

function CompletionProgress({
  value = 65,
  color,
}: {
  value?: number;
  color?: string;
}) {
  return (
    <LinearProgress
      sx={{
        color: color,
      }}
      variant='determinate'
      value={value}
    />
  );
}

export default CompletionProgress;
