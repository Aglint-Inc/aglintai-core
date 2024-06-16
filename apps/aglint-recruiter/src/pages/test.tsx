import { Stack } from '@mui/material';
import React from 'react';

import TipTapAIEditor from '../components/Common/TipTapAIEditor';

const TEST = () => {
  return (
    <Stack mt={'200px'}>
      <TipTapAIEditor
        handleChange={(s) => {
          console.log(s);
        }}
        initialValue='<p>Hi everyone! Don’t forget the daily stand up at 8 AM.</p>
        <p><span data-type="temp-variable" data-id="Jennifer Grey"></span> Would you mind to share what you’ve been working on lately? We fear not much happened since Dirty Dancing.
        <p><span data-type="temp-variable" data-id="Winona Ryder"></span> <span data-type="temp-variable" data-id="Axl Rose"></span> Let’s go through your most important points quickly.</p>
        <p>I have a meeting with <span data-type="temp-variable" data-id="Christina Applegate"></span> and don’t want to come late.</p>
        <p>– Thanks, your big boss</p>'
        placeholder=''
        editor_type='email'
        template_type='debrief_email_interviewer'
      />
    </Stack>
  );
};

export default TEST;
