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
let setTime;

const JobAssistantContext = createContext();
const useJobAssistantContext = () => useContext(JobAssistantContext);
const firstMessage = 'Yes, please';
function JobAssistantProvider({ children }) {
  const [jobDetails, setJobDetails] = useState({});
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const router = useRouter();
  const inputRef = useRef(null);

  useEffect(() => {
    if (router.query?.job_id) {
      getJobDetails();

      // check before creating thread
      if (localStorage.getItem('thread_id')) {
        listMessages();
      } else {
        createThreat();
      }
      // create thread on reload
      // createThreat();
      // get assistants list
      getAssistants();
    }
  }, [router.isReady]);

  async function getAssistants() {
    const { data } = await axios.post('api/assistant/listAssistant');
    // eslint-disable-next-line no-console
    console.log('assistants', data);
  }
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
      clearInterval(intervalId);
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
      assistant_id: router.query.assistant_id,
    });
    if (!data) {
      toast.error('something went wrong!');
      listMessages();
    } else {
      intervalId = setInterval(listMessages, 2000);
      clearTimeout(setTime);

      setTime = setTimeout(() => {
        clearInterval(intervalId);
      }, 60000);
    }
  }
  ///////////////////////////////////////////////////////////
  async function createThreat() {
    const { data } = await axios.post('/api/assistant/createThread');
    localStorage.setItem('thread_id', data.id);
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

    // if (data.length && data[0].content[0].text.value) {
    //   clearInterval(intervalId);
    // }
    // if (data.length && data[0].content[0].text.value === '' && !intervalId) {
    //   intervalId = setInterval(listMessages, 2000);
    // }

    // console.log('messages', messages);
    if (messages.length) {
      setMessages([
        ...messages,
        {
          role: 'assistant',
          value: `Hi there! I'm the AI assistant for ${jobDetails.company}. Can I assist you in finding a suitable job opportunity today?`,
          metadata: {},
        },
      ]);
    }
  }
  /////////////////////////////////////////////////////////
  async function getJobDetails() {
    const { data: job } = await supabase
      .from('public_jobs')
      .select()
      .eq('id', router.query.job_id);
    if (job) {
      setJobDetails(job[0]);
    }
  }
  return (
    <JobAssistantContext.Provider
      value={{
        jobDetails,
        messages,
        setMessages,
        inputRef,
        createNewMessage,
        selectedFile,
        setSelectedFile,
      }}
    >
      {children}
    </JobAssistantContext.Provider>
  );
}

// eslint-disable-next-line import/no-anonymous-default-export
export { JobAssistantProvider, useJobAssistantContext };
