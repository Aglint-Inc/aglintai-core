import { Stack } from '@mui/material';
import { memo } from 'react';

import { GlobalBannerInline } from '@/devlink2/GlobalBannerInline';
import { ButtonSoft } from '@/devlink3/ButtonSoft';
import { GlobalCta } from '@/devlink3/GlobalCta';
import NoApplicants from '@/public/lottie/NoApplicants';

export const ActionEmptyState = memo(
  ({
    title,
    description,
    action,
  }: {
    title: string;
    description: string;
    action?: {
      title: string;
      onClick: () => void;
    };
  }) => {
    return (
      <Stack width={'100%'} alignItems={'center'} justifyContent={'center'}>
        <GlobalBannerInline
          textContent='To see the interview plan for this candidate, move the candidate to the interview state.'
          slotButton={<></>}
          color={'purple'}
          iconName='lightbulb'
        />
        <GlobalCta
          color={'neutral'}
          textTitle={title}
          textDescription={description}
          slotCustomIcon={
            <Stack width={'100px'}>
              <NoApplicants />
            </Stack>
          }
          slotButton={
            action ? (
              <ButtonSoft
                size={2}
                textButton={action.title}
                onClickButton={{ onClick: () => action.onClick() }}
              />
            ) : (
              <></>
            )
          }
        />
      </Stack>
    );
  },
);
ActionEmptyState.displayName = 'ActionEmptyState';
