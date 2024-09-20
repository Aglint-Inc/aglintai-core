import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';

import { useRouterPro } from '@/hooks/useRouterPro';
import { useJob } from '@/job/hooks';
import ROUTES from '@/utils/routing/routes';
import { capitalizeSentence } from '@/utils/text/textUtils';

export const SharedBreadCrumbs = () => {
  const router = useRouterPro();
  const { job } = useJob();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href='#'
            onClick={() => router.push(ROUTES['/jobs']())}
          >
            Jobs
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>
            {capitalizeSentence(job?.job_title ?? 'Job')}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
      {/* <Preview /> */}
    </Breadcrumb>
  );
};

// const Preview = () => {
//   const { job } = useJob();
//   const handlePreview = () => {
//     window.open(
//       `${process.env.NEXT_PUBLIC_WEBSITE}/job-post/${job?.id}`,
//       '_blank',
//     );
//   };
//   if (job?.status === 'closed' || job?.posted_by !== 'Aglint') return <></>;
//   return (
//     <ButtonGhost
//       size={'2'}
//       iconColor={'var(--info-11)'}
//       iconSize={'4'}
//       isRightIcon={true}
//       isLeftIcon={false}
//       textButton={'Preview'}
//       iconName={'open_in_new'}
//       onClickButton={{
//         onClick: handlePreview,
//       }}
//     />
//   );
// };
