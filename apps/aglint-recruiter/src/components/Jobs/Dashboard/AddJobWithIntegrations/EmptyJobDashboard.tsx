import { useRouter } from 'next/router';

import { JobDashboardEmpty } from '@/devlink/JobDashboardEmpty';
import { useAllIntegrations } from '@/src/queries/intergrations';
import ROUTES from '@/src/utils/routing/routes';

export default function EmptyJobDashboard({
  heading,
  handleClickAddJob,
  showMsg = true,
}) {
  const router = useRouter();
  const { data: allIntegrations } = useAllIntegrations();

  return (
    <>
      <JobDashboardEmpty
        isAshbyConnected={allIntegrations?.ashby_key ? true : false}
        isAtsOptionVisible={true}
        isConnectedVisible={allIntegrations?.lever_key ? true : false}
        isGreenhouseConnected={allIntegrations?.greenhouse_key ? true : false}
        textHeader={heading}
        isOldTitleVisible={showMsg}
        onClickAddJob={{
          onClick: handleClickAddJob,
        }}
        isSelectTitleVisible={true}
        onClickRequestIntegration={{
          onClick: () => {},
        }}
        onClickGreenHouse={{
          onClick: () => {
            router.push(ROUTES['/integrations']());
          },
        }}
        onClickAshby={{
          onClick: () => {
            router.push(ROUTES['/integrations']());
          },
        }}
        onClickLever={{
          onClick: () => {
            router.push(ROUTES['/integrations']());
          },
        }}
      />
    </>
  );
}
