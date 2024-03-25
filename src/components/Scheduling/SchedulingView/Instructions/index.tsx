import React from 'react';

import TipTapEditor from '@/src/components/Common/richTextEditor/RichTextBlock';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

function Instructions() {
  const { recruiter, recruiterUser } = useAuthDetails();
  return (
    <div>
      {recruiter.email === recruiterUser.email ? (
        <TipTapEditor minRows={45} />
      ) : (
        'View Descriptions'
      )}
    </div>
  );
}

export default Instructions;
