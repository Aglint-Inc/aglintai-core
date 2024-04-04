import { Button, Chip, Grid, Skeleton, Stack } from '@mui/material';
// import { EditorState } from '@tiptap/core/dist/packages/core/src/Editor';
import { Editor } from '@tiptap/react';
import axios from 'axios';
import { useState } from 'react';

import { ShowCode } from '@/src/components/Common/ShowCode';
import { useInterviewerList } from '@/src/components/CompanyDetailComp/Interviewers';
import { useTasksAgentContext } from '@/src/context/TaskContext/TaskContextProvider';
import { ScrollList } from '@/src/utils/framer-motions/Animation';

import { useTaskStatesContext } from '../../TaskStatesContext';
import { EmailAgentId, PhoneAgentId } from '../../utils';
import { assigneeType } from '../UpdateSubTask';
import TextArea from './TaxtArea';
const agentsDetails = [
  {
    user_id: EmailAgentId,
    first_name: 'email',
    last_name: 'agent',
    assignee: 'Agents',
    profile_image: '',
  },
  {
    user_id: PhoneAgentId,
    first_name: 'phone',
    last_name: 'agent',
    assignee: 'Agents',
    profile_image: '',
  },
];
function AddSubTask({ taskId }: { taskId: string }) {
  const { data: interviewers } = useInterviewerList();
  const members = interviewers.map((item) => item.rec_user);
  let getEditorRef: () => Editor = null;
  const assigner = [
    ...agentsDetails,
    ...members.map((item) => {
      return { ...item, assignee: 'Interviewers' };
    }),
  ];
  const { selectedMemberId, setSelectedMemberId, setAddingSubTask } =
    useTaskStatesContext();
  const { handelAddSubTask } = useTasksAgentContext();
  const [textInput, setTextInput] = useState({
    html: null,
    text: null,
    wordCount: null,
  });
  async function handleChange() {
    setAddingSubTask(true);
    const { data } = await axios.post('/api/ai/queryToJson', {
      prompts: [
        {
          role: 'system',
          content: `
        ${textInput.html}
        set this data to json object
        {
            "name":"get the task name",
            "completion_date":"extract the date and time( MM-DD-YYYY HH:mm:ss )",
            "status":"enum("completed" | "closed" | "pending" | "failed" |"in_progress")",
            "agent":"enum("call"|"email")"
            "assignee":"
            if(agent==='call')
            return ${PhoneAgentId}
            else if(agent==='email') 
            return ${EmailAgentId}
            else null
            ",
        } 

        Reference details:
         today date is ${new Date()}
        `,
        },
      ],
    });

    const taskData = JSON.parse(data);
    const assignee = selectedMemberId
      ? [selectedMemberId]
      : [taskData.assignee];
    const agent = selectedMemberId ? null : taskData.agent;
    const completion_date = new Date(taskData.completion_date);
    handelAddSubTask({
      taskId: taskId,
      data: {
        ...taskData,
        completion_date,
        assignee,
        agent,
        task_id: taskId,
      },
    });
    setSelectedMemberId(null);
    setAddingSubTask(false);
  }
  return (
    <Stack width={'100%'}>
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
        dataList={assigner as assigneeType[]}
      />

      <ShowCode.When
        isTrue={
          textInput.text &&
          (String(textInput.text).toLowerCase().includes('sche') ||
            String(textInput.text).toLowerCase().includes('schedule'))
        }
      >
        <ScrollList
          uniqueKey={
            textInput.text &&
            (String(textInput.text).toLowerCase().includes('sche') ||
              String(textInput.text).toLowerCase().includes('schedule'))
          }
        >
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
        </ScrollList>
      </ShowCode.When>
    </Stack>
  );
}

export default AddSubTask;
const sessionList = [
  { name: 'Hr interview', id: crypto.randomUUID() },
  { name: 'Software Interview', id: crypto.randomUUID() },
];
export function SubTaskCardSkeleton() {
  return (
    <Grid
      direction={'row'}
      alignItems={'center'}
      pl={3}
      width={'80%'}
      container
      spacing={1}
    >
      <Grid item xs>
        <Stack width={'100%'} direction={'row'} alignItems={'center'} gap={2}>
          <Skeleton width={'25px'} height={'30px'} />
          <Skeleton
            component={'h2'}
            sx={{ borderRadius: '20px', width: '100%' }}
          />
        </Stack>
      </Grid>
      <Grid item xs>
        <Skeleton component={'h2'} sx={{ borderRadius: '10px' }} />
      </Grid>
      <Grid item xs>
        <Skeleton component={'h2'} sx={{ borderRadius: '10px' }} />
      </Grid>
      <Grid item xs>
        <Skeleton component={'h2'} sx={{ borderRadius: '10px' }} />
      </Grid>
    </Grid>
  );
}
