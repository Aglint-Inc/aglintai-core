import { Popover, Stack } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

import { LoaderSvg } from '@/devlink/LoaderSvg';
import { PreviewEmail } from '@/devlink2/PreviewEmail';

interface Prop {
  Loading: boolean;
  anchorEl: HTMLButtonElement;
  setAnchorEl: Dispatch<SetStateAction<HTMLButtonElement>>;
  setHtml: any;
  isHtml: any;
}

export default function EmailPreviewPopover({
  Loading,
  anchorEl,
  setAnchorEl,
  setHtml,
  isHtml,
}: Prop) {
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
    setHtml(null);
  };
  return (
    <Popover
      id='popover-agent'
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{ vertical: -6, horizontal: 0 }}
      onClose={handleClose}
    >
      <PreviewEmail
        slotContent={
          Loading ? (
            <Stack
              alignItems={'center'}
              height={'400px'}
              justifyContent={'center'}
            >
              <LoaderSvg />
            </Stack>
          ) : (
            <iframe
              width={'790px'}
              height={'490px'}
              color='white'
              srcDoc={isHtml}
              title='Previw Email'
            />
          )
        }
        onClickClose={{
          onClick: () => {
            setAnchorEl(null);
            setHtml(null);
          },
        }}
      />
    </Popover>
  );
}
