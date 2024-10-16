import { api } from '@/trpc/client';

// home page ----------------------------------------------------
export const usePortalHomePage = ({
  application_id,
}: {
  application_id: string;
}) => {
  const query = api.candidatePortal.get_home_page.useQuery({
    application_id,
  });

  return { ...query, data: query.data! };
};
