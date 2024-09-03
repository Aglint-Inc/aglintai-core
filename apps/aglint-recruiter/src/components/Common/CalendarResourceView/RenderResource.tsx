import { Stack, Typography } from '@mui/material';

import MuiAvatar from '../MuiAvatar';
import { CustomTooltip } from '../Tooltip';
import { type Resource } from './types';

function RenderResourceContent(resourceInfo) {
  const { data } = resourceInfo.resource
    .extendedProps as Resource['extendedProps'];

  return (
    <CustomTooltip
      title={
        <Stack spacing={1} px={1} py={0.5}>
          <Typography variant='caption' fontWeight={400}>
            {data.email}
          </Typography>
        </Stack>
      }
    >
      <Stack direction={'row'} gap={1} p={1}>
        <MuiAvatar
          src={data.profile_pic}
          level={data.name}
          variant='rounded'
          width='32px'
          height='32px'
          fontSize='12px'
        />
        <Stack>
          <Typography variant='body2' color={'var(--neutral-12)'}>
            {data.name}
          </Typography>
          <Typography variant='body2'>{data.position}</Typography>
        </Stack>
      </Stack>
    </CustomTooltip>
  );
}

export default RenderResourceContent;
