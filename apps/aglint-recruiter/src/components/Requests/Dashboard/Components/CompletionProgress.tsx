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

// const BorderLinearProgress = withStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       height: 10,
//       borderRadius: 5,
//     },
//     colorPrimary: {
//       backgroundColor:
//         theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
//     },
//     bar: {
//       borderRadius: 5,
//       backgroundColor: '#1a90ff',
//     },
//   }),
// )(LinearProgress);
