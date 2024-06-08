import { Avatar, Typography } from '@mui/material';
import { memo } from 'react';
const ProfilePicture = ({ name, url }: { name: string; url?: string }) => {
  return (
    <Avatar
      sx={{
        width: '84px',
        height: '84px',
        backgroundColor: `rgba(${Math.random() * 150},${Math.random() * 150},${
          Math.random() * 150
        },0.6)`,
      }}
      src={url}
      variant='rounded'
    >
      <Typography color={'white.700'} fontSize={'var(--space-5)'} variant='body1'>
        {name.charAt(0)}
      </Typography>
    </Avatar>
  );
};

export default memo(ProfilePicture);
