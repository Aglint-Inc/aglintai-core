import React from 'react';

import Seo from '../Common/Seo';

export default function SeoSetting({ tab }) {
  return (
    <>
      {' '}
      {tab === 'basic-info' && (
        <Seo
          title='Basic info - Company settings | Aglint AI'
          description='AI for People Products'
        />
      )}
      {tab === 'additional-info' && (
        <Seo
          title='Additional Info - Company settings | Aglint AI'
          description='AI for People Products'
        />
      )}
      {tab === 'team' && (
        <Seo
          title='Team - Company settings | Aglint AI'
          description='AI for People Products'
        />
      )}
      {tab === 'roles' && (
        <Seo
          title='Roles - Company settings | Aglint AI'
          description='AI for People Products'
        />
      )}
    </>
  );
}
