import React from 'react';

import { SeoPro } from '@/components/Common/SeoPro';

export default function SeoProSetting({ tab }) {
  return (
    <>
      {tab === 'company-info' && (
        <SeoPro
          title='Company info - Company settings | Aglint AI'
          description='AI for People Products'
        />
      )}
      {tab === 'workingHours' && (
        <SeoPro
          title='Working hours - Company settings | Aglint AI'
          description='AI for People Products'
        />
      )}
      {tab === 'holidays' && (
        <SeoPro
          title='Holidays - Company settings | Aglint AI'
          description='AI for People Products'
        />
      )}
      {tab === 'team' && (
        <SeoPro
          title='Users - Company settings | Aglint AI'
          description='AI for People Products'
        />
      )}
      {tab === 'roles' && (
        <SeoPro
          title='Roles - Company settings | Aglint AI'
          description='AI for People Products'
        />
      )}
      {tab === 'emailTemplate' && (
        <SeoPro
          title='Email templates - Company settings | Aglint AI'
          description='AI for People Products'
        />
      )}
      {tab === 'scheduling' && (
        <SeoPro
          title='Scheduling - Company settings | Aglint AI'
          description='AI for People Products'
        />
      )}
      {tab === 'schedulingReasons' && (
        <SeoPro
          title='Reasons - Company settings | Aglint AI'
          description='AI for People Products'
        />
      )}
    </>
  );
}
