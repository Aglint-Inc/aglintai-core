import { Drawer } from '@mui/material';
import { useRouter } from 'next/router';

import { SideDrawerLarge } from '@/devlink3/SideDrawerLarge';

import RequestAvailability from '../..';

function RequestAvailabilityDrawer() {
  const router = useRouter();
  function getDrawerClose() {
    const currentPath = router.pathname; // Get current path
    const currentQuery = { ...router.query }; // Get current query parameters

    delete currentQuery.candidate_request_availability; // Remove the specific query parameter

    router.replace({
      pathname: currentPath,
      query: currentQuery,
    });
  }
  const candidateRequestAvailability = Boolean(
    router.query?.candidate_request_availability,
  );

  return (
    <>
      <Drawer
        onClose={getDrawerClose}
        anchor='right'
        open={candidateRequestAvailability}
      >
        <SideDrawerLarge
          // onClickPrimary={handleSubmit}
          slotSideDrawerbody={<RequestAvailability />}
        />
      </Drawer>
    </>
  );
}

export default RequestAvailabilityDrawer;
