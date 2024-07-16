import { Button, CircularProgress, Stack } from '@mui/material';
import { useEffect } from 'react';

import { useJobDashboardStore } from '@/src/context/JobDashboard/store';

const PublishButton = ({
  onClick,
  disabled = false,
}: {
  onClick: () => Promise<boolean>;
  disabled?: boolean;
}) => {
  const { publishing, setPublishing } = useJobDashboardStore(
    ({ publishing, setPublishing }) => ({ publishing, setPublishing }),
  );
  const rocketPosition =
    publishing === 0 ? '-11px' : publishing === 1 ? '-40px' : '-68px';
  const text =
    publishing === 0
      ? 'Publish'
      : publishing === 1
        ? 'Publishing'
        : 'Published';
  const handlClick = async () => {
    if (!disabled && publishing === 0) {
      setPublishing(1);
      const confirmation = await onClick();
      if (confirmation) setTimeout(() => setPublishing(2), 1000);
      else setPublishing(0);
    }
  };
  useEffect(() => {
    if (publishing === 2) setTimeout(() => setPublishing(0), 1500);
  }, [publishing]);
  return (
    <Stack sx={{ cursor: 'pointer' }}>
      <Button
        sx={{
          height: '32px',
          pointerEvents: disabled ? 'none' : 'auto',
          color:
            publishing === 0
              ? disabled
                ? 'var(--neutral-11)'
                : 'var(--white)'
              : publishing === 1
                ? 'var(--white)'
                : 'var(--white)',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '20px',
          justifyContent: 'flex-start',
          backgroundColor:
            publishing === 0
              ? disabled
                ? 'var(--neutral-3)'
                : 'var(--accent-9)'
              : publishing === 1
                ? 'var(--accent-11)'
                : 'var(--success-9)',
          fontWeight: 'inherit',
          padding: '8px 16px',
          width: '120px',
          transition: 'all 1s ease !important',
          overflow: 'hidden',
          borderRadius: 'var(--radius-2)',
          '&:hover': {
            backgroundColor:
              publishing === 2 ? 'var(--success-9)' : 'var(--accent-10)',
          },
        }}
        onClick={async () => await handlClick()}
      >
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: '20px',
            transform: 'translateX(-4px)',
          }}
        >
          <Stack
            sx={{
              position: 'relative',
              transform: `translateY(${rocketPosition})`,
              transition:
                publishing === 0 ? 'none' : 'all 1s cubic-bezier(1, 0, 0, 1)',
            }}
          >
            <Stack
              sx={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <RocketIcon />
              {
                <CircularProgress
                  color='inherit'
                  size={'var(--space-2)'}
                  sx={{
                    color: 'var(--white)',
                    opacity: publishing === 1 ? 1 : 0,
                    transition: '500ms',
                  }}
                />
              }
              <RocketIcon />
            </Stack>
          </Stack>
          <Stack
            sx={{
              transform: `translateX(${publishing === 0 ? '10px' : '0px'})`,
            }}
          >
            {text}
          </Stack>
        </Stack>
      </Button>
    </Stack>
  );
};

export default PublishButton;

const RocketIcon = () => {
  return (
    <svg
      width='21'
      height='23'
      viewBox='0 0 21 23'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M11.3149 15.5308C11.5359 14.9784 11.8176 14.2437 12.1601 13.3266C12.4805 12.4096 12.7181 11.5865 12.8727 10.8573C13.0495 9.88503 13.0274 9.03429 12.8064 8.30509C12.5855 7.57588 12.2595 6.95164 11.8286 6.43236C11.3867 5.92413 10.9448 5.51533 10.5028 5.20597C10.0609 5.51533 9.61894 5.92413 9.177 6.43236C8.7461 6.95164 8.42017 7.57588 8.1992 8.30509C7.97823 9.03429 7.95613 9.88503 8.13291 10.8573C8.27654 11.5976 8.51408 12.4207 8.84554 13.3266C9.16595 14.2437 9.43664 14.9784 9.65761 15.5308H11.3149ZM8.94498 15.8126C8.88973 15.6689 8.82897 15.4977 8.76268 15.2988L7.05568 17.0058C6.95624 17.1053 6.83471 17.1384 6.69107 17.1053C6.56954 17.0721 6.48668 16.9892 6.44248 16.8567L5.5807 14.3376C5.41497 13.752 5.54203 13.2383 5.96187 12.7963L7.45342 11.3048C7.43133 11.2164 7.40923 11.128 7.38713 11.0396C7.38713 11.0175 7.38713 11.0065 7.38713 11.0065C7.18826 9.8795 7.2214 8.89618 7.48657 8.05649C7.75173 7.21681 8.13291 6.50417 8.63009 5.9186C9.13833 5.34408 9.63551 4.89109 10.1216 4.55963C10.3758 4.416 10.6299 4.416 10.884 4.55963C11.3701 4.89109 11.8673 5.34408 12.3755 5.9186C12.8727 6.50417 13.2539 7.21681 13.5191 8.05649C13.7842 8.89618 13.8174 9.8795 13.6185 11.0065C13.5964 11.0948 13.5743 11.1943 13.5522 11.3048L15.0438 12.7963C15.4636 13.2383 15.5907 13.752 15.4249 14.3376L14.5632 16.8567C14.519 16.9892 14.4361 17.0721 14.3146 17.1053C14.1709 17.1384 14.0494 17.1053 13.95 17.0058L12.2264 15.2822C12.1491 15.4922 12.0772 15.6745 12.0109 15.8291C11.8784 16.1164 11.6463 16.2711 11.3149 16.2932L9.64104 16.2766C9.32063 16.2656 9.08861 16.1109 8.94498 15.8126ZM14.0494 16.0446L14.6957 14.1056C14.7841 13.8183 14.7234 13.5587 14.5134 13.3266L13.3368 12.15C13.0827 12.9565 12.812 13.7465 12.5247 14.5199L14.0494 16.0446ZM6.4922 13.3266C6.28228 13.5587 6.22151 13.8183 6.3099 14.1056L6.95624 16.0446L8.46437 14.5365C8.1771 13.7631 7.91194 12.9676 7.66887 12.15L6.4922 13.3266ZM10.9006 8.38795C10.6354 8.16698 10.3702 8.16698 10.1051 8.38795C9.8841 8.65312 9.8841 8.91828 10.1051 9.18345C10.3702 9.40442 10.6354 9.40442 10.9006 9.18345C11.1215 8.91828 11.1215 8.65312 10.9006 8.38795ZM9.57474 7.85762C9.93935 7.51512 10.3592 7.40463 10.8343 7.52616C11.3204 7.65875 11.6298 7.96811 11.7624 8.45424C11.8839 8.92933 11.7734 9.34917 11.4309 9.71378C11.0663 10.0563 10.6465 10.1668 10.1714 10.0452C9.68523 9.91265 9.37587 9.60329 9.24329 9.11715C9.12175 8.64207 9.23224 8.22222 9.57474 7.85762Z'
        fill='currentColor'
      />
    </svg>
  );
};
