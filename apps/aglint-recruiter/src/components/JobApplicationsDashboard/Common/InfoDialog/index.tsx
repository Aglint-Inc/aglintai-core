import { Stack, Typography } from '@mui/material';
import React from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { Checkbox } from '@/devlink/Checkbox';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import AUIButton from '@/src/components/Common/AUIButton';
import MuiPopup from '@/src/components/Common/MuiPopup';

function InfoDialog({
  openInfoDialog,
  onClose,
  warningMessage,
  heading,
  subHeading,
  primaryText,
  primaryAction,
  secondaryText,
  variant,
  checkEmail,
  setCheckEmail,
}) {
  return (
    <Stack>
      <MuiPopup
        props={{
          open: openInfoDialog,
          onClose: onClose,
        }}
      >
        <Stack spacing={'18px'} p={'28px'} bgcolor={'var(--white-a7'}>
          <Typography variant='body1'>{heading}</Typography>
          {subHeading && (
            <Stack
              direction={'row'}
              alignItems={'center'}
              spacing={'var(--space-2)'}
            >
              <Checkbox
                isChecked={checkEmail}
                onClickCheck={{
                  onClick: () => {
                    setCheckEmail((pre) => !pre);
                  },
                }}
              />
              <Typography>{subHeading}</Typography>
            </Stack>
          )}
          {warningMessage && (
            <Stack
              bgcolor={'var(--warning-3)'}
              direction={'row'}
              alignItems={'center'}
              py={'var(--space-5)'}
              px={'var(--space-4)'}
              spacing={'var(--space-5)'}
              borderRadius={'var(--radius-4)'}
            >
              <GlobalIcon iconName='warning' />
              {/* <svg
                xmlns='http://www.w3.org/2000/svg'
                width='30'
                height='30'
                viewBox='0 0 30 30'
                fill='none'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M14.0791 3.94486C14.0791 3.94486 25.6595 26.2698 25.6633 26.2698C25.6633 26.2698 2.48538 26.2678 2.48543 26.2677C2.48543 26.2677 14.0746 3.93641 14.0791 3.94486ZM12.4107 3.06794L0.818941 25.4074C0.179816 26.6481 1.07942 28.143 2.47735 28.143H25.6711C27.069 28.143 27.9686 26.6481 27.3295 25.4074L15.7407 3.07373C15.0297 1.72639 13.1188 1.72639 12.4107 3.06794ZM15.0015 17.8242V11.2617C15.0015 10.0117 13.1265 10.0117 13.1265 11.2617V17.8242C13.1265 19.0742 15.0015 19.0742 15.0015 17.8242ZM14.0635 24.3828C15.099 24.3828 15.9385 23.5433 15.9385 22.5078C15.9385 21.4723 15.099 20.6328 14.0635 20.6328C13.0279 20.6328 12.1885 21.4723 12.1885 22.5078C12.1885 23.5433 13.0279 24.3828 14.0635 24.3828Z'
                  fill='#703815'
                />
              </svg> */}
              <Typography variant='body1'>{warningMessage}</Typography>
            </Stack>
          )}
          <Stack direction={'row'} justifyContent={'end'}>
            <Stack
              spacing={'var(--space-2)'}
              mt={'var(--space-2)'}
              direction={'row'}
              alignItems={'center'}
            >
              <ButtonGhost
                color={'neutral'}
                textButton={secondaryText}
                size={2}
                onClickButton={{
                  onClick: onClose,
                }}
              />
              <AUIButton
                onClick={() => {
                  primaryAction(checkEmail);
                  onClose();
                }}
                variant={variant}
              >
                {primaryText}
              </AUIButton>
            </Stack>
          </Stack>
        </Stack>
      </MuiPopup>
    </Stack>
  );
}

export default InfoDialog;
