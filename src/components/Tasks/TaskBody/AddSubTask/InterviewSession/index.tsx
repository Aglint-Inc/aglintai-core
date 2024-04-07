import { Button, Chip, Grid, Stack } from '@mui/material';
import React from 'react';

function InterviewSession({ textInput, setTextInput, getEditorRef }) {
  return (
    <Stack py={'10px'}>
      <Grid container spacing={1}>
        {sessionList.map(({ name, id }) => {
          return (
            <Grid key={id} item>
              <Button
                onClick={() => {
                  const text = textInput.text + ' ' + `${name} `;
                  const html =
                    textInput.html.replace('</p>', '') +
                    `<span class='module_session_name'>&nbsp;${name}&nbsp;</span></p>`;
                  const wordCount = textInput.wordCount + name.length;
                  setTextInput({
                    html,
                    text,
                    wordCount,
                  });
                  getEditorRef().commands.setContent(html);
                  getEditorRef().commands.focus(text.length + 2);
                }}
              >
                <Chip label={name} />
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}

export default InterviewSession;

const sessionList = [
  { name: 'Hr interview', id: crypto.randomUUID() },
  { name: 'Software Interview', id: crypto.randomUUID() },
];
