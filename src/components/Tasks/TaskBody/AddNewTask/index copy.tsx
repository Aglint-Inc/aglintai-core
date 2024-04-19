import { Card, Stack, Typography } from '@mui/material';
import { IconSparkles } from '@tabler/icons-react';
import { Editor } from '@tiptap/react';
import axios from 'axios';
import { useState } from 'react';

import { ShowCode } from '@/src/components/Common/ShowCode';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import {
  TasksAgentContextType,
  useTasksContext,
} from '@/src/context/TasksContextProvider/TasksContextProvider';

import TextArea from '../../Components/TextArea';
import { useTaskStatesContext } from '../../TaskStatesContext';
import { EmailAgentId, PhoneAgentId } from '../../utils';

function AddNewTask() {
  const { recruiterUser, recruiter } = useAuthDetails();
  const { handelAddTask } = useTasksContext();
  const { selectedMemberId, assignerList, setShowAddNew } =
    useTaskStatesContext();
  let getEditorRef: () => Editor = null;
  const [editor, setEditor] = useState<Editor | null>(null);
  const [textInput, setTextInput] = useState({
    html: null,
    text: null,
    wordCount: null,
  });

  async function handleChange() {
    setShowAddNew(false);
    const { data } = await axios.post('/api/ai/queryToJson', {
      prompts: [
        {
          role: 'system',
          content: `
        ${textInput.html}
        set this data to json object
        {
            "name":"extract task name",
            "type":'enum("schedule","training"|null)'
            "assignee":"
            if('call')
            return ${PhoneAgentId}
            else if('email') 
            return ${EmailAgentId}
            else ${recruiterUser.user_id}
            ",
        } 

        Reference details:
         today date is ${new Date()}
        `,
        },
      ],
    });

    const taskData = JSON.parse(data) as TasksAgentContextType['tasks'][number];
    const assignee = (
      selectedMemberId ? [selectedMemberId] : [taskData.assignee]
    ) as any[];
    handelAddTask({
      ...taskData,
      assignee,
      created_by: recruiterUser.user_id,
      recruiter_id: recruiter.id,
    });
  }

  return (
    <Stack position={'relative'} width={'100%'}>
      <TextArea
        onChange={(event) => {
          const div = document.createElement('div');
          div.innerHTML = event.html;
          div
            .querySelectorAll('span')
            .forEach(
              (node) =>
                (node.textContent =
                  '```' + node.getAttribute('data-id') + '```'),
            );
          // setBackEndText(div.textContent);
          setTextInput(event);
        }}
        getEditorRef={(func) => (getEditorRef = func)}
        onClick={handleChange}
        value={textInput.html}
        dataList={assignerList}
        setEditor={setEditor}
      />

      <ShowCode.When isTrue={editor && editor.isFocused && !textInput.text}>
        {/* <ShowCode.When isTrue={false}> */}
        <Card
          sx={{
            position: 'absolute',
            top: '50px',
            zIndex: 1000,
          }}
        >
          <Stack p={2} direction={'column'} spacing={2}>
            {prompts.map((item, index) => {
              return (
                <Typography
                  key={index}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'grey.100',
                    },
                  }}
                  p={0.5}
                  onClick={() => {
                    getEditorRef().commands.setContent(item);
                    // getEditorRef().commands.focus();
                    setTextInput({
                      html: `<p>${item}</p>`,
                      text: item,
                      wordCount: item.length,
                    });

                    getEditorRef().commands.focus(item.length + 1);
                    const firstBacktickPos = item.indexOf('{');

                    const secondBacktickPos = item.indexOf(
                      '}',
                      firstBacktickPos + 1,
                    );
                    if (firstBacktickPos > 0 && secondBacktickPos > 0) {
                      getEditorRef().commands.setTextSelection({
                        from: firstBacktickPos + 1,
                        to: secondBacktickPos + 2,
                      });
                    }
                  }}
                >
                  <IconSparkles size={16} />
                  {` ${item}`}
                </Typography>
              );
            })}
          </Stack>
        </Card>
      </ShowCode.When>
    </Stack>
  );
}

export default AddNewTask;

const prompts = [
  `Send an email Email to schedule a meeting `,
  `Do a phone call to schedule a meeting `,
  `Training shadow complete move to qualified tasks.`,
  `Reverse shadow complete move to qualified tasks.`,
];
