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
let intervalId = null;
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
          uploadResume(attachedFile, textMessage, fileDetails);
        } catch (error) {
          toast.error('Error uploading file:', error.message);
        }
      } else {
        if (textMessage) {
          const { data } = await axios.post('/api/assistant/createMessage', {
            message: textMessage,
            thread_id: localStorage.getItem('thread_id'),
            file_details: fileDetails,
            resume_file: '',
          });

          if (data) {
            createRun();
          }
        }
      }
    } else {
      toast.warning('Please enter your message!');
    }
  }

  async function uploadResume(attachedFile, textMessage, fileDetails) {
    const { data, error } = await supabase.storage
      .from('resume-job-post')
      .upload(
        `assistant_candi/chat-resume_${new Date().getTime()}.pdf`,
        attachedFile,
        {
          cacheControl: '3600',
          upsert: false,
        },
      );

    if (!error) {
      localStorage.setItem(
        'candi_resume',
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resume-job-post/${data.path}`,
      );

      if (textMessage) {
        const { data: messageCreated } = await axios.post(
          '/api/assistant/createMessage',
          {
            message: textMessage,
            thread_id: localStorage.getItem('thread_id'),
            file_details: fileDetails,
            resume_file: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resume-job-post/${data.path}`,
          },
        );

        if (messageCreated) {
          createRun();
        }
      }
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
      let output =
        run?.required_action.submit_tool_outputs.tool_calls[0].function
          .arguments;

      await supabase
        .from('threads')
        .update(JSON.parse(output))
        .eq('thread_id', localStorage.getItem('thread_id'))
        .select();

      if (JSON.parse(output).candidate_email) {
        supabase
          .from('candidates')
          .insert({
            first_name: JSON.parse(output)?.candidate_name,
            email: JSON.parse(output)?.candidate_email,
            phone: JSON.parse(output)?.candidate_phone,
            recruiter_id: companyDetails.id,
          })
          .select()
          .then(({ data }) => {
            if (data) {
              localStorage.setItem('candidate_id', data[0].id);
            }
          });
      }

      if (JSON.parse(output).chat_end) {
        setCloseChat(JSON.parse(output));
        localStorage.removeItem('thread_id');
        setMessages((pre) => {
          pre[0].value = JSON.parse(output).applied
            ? 'Your application has been submitted successfully!'
            : 'Thank you for your time';
          return [...pre];
        });
        if (JSON.parse(output).applied) {
          supabase
            .from('job_applications')
            .insert({
              candidate_id: localStorage.getItem('candidate_id'),
              job_id: companyDetails.job_id,
              resume: localStorage.getItem('candi_resume'),
            })
            .select()
            .then((job) => {
              localStorage.removeItem('candidate_id');
              localStorage.removeItem('candi_resume');
              return job.data;
            });
        } else {
          await supabase
            .from('candidates')
            .delete()
            .eq('id', localStorage.getItem('candidate_id'))
            .select();
          localStorage.removeItem('candidate_id');
          localStorage.removeItem('candi_resume');
        }
        return;
      }

      if (JSON.parse(output).linkedin_url) {
        const { data: resumeData } = await axios.post('/api/getLinkedin', {
          linkedInURL: JSON.parse(output).linkedin_url,
        });
        output = JSON.stringify(resumeData);
      }
      const { data: submitRun } = await axios.post('/api/assistant/submitRun', {
        thread_id: localStorage.getItem('thread_id'),
        run_id: data.id,
        call_id: run?.required_action.submit_tool_outputs.tool_calls[0].id,
        output: output,
      });
      if (submitRun) {
        intervalId = setInterval(() => listMessages(run.status), 5000);
      }
    } else {
      listMessages(run.status);
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
  async function listMessages(status) {
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

    if (
      data.length &&
      data[0].content[0].text.value &&
      status === 'requires_action'
    ) {
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

    if (
      status === 'in_progress' ||
      status === 'queued' ||
      status === 'requires_action'
    ) {
      return;
    } else {
      clearInterval(intervalId);
    }
  }
  /////////////////////////////////////////////////////////
  async function getCompanyDetails() {
    if (router.query.new !== undefined) {
      localStorage.removeItem('thread_id');
      router.push(`/job-assistant/${router.query.company_id}`);
    }
    const { data: company } = await supabase
      .from('recruiter')
      .select()
      .eq('id', router.query.company_id);
    if (company) {
      const { data: job } = await supabase
        .from('public_jobs')
        .select()
        .eq('recruiter_id', router.query.company_id);
      let companyObj = company;
      let jobObj = { job_id: job[0]?.id };
      // console.log({ ...companyObj[0], ...jobObj });
      setCompanyDetails({ ...companyObj[0], ...jobObj });
      // check before creating thread
      if (localStorage.getItem('thread_id')) {
        listMessages('');
      } else {
        createThreat(company[0]);
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
