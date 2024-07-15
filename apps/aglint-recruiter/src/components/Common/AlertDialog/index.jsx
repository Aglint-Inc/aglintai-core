import { Alert, IconButton, Stack, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';

import { ButtonGhost } from '@/devlink/ButtonGhost';

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
                  borderColor: 'var(--neutral-6)',
                  color: 'nav.background',
                }}
              >
                {caution}
              </Alert>
            )}
            <Stack direction={'row'} justifyContent='flex-end' spacing={1}>
              {SecBtntext && (
                <>
                  <ButtonGhost
                    textButton={SecBtntext}
                    size={2}
                    onClickButton={{ onClick: SecAction || handleClose }}
                  />
                </>
              )}
              {PriBtntext && (
                <>
                  <ButtonGhost
                    textButton={PriBtntext}
                    size={2}
                    onClickButton={{ onClick: PriAction || handleClose }}
                  />
                </>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Dialog>
    </>
  );
}
