import { Dialog, Stack } from '@mui/material';
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
    <Dialog
      id='popover-agent'
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          width: 'auto',
          maxWidth: 'none',
        },
      }}
    >
      <PreviewEmail
        slotContent={
          Loading ? (
            <Stack
              alignItems={'center'}
              height={'800px'}
              justifyContent={'center'}
            >
              <LoaderSvg />
            </Stack>
          ) : (
            <Stack>
              <iframe
                width={'100%'}
                height={'800px'}
                color='white'
                srcDoc={isHtml}
                title='Previw Email'
              />
            </Stack>
          )
        }
        onClickClose={{
          onClick: () => {
            setAnchorEl(null);
            setHtml(null);
          },
        }}
      />
    </Dialog>
  );
}
