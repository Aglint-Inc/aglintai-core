import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { SublinkTab } from '@/devlink2/SublinkTab';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import { emailTemplateQueries } from '@/src/queries/email-templates';
import ROUTES from '@/src/utils/routing/routes';

import { emailTempKeys } from '../Templates/utils';
import { settingsItems, settingSubNavItem } from './utils';

function SettingsSubNabItem() {
  const router = useRouter();
  const { recruiter } = useAuthDetails();
  const emailTemplates = useQuery(
    emailTemplateQueries.emailTemplates(recruiter.id),
  );
  const [firstTemplate, setFirstTemplate] = useState(null);
  const { ifAllowed } = useRolesAndPermissions();

  useEffect(() => {
    if (emailTemplates.isFetched) {
      if (router.query.email) {
        setFirstTemplate(router.query.email);
      } else {
        setFirstTemplate(
          [...emailTemplates.data]
            ?.filter((emailPath) => emailTempKeys.includes(emailPath.type))
            .filter((v, i, a) => a.findIndex((v2) => v2.type === v.type) === i)
            .sort((a, b) => a.type.localeCompare(b.type))[0].type,
        );
      }
    }
  }, [router]);
  return (
    <>
      {settingsItems.map((item, i) => {
        return item?.permission ? (
          ifAllowed(
            <SublinkTab
              text={item.label}
              isActtive={router.query.tab === item.value}
              onClickTab={{
                onClick: (e: any) => {
                  e.stopPropagation();
                  if (item.value === settingSubNavItem['EMAILTEMPLATE']) {
                    router.push(
                      `${ROUTES['/company']()}?tab=${item.value}&email=${firstTemplate}`,
                    );
                  } else {
                    router.push(`${ROUTES['/company']()}?tab=${item.value}`);
                  }
                },
              }}
            />,
            [item?.permission],
          )
        ) : (
          <SublinkTab
            key={i}
            text={item.label}
            isActtive={router.query.tab === item.value}
            onClickTab={{
              onClick: (e: any) => {
                e.stopPropagation();
                if (item.value === settingSubNavItem['EMAILTEMPLATE']) {
                  router.push(
                    `${ROUTES['/company']()}?tab=${item.value}&email=${firstTemplate}`,
                  );
                } else {
                  router.push(`${ROUTES['/company']()}?tab=${item.value}`);
                }
              },
            }}
          />
        );
      })}
    </>
  );
}

export default SettingsSubNabItem;
