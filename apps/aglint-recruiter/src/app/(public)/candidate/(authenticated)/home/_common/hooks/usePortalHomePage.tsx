import { useTenant } from '@/company/hooks';
import { useRouterPro } from '@/hooks/useRouterPro';
import { type getHomePage } from '@/routers/candidatePortal/get_home_page';
import { api } from '@/trpc/client';

import { dummyDataHomePage } from '../../../_common/dummydata';

export const usePortalHomePage = () => {
  const { recruiter } = useTenant();

  const { queryParams } = useRouterPro();
  const application_id = queryParams.application_id as string;
  const isPreview = !!queryParams.isPreview as boolean;

  const preference = recruiter.recruiter_preferences;
  const currentData = {
    banner_image: preference.banner_image || '',
    about: preference.about || '',
    company_images: preference.company_images || [],
    greetings: preference.greetings || '',
  };

  const initiData: getHomePage['output'] = {
    ...dummyDataHomePage,
    company: {
      ...dummyDataHomePage.company,
      ...currentData,
    },
  };

  const query = api.candidatePortal.get_home_page.useQuery(
    {
      application_id,
    },
    { enabled: !isPreview, initialData: initiData },
  );

  return {
    ...query,
    data: query.data!,
    // isPending: isPreview ? isPreDataLoading : query.isPending,
  };
};
