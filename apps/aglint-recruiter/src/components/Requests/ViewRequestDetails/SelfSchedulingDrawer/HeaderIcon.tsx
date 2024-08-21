import { Stack } from '@mui/material';

import { GlobalIcon } from '@/devlink/GlobalIcon';


function HeaderIcon() {

  return (
    <>
      <Stack display={'flex'} paddingTop={'3px'}>
        <GlobalIcon iconName={'attach_email'} size={4} />
      </Stack>
    </>
  );
}

export default HeaderIcon;
