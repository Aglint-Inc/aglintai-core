import { JobDashboardEmpty } from '@/devlink';

export default function EmptyJobDashboard({
  heading,
  handleClickAddJob,
  showMsg = true,
}) {
  return (
    <>
      <JobDashboardEmpty
        textHeader={heading}
        isOldTitleVisible={showMsg}
        onClickAddJob={{
          onClick: handleClickAddJob,
        }}
        isSelectTitleVisible={true}
        onClickRequestIntegration={{
          onClick: () => {
            window.open(
              `mailto:customersuccess@aglinthq.com?subject=${encodeURIComponent(
                'Aglint : Request ATS Integration',
              )}&body=${encodeURIComponent(
                ` 
Hello,

I would like to request an integration.

Thank you,
[Your Name]
`,
              )}`,
            );
          },
        }}
        onClickGreenHouse={{
          onClick: () => {
            window.open(
              `mailto:customersuccess@aglinthq.com?subject=${encodeURIComponent(
                `Aglint: Request Integration with Greenhouse`,
              )}&body=${encodeURIComponent(
                `
Hello,

Requesting integration of Greenhouse into Aglint

Thank you,
[Your Name]
                  `,
              )}`,
            );
          },
        }}
        onClickIndeed={{
          onClick: () => {
            window.open(
              `mailto:customersuccess@aglinthq.com?subject=${encodeURIComponent(
                `Aglint: Aglint: Request Integration with Indeed`,
              )}&body=${encodeURIComponent(
                `
Hello,

Requesting integration of Indeed into Aglint

Thank you,
[Your Name]
                  `,
              )}`,
            );
          },
        }}
        onClickLever={{
          onClick: () => {
            window.open(
              `mailto:customersuccess@aglinthq.com?subject=${encodeURIComponent(
                `Aglint: Request Integration with Lever`,
              )}&body=${encodeURIComponent(
                `
Hello,

Requesting integration of Lever into Aglint

Thank you,
[Your Name]
                  `,
              )}`,
            );
          },
        }}
      />
    </>
  );
}
