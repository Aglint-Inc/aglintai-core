import { Grid, Skeleton, Stack } from '@mui/material';



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
        <Stack width={'100%'} direction={'row'} alignItems={'center'} gap={2}>
          <Skeleton width={'25px'} height={'30px'} />
          <Skeleton
            component={'h2'}
            sx={{ borderRadius: '20px', width: '100%' }}
          />
        </Stack>
      </Grid>
      <Grid item xs>
        <Skeleton component={'h2'} sx={{ borderRadius: '10px' }} />
      </Grid>
      <Grid item xs>
        <Skeleton component={'h2'} sx={{ borderRadius: '10px' }} />
      </Grid>
      <Grid item xs>
        <Skeleton component={'h2'} sx={{ borderRadius: '10px' }} />
      </Grid>
    </Grid>
  );
}
