import { Alert, IconButton, Stack, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';

import AUIButton from '../AUIButton';

export default function AlertDialog({
  title,
  Subtitle,
  caution,
  SecBtntext,
  PriBtntext,
  SecAction,
  PriAction,
  open,
  setOpen = null,
  width,
}) {
  const handleClose = () => {
    setOpen !== null && setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiDialog-paper': {
            margin: '16px',
          },
        }}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <Stack
          width={'100%'}
          maxWidth={width}
          minWidth={{ xs: 'unset', md: '500px' }}
        >
          <Stack
            p={{ xs: '12px', sm: '20px' }}
            borderBottom='1px solid #d8dcde'
            direction={'row'}
            justifyContent='space-between'
            alignItems={'center'}
          >
            <Stack>
              {title && (
                <Typography
                  variant='h4'
                  color={'var(--error-11)'}
                  sx={{ textTransform: 'capitalize' }}
                >
                  {title}
                </Typography>
              )}
            </Stack>
            <IconButton id='close' onClick={SecAction || handleClose}>
              Close
            </IconButton>
          </Stack>
          <Stack p={{ xs: '12px', sm: '20px' }} spacing={2}>
            {Subtitle && <Typography variant='body1'>{Subtitle}</Typography>}
            {caution && (
              <Alert
                severity='warning'
                sx={{
                  bgcolor: 'card.main.hover.background',
                  borderColor: 'card.main.hover.border',
                  color: 'nav.background',
                }}
              >
                {caution}
              </Alert>
            )}
            <Stack direction={'row'} justifyContent='flex-end' spacing={1}>
              {SecBtntext && (
                <>
                  {/* <CustomButton
                    variant='cancel'
                    onClick={SecAction || handleClose}
                    text={SecBtntext}
                  /> */}
                  <AUIButton
                    id={SecBtntext}
                    variant='text'
                    size='medium'
                    onClick={SecAction || handleClose}
                  >
                    {SecBtntext}
                  </AUIButton>
                </>
              )}
              {PriBtntext && (
                <>
                  {/* <CustomButton
                    variant='delete'
                    onClick={PriAction || handleClose}
                    text={PriBtntext}
                  /> */}
                  <AUIButton
                    id={PriBtntext}
                    variant='error'
                    size='medium'
                    onClick={PriAction || handleClose}
                  >
                    {PriBtntext}
                  </AUIButton>
                </>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Dialog>
    </>
  );
}
