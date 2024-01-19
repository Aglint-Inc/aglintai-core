import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { MobileLinkJobs, SublinksJobs } from '@/devlink';
import { pageRoutes } from '@/src/utils/pageRouting';

export function JobSubLinks() {
  const router = useRouter();
  return <SublinksJobs isSearchJobs={router.pathname === pageRoutes.JOBS} />;
}

// Jobs mobile sub navbar================================

export function MobileJobNavBar({ collapse, setCollapse }) {
  return (
    <Stack position={'relative'}>
      <Stack borderRadius={'8px'} width={'100%'}>
        <Stack
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <MobileLinkJobs
            onClickJobs={{
              onClick: () => {
                if (collapse !== 0) {
                  setCollapse(0);
                } else {
                  setCollapse(false);
                }
              },
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}

export const allowedCountries = ['us', 'ca', 'gb', 'in', 'au', 'uk'];

// Interview prep mobile sub navbar===============================
