import { Button, Chip, Grid, Stack, Typography } from '@mui/material';
// import { EditorState } from '@tiptap/core/dist/packages/core/src/Editor';
import { Editor } from '@tiptap/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { ShowCode } from '@/src/components/Common/ShowCode';
import {
  fetchInterviewSessionTask,
  scheduleWithAgent,
} from '@/src/components/Scheduling/AllSchedules/SchedulingApplication/hooks';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useTasksAgentContext } from '@/src/context/TaskContext/TaskContextProvider';
import { ScrollList } from '@/src/utils/framer-motions/Animation';

import { useTaskStatesContext } from '../../TaskStatesContext';
import { EmailAgentId, PhoneAgentId } from '../../utils';
import DateField from '../UpdateSubTask/DateField';
import TextArea from './TextArea';
export const agentsDetails = [
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
  let getEditorRef: () => Editor = null;
  const { recruiter, recruiterUser } = useAuthDetails();
  const {
    selectedMemberId,
    setSelectedMemberId,
    setAddingSubTask,
    assignerList,
  } = useTaskStatesContext();
  const { handelAddSubTask, tasks } = useTasksAgentContext();
  const [textInput, setTextInput] = useState({
    html: null,
    text: null,
    wordCount: null,
  });
  const [sessionList, setSessionList] = useState([]);
  const [selectedSession, setSelectedSession] = useState([]);

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

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
            "start_date":"extract the date and time ( MM-DD-YYYY HH:mm:ss ) if mentioned only else pass null",
            "completion_date":"extract the date and time ( MM-DD-YYYY HH:mm:ss ) if mentioned only else pass null",
            "status":"enum("completed" | "closed" | "pending" | "failed" |"in_progress")",
            // "agent":"enum("call"|"email"|null)"
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
    // const agent = taskData.agent ? taskData.agent : null;
    const start_date = taskData.start_date
      ? new Date(taskData.start_date)
      : selectedStartDate;
    const completion_date = taskData.completion_date
      ? new Date(taskData.completion_date)
      : selectedEndDate;
    handelAddSubTask({
      taskId: taskId,
      data: {
        ...taskData,
        assignee,
        agent: null,
        start_date,
        completion_date,
        task_id: taskId,
        session_ids: selectedSession,
      },
    }).then((data) => {
      // chinmai code for cron job
      const selectedTask = tasks.find((item) => item.id === taskId);

      if (assignee[0] === EmailAgentId || assignee[0] === PhoneAgentId) {
        scheduleWithAgent({
          application_id: selectedTask.application_id,
          dateRange: {
            start_date: start_date,
            end_date: completion_date,
          },
          recruiter_id: recruiter.id,
          recruiter_user_name:
            recruiterUser.first_name + ' ' + recruiterUser.last_name,
          session_ids: selectedSession,
          sub_task_id: data.id,
          type:
            assignee[0] === EmailAgentId
              ? 'email_agent'
              : assignee[0] === PhoneAgentId
                ? 'phone_agent'
                : null,
        });
      }
      //end
    });

    setSelectedMemberId(null);
    setAddingSubTask(false);
    setSelectedSession([]);
  }

  async function getSessionList() {
    const selectedTask = tasks.find((item) => item.id === taskId);
    const data = await fetchInterviewSessionTask({
      application_id: selectedTask.application_id,
      job_id: selectedTask.applications.public_jobs.id,
    });
    setSessionList(data);
    return data;
  }
  useEffect(() => {
    getSessionList();
  }, []);

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
        dataList={assignerList}
      />

      <ShowCode.When
        isTrue={
          textInput.text &&
          String(textInput.text).toLowerCase().includes('sche')
        }
      >
        <ScrollList
          uniqueKey={
            textInput.text &&
            String(textInput.text).toLowerCase().includes('sche')
          }
        >
          <Stack direction={'column'} spacing={'5px'} py={'10px'}>
            <Typography variant='body2'>Select a session*</Typography>
            <Grid container>
              {sessionList.map((item, i) => {
                return (
                  <Grid key={i} item>
                    <Button
                      onClick={() => {
                        setSelectedSession((pre) => {
                          if (pre.includes(item.id)) {
                            // set in tiptap editor
                            const text = String(textInput.text).replaceAll(
                              item.name,
                              '',
                            );
                            const html = String(textInput.html).replaceAll(
                              `<span class='module_session_name'>&nbsp;${item.name}&nbsp;</span>`,
                              '',
                            );
                            const wordCount =
                              textInput.wordCount + item.name.length;
                            setTextInput({
                              html,
                              text,
                              wordCount,
                            });
                            getEditorRef().commands.setContent(html);
                            return pre.filter((ele) => ele !== item.id);
                          }
                          // set in tiptap editor
                          const text = textInput.text + ' ' + `${item.name} `;
                          const html =
                            textInput.html.replace('</p>', '') +
                            `<span class='module_session_name'>&nbsp;${item.name}&nbsp;</span></p>`;
                          const wordCount =
                            textInput.wordCount + item.name.length;
                          setTextInput({
                            html,
                            text,
                            wordCount,
                          });
                          getEditorRef().commands.setContent(html);
                          getEditorRef().commands.focus(text.length + 2);

                          return [item.id, ...pre];
                        });
                      }}
                    >
                      <Chip
                        sx={{
                          bgcolor: selectedSession.includes(item.id)
                            ? 'blue.300'
                            : 'grey.200',
                        }}
                        label={item.name}
                      />
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
            {/* <Autocomplete
              // fullWidth
              multiple
              clearIcon
              id='combo-box-demo'
              options={sessionList || []}
              getOptionLabel={(option) => option.name}
              onChange={(e, value) => {
                setSelectedSession(value.map((item) => item.id));
              }}
              renderInput={(params) => (
                <TextField
                  placeholder='Select Candidate'
                  variant='outlined'
                  {...params}
                />
              )}
            /> */}
            <Typography variant='body2'>Select date range*</Typography>
            <Stack direction={'row'} spacing={1}>
              <DateField
                getDate={(e) => {
                  setSelectedStartDate(new Date(e));
                }}
              />
              <DateField
                getDate={(e) => {
                  setSelectedEndDate(new Date(e));
                }}
              />
            </Stack>
          </Stack>
        </ScrollList>
      </ShowCode.When>
    </Stack>
  );
}

export default AddSubTask;
