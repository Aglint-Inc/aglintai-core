import { Stack, Typography } from '@mui/material';

import { Checkbox } from '@/devlink/Checkbox';

function CalendarFilter({ setFilter, filter }) {
  return (
    <Stack
      direction={'row'}
      gap={2}
      mb={2}
      sx={{
        paddingBottom: '100px',
      }}
    >
      <Typography
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        gap={1}
      >
        <Checkbox
          isChecked={!!filter?.find((fil) => fil === 'confirmed')}
          onClickCheck={{
            onClick: () => {
              if (filter?.find((fil) => fil === 'confirmed')) {
                setFilter((pre) => pre.filter((p) => p !== 'confirmed'));
              } else {
                setFilter((pre) => [...pre, 'confirmed']);
              }
            },
          }}
        />
        Confirmed
      </Typography>
      <Typography
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        gap={1}
      >
        <Checkbox
          isChecked={!!filter?.find((fil) => fil === 'completed')}
          onClickCheck={{
            onClick: () => {
              if (filter?.find((fil) => fil === 'completed')) {
                setFilter((pre) => pre.filter((p) => p !== 'completed'));
              } else {
                setFilter((pre) => [...pre, 'completed']);
              }
            },
          }}
        />
        Completed
      </Typography>
      <Typography
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        gap={1}
      >
        <Checkbox
          isChecked={!!filter?.find((fil) => fil === 'cancelled')}
          onClickCheck={{
            onClick: () => {
              if (filter?.find((fil) => fil === 'cancelled')) {
                setFilter((pre) => pre.filter((p) => p !== 'cancelled'));
              } else {
                setFilter((pre) => [...pre, 'cancelled']);
              }
            },
          }}
        />
        Cancelled
      </Typography>
    </Stack>
  );
}

export default CalendarFilter;
