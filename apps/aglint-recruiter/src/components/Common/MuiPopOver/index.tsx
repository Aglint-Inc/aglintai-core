import { Button, Popover } from '@mui/material';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import { type ReactNode } from 'react';

function MuiPopOver({ body, button }: { body: ReactNode; button: ReactNode }) {
  return (
    <PopupState variant='popover' popupId='demo-popup-popover'>
      {(popupState) => (
        <div>
          <Button variant='text' {...bindTrigger(popupState)}>
            {button}
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            sx={{
              '& .MuiPopover-paper': {
                border: 'none',
                padding: 'var(--space-2)',
              },
            }}
          >
            {body}
          </Popover>
        </div>
      )}
    </PopupState>
  );
}

export default MuiPopOver;
