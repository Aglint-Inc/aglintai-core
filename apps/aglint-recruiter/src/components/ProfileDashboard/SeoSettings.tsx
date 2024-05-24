import React from 'react';

import Seo from '../Common/Seo';

export default function SeoSettings({ tab }) {
  return (
    <>
      {tab === undefined && (
        <Seo
          title={'User Detail - Profile | Aglint AI'}
          description='AI for People Products'
        />
      )}
      {tab === 'user_detail' && (
        <Seo
          title={'User Detail - Profile | Aglint AI'}
          description='AI for People Products'
        />
      )}
      {tab === 'change_email' && (
        <Seo
          title={'Change Email - Profile | Aglint AI'}
          description='AI for People Products'
        />
      )}
      {tab === 'password_update' && (
        <Seo
          title={'Password Update - Profile | Aglint AI'}
          description='AI for People Products'
        />
      )}
    </>
  );
}
