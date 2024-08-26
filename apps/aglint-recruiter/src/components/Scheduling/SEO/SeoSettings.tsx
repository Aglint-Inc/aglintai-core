import React from 'react';

import Seo from '../../Common/Seo';

export default function SeoSettings({ tab }) {
  return (
    <>
      {tab === 'metrics' && (
        <Seo
          title='Metrics - Scheduler | Aglint AI'
          description='AI for People Products'
        />
      )}
      {tab === 'candidates' && (
        <Seo
          title='Candidates - Scheduler | Aglint AI'
          description='AI for People Products'
        />
      )}
      {tab === 'interviews' && (
        <Seo
          title='Interviews - Scheduler | Aglint AI'
          description='AI for People Products'
        />
      )}
      {tab === 'my_interviews' && (
        <Seo
          title='My Interviews - Scheduler | Aglint AI'
          description='AI for People Products'
        />
      )}
      {tab === 'interviewtypes' && (
        <Seo
          title='Interview types - Scheduler | Aglint AI'
          description='AI for People Products'
        />
      )}
      {tab === 'interviewers' && (
        <Seo
          title='Interviewers - Scheduler | Aglint AI'
          description='AI for People Products'
        />
      )}
      {tab === 'settings' && (
        <Seo
          title='Settings - Scheduler | Aglint AI'
          description='AI for People Products'
        />
      )}
    </>
  );
}
