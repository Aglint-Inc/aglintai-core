import React from 'react';

import Seo from '../Common/Seo';

export default function SeoSetting({ tab }) {
  return (
    <>
      {tab === 'company-info' && (
        <Seo
          title='Company info - Company settings | Aglint AI'
          description='AI for People Products'
        />
      )}
      {tab === 'workingHours' && (
        <Seo
          title='Working hours - Company settings | Aglint AI'
          description='AI for People Products'
        />
      )}
      {tab === 'holidays' && (
        <Seo
          title='Holidays - Company settings | Aglint AI'
          description='AI for People Products'
        />
      )}
      {tab === 'team' && (
        <Seo
          title='Users - Company settings | Aglint AI'
          description='AI for People Products'
        />
      )}
      {tab === 'roles' && (
        <Seo
          title='Roles - Company settings | Aglint AI'
          description='AI for People Products'
        />
      )}
      {tab === 'emailTemplate' && (
        <Seo
          title='Email templates - Company settings | Aglint AI'
          description='AI for People Products'
        />
      )}
      {tab === 'scheduling' && (
        <Seo
          title='Scheduling - Company settings | Aglint AI'
          description='AI for People Products'
        />
      )}
      {tab === 'schedulingReasons' && (
        <Seo
          title='Reasons - Company settings | Aglint AI'
          description='AI for People Products'
        />
      )}
    </>
  );
}
