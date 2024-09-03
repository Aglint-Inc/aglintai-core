import { Grid, Skeleton } from '@mui/material';

export default function SubTaskCardSkeleton() {
  return (
    <Grid
      direction={'row'}
      alignItems={'center'}
      pl={3}
      width={'80%'}
      container
      spacing={1}
    >
      <Grid item xs>
        <Skeleton component={'h2'} sx={{ borderRadius: 'var(--radius-4)' }} />
      </Grid>
      <Grid item xs>
        <Skeleton component={'h2'} sx={{ borderRadius: 'var(--radius-4)' }} />
      </Grid>
      <Grid item xs>
        <Skeleton component={'h2'} sx={{ borderRadius: 'var(--radius-4)' }} />
      </Grid>
      <Grid item xs>
        <Skeleton component={'h2'} sx={{ borderRadius: 'var(--radius-4)' }} />
      </Grid>
    </Grid>
  );
}