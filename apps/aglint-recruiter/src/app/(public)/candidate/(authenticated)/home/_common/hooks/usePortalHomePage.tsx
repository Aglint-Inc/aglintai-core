import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

export const usePortalHomePage = () => {
  const { queryParams } = useRouterPro();
  const application_id = queryParams.application_id as string;
  const recruiter_id = queryParams.recruiter_id as string;
  const isPreview = !!queryParams.isPreview as boolean;

  const query = api.candidatePortal.get_home_page.useQuery(undefined, {
    enabled: !isPreview,
  });

  const previewQuery = api.candidatePortal.get_home_page_preview.useQuery(
    {
      recruiter_id,
      application_id,
    },
    { enabled: isPreview },
  );

  return isPreview
    ? {
        ...previewQuery,
        data: previewQuery.data!,
      }
    : {
        ...query,
        data: query.data!,
      };
};
