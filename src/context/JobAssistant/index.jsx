import axios from 'axios';
import { useRouter } from 'next/router';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';
let intervalId;
// let setTime;

const JobAssistantContext = createContext();
const useJobAssistantContext = () => useContext(JobAssistantContext);
const firstMessage = 'Yes, please';
function JobAssistantProvider({ children }) {
  // const {recruiter}
  const [companyDetails, setCompanyDetails] = useState({});
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [closeChat, setCloseChat] = useState(false);
  const router = useRouter();
  const inputRef = useRef(null);

  useEffect(() => {
    if (router.query?.company_id) {
      getCompanyDetails();
    }
  }, [router.isReady]);

  /////////////////////////////////////////////////////////////
  // const handleUpload = async () => {

  // };

  ////////////////////////////////////////////////////////////
  async function createNewMessage() {
    // used variables
    let attachedFile = selectedFile;
    let fileDetails = null;
    const textMessage = inputRef.current
      ? inputRef?.current?.value
      : firstMessage;
    if (textMessage) {
      // set first message
      if (textMessage != firstMessage) {
        setMessages((pre) => [
          { role: 'assistant', value: 'loading', metadata: {} },
          {
            role: 'user',
            value: textMessage,
            metadata: { file_name: attachedFile?.name },
          },
          ...pre,
        ]);
      } else {
        setMessages((pre) => [
          { role: 'assistant', value: 'loading', metadata: {} },
          ...pre,
        ]);
      }
      //end
      // clear current data
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      setSelectedFile(null);
      // end

      if (attachedFile) {
        const formData = new FormData();
        formData.append('file', attachedFile);
        formData.append('purpose', 'assistants');
        try {
          const { data } = await axios.post(
            'https://api.openai.com/v1/files',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer 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`,
              },
            },
          );

          // console.log('File uploaded successfully:', data);
          fileDetails = data;
        } catch (error) {
          toast.error('Error uploading file:', error.message);
        }
      }

      if (textMessage) {
        const { data } = await axios.post('/api/assistant/createMessage', {
          message: textMessage,
          thread_id: localStorage.getItem('thread_id'),
          file_details: fileDetails,
        });

        if (data) {
          createRun();
        }
      }
    } else {
      toast.warning('Please enter your message!');
    }
  }

  async function createRun() {
    const { data } = await axios.post('/api/assistant/createRun', {
      thread_id: localStorage.getItem('thread_id'),
      assistant_id: companyDetails?.assistant_id,
    });
    if (!data) {
      toast.error('something went wrong!');
      listMessages();
    } else {
      // intervalId = setInterval(listMessages, 2000);

      getRun(data);
    }
  }

  async function getRun(data) {
    const { data: run } = await axios.post('/api/assistant/getRun', {
      thread_id: localStorage.getItem('thread_id'),
      run_id: data.id,
    });
    if (run.status === 'in_progress' || run.status === 'queued') {
      getRun(run);
      return;
    }

    if (run?.required_action) {
      const output =
        run?.required_action.submit_tool_outputs.tool_calls[0].function
          .arguments;

      await supabase
        .from('threads')
        .update(JSON.parse(output))
        .eq('thread_id', localStorage.getItem('thread_id'))
        .select();

      const { data: submitRun } = await axios.post('/api/assistant/submitRun', {
        thread_id: localStorage.getItem('thread_id'),
        run_id: data.id,
        call_id: run?.required_action.submit_tool_outputs.tool_calls[0].id,
        output: output,
      });
      if (submitRun) {
        if (JSON.parse(output).chat_end) {
          setCloseChat(JSON.parse(output).chat_end);
          localStorage.removeItem('thread_id');
          setMessages((pre) => {
            pre[0].value = 'Your application has been submitted successfully!';
            return [...pre];
          });
          return;
        }
        intervalId = setInterval(listMessages, 3000);
      }
    } else {
      listMessages();
    }
  }

  ///////////////////////////////////////////////////////////
  async function createThreat(assistant) {
    const { data } = await axios.post('/api/assistant/createThread');
    localStorage.setItem('thread_id', data.id);

    await supabase
      .from('threads')
      .insert({
        thread_id: data.id,
        assistant_id: assistant?.assistant_id,
      })
      .select();
  }

  //////////////////////////////////////////////////////////
  async function listMessages() {
    const { data } = await axios.post('/api/assistant/listMessages', {
      thread_id: localStorage.getItem('thread_id'),
    });
    const messages = data.map((item) => ({
      role: item.role || '',
      value:
        (item.content &&
          item.content[0] &&
          item.content[0].text &&
          item.content[0].text.value) ||
        '',
      metadata: item.metadata,
    }));

    if (data.length && data[0].content[0].text.value) {
      clearInterval(intervalId);
    }

    // console.log('messages', messages);
    if (messages.length) {
      setMessages([
        ...messages,
        {
          role: 'assistant',
          value: `Hi there! I'm the AI assistant for ${companyDetails.name}. Can I assist you in finding a suitable job opportunity today?`,
          metadata: {},
        },
      ]);
    }
  }
  /////////////////////////////////////////////////////////
  async function getCompanyDetails() {
    const { data: job } = await supabase
      .from('recruiter')
      .select()
      .eq('id', router.query.company_id);
    if (job) {
      setCompanyDetails(job[0]);
      // check before creating thread
      if (localStorage.getItem('thread_id')) {
        listMessages();
      } else {
        createThreat(job[0]);
      }
      // create thread on reload
      // createThreat();
      // get assistants list
    } else {
      return null;
    }
  }
  return (
    <JobAssistantContext.Provider
      value={{
        companyDetails,
        messages,
        setMessages,
        inputRef,
        createNewMessage,
        selectedFile,
        setSelectedFile,
        closeChat,
      }}
    >
      {children}
    </JobAssistantContext.Provider>
  );
}

// eslint-disable-next-line import/no-anonymous-default-export
export { JobAssistantProvider, useJobAssistantContext };
