/* eslint-disable no-unused-vars */
import { JobAssistantChats, JobTypeDB } from '@aglint/shared-types';
import axios from 'axios';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

import { Application } from '@/src/types/applications.types';
import { supabase } from '@/src/utils/supabase/client';

import { AssistantMessageInterface, ChatInput } from './type';
import { reasons } from './utils';

// let setTime;
interface ContextValue {
  companyDetails: JobTypeDB | null;
  setCompanyDetails: (details: JobTypeDB | null) => void;
  candidates: any[] | null;
  setCandidates: (candidates: null) => void;
  candidatesFiles: any[] | null;
  setCandidatesFiles: (candidates: null) => void;
  applications: any[] | null;
  setApplications: (applications: null) => void;
  messages: AssistantMessageInterface[] | null;
  setMessages: (message: null) => void;
  handleChat: () => void;
  textMessage: ChatInput;
  setTextMessage: (textMessage: ChatInput) => void;
  backEndText: string;
  setBackEndText: (backEndText: string) => void;
  inputRef: any | null;
  resLoading: true | false;
  setResLoading: (resLoading: boolean) => void;
  createNewChat: () => void;
  jobAssistantChats: any[] | null;
  setJobAssistantChats: (jobAssistantChats: any[]) => void;
  currentChat: JobAssistantChats | null;
  setCurrentChat: (jobAssistantChats: JobAssistantChats) => void;
  switchChat: (job_id: string) => void;
  fetching: boolean;
  setFetching: (fetching: boolean) => void;
  isPopUpOpen: boolean;
  setIsPopUpOpen: (isPopUpOpen: boolean) => void;
  applicationDetails: Application;
  setApplicationDetails: (x: Application) => void;
}

const defaultProvider: ContextValue = {
  companyDetails: null,
  setCompanyDetails: () => {},
  candidates: null,
  setCandidates: () => {},
  candidatesFiles: null,
  setCandidatesFiles: () => {},
  applications: null,
  setApplications: () => {},
  messages: null,
  setMessages: () => {},
  handleChat: null,
  textMessage: {
    html: '',
    text: '',
    wordCount: 0,
  },
  setTextMessage: () => {},
  backEndText: null,
  setBackEndText: () => {},
  inputRef: null,
  resLoading: false,
  setResLoading: () => {},
  createNewChat: null,
  jobAssistantChats: null,
  setJobAssistantChats: () => {},
  currentChat: null,
  setCurrentChat: () => {},
  switchChat: null,
  fetching: null,
  setFetching: () => {},
  isPopUpOpen: null,
  setIsPopUpOpen: () => {},
  applicationDetails: null,
  setApplicationDetails: () => {},
};
let job_descriptions = '';
const JobAssistantContext = createContext<ContextValue>(defaultProvider);
const useJobAssistantContext = () => useContext(JobAssistantContext);
function JobAssistantProvider({ children }) {
  const router = useRouter();
  const [companyDetails, setCompanyDetails] = useState<JobTypeDB | null>(null);
  const [candidates, setCandidates] = useState([]);
  const [applications, setApplications] = useState<any[] | null>(null);
  const [candidatesFiles, setCandidatesFiles] = useState([]);
  const [jobAssistantChats, setJobAssistantChats] = useState([]);
  const [applicationDetails, setApplicationDetails] =
    useState<Application | null>(null);
  const [currentChat, setCurrentChat] = useState<JobAssistantChats | null>(
    null,
  );
  let [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const [textMessage, setTextMessage] = useState<ChatInput>({
    html: '',
    text: '',
    wordCount: 0,
  });
  const [backEndText, setBackEndText] = useState('');

  const [messages, setMessages] = useState<any[] | null>([]);
  const [resLoading, setResLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const inputRef = useRef(null);
  const job_id = router.query?.id as string;
  useEffect(() => {
    if (job_id) {
      getCompanyDetails(job_id);
      getApplications(job_id);
      getCandidates();
    }
  }, [job_id]);

  ////////////////////////// Create New Chat and Messages ///////////////////////////////////
  async function createNewChat() {
    setFetching(true);
    // console.log(messages);
    const { data: thread } = await axios.get('/api/job-assistant/createThread');

    if (thread?.error) {
      setFetching(false);
      return;
    }
    const thread_id = thread?.id as string;

    const currentDate = new Date();
    const { data: jobAssistantChats, error: chatsError } = await supabase
      .from('job_assiatan_chat')
      .select()
      .eq('job_id', router.query?.id)
      .order('created_at', {
        ascending: false,
      });

    if (!chatsError) {
      const { data: jobAssiatanChat, error } = await supabase
        .from('job_assiatan_chat')
        .insert({
          job_id: router.query?.id as string,
          updated_at: currentDate.toISOString(),
          thread_id: thread_id,
        })
        .select();
      if (!error) {
        router.query.chat_id = jobAssiatanChat[0].id;
        router.push(router);
        setJobAssistantChats([...jobAssiatanChat, ...jobAssistantChats]);
        setCurrentChat(jobAssiatanChat[0]);
        setMessages([]);
      }
    }
    setFetching(false);
  }
  async function createMessage(content: {
    message_id: any;
    sender: string;
    content:
      | { message: ChatInput; active: boolean }
      | {
          message: any;
          active: boolean;
          result_applications: any[];
          searchArguments: any;
        };
  }) {
    const { data: jobAssiatanChatMessages, error } = await supabase
      .from('job_assiatan_chat_messages')
      .insert({
        ...content,
        job_assiatan_chat_id: currentChat.id,
        type: '',
      })
      .select();
    if (!error) {
      return jobAssiatanChatMessages[0];
    }
  }
  //////////////////////////// get JobAssistant Chat //////////////////////////////
  async function getJobAssistantChat(job_id: string) {
    const { data: jobAssistantChats, error } = await supabase
      .from('job_assiatan_chat')
      .select()
      .eq('job_id', job_id)
      .order('created_at', {
        ascending: false,
      });
    if (!error) {
      // console.log(jobAssistantChats);
      if (!jobAssistantChats.length) {
        setCurrentChat({
          job_id: router.query?.id as string,
        } as JobAssistantChats);
        createNewChat();
        return;
      }
      const currectChat =
        jobAssistantChats.filter(
          (item) => item.id === router.query?.chat_id,
        )[0] || jobAssistantChats[0];
      if (currectChat.id) {
        getMessages(currectChat.id);
        setCurrentChat(currectChat);
        setJobAssistantChats(jobAssistantChats);
        router.query.chat_id = currectChat.id;
        router.push(router);
      }
    }
  }
  async function updateJobAssistantChat(last_message) {
    await supabase
      .from('job_assiatan_chat')
      .update({
        last_message,
      })
      .eq('id', currentChat.id);
    setCurrentChat((pre) => {
      pre.last_message = last_message as string;
      return { ...pre };
    });
    // getJobAssistantChat(currentChat.job_id);
  }
  async function getMessages(chat_id: string) {
    const { data: messages, error } = await supabase
      .from('job_assiatan_chat_messages')
      .select()
      .eq('job_assiatan_chat_id', chat_id)
      .order('created_at', {
        ascending: true,
      });
    if (!error) {
      setMessages(messages);
    }
  }

  function switchChat(chat_id: any) {
    const currect_Chat = jobAssistantChats.filter((ele) => ele.id === chat_id);
    setCurrentChat(currect_Chat[0]);
    getMessages(chat_id);
    router.query.chat_id = chat_id;
    router.push(router);
  }

  /////////////////////////// Send message /////////////////////////////////////

  const handleChat = async () => {
    setResLoading(true);
    const tempMessage = backEndText;
    const uisideText = textMessage;
    setTextMessage(null);
    setBackEndText('');
    const userMessage = {
      sender: 'You',
      content: { message: uisideText, active: true },
    };
    const assistantMessage = {
      sender: 'Assistant',
      content: {
        message: {
          html: '',
          text: '',
          wordCount: 0,
        } as ChatInput,
        active: true,
      },
    };
    setMessages((pre) => [...pre, userMessage, assistantMessage]);
    const { data: response } = await axios.post(
      '/api/job-assistant/cluoud-functions/assistant',
      {
        message: tempMessage,
        chat_id: currentChat.id,
      },
    );

    const message = response.result?.message;
    const result =
      response.result?.runResult?.get_applications ||
      response.result?.runResult?.get_applications_extra_details;
    let activeMessage = true;
    const application_data = result
      ? (result?.data as any[])
      : (result?.data as any[]);

    const application_ids = application_data
      ? application_data.map((ele) => ele.applications_id)
      : [];
    const result_applications = [];
    if (application_ids.length) {
      applications
        .filter((ele) => application_ids.includes(ele.id))
        .map((application) => {
          const candidateFiltered = candidates.filter(
            (candidate) => candidate.candidates.id === application.candidate_id,
          );
          result_applications.push({
            ...candidateFiltered[0],
          });
        });
    }
    const searchArguments = response.result?.runResult;

    //////////////////////////// hide original message and show the candidate cards//////
    if (
      response.result?.runResult?.get_applications_extra_details?.reason ===
        reasons.compare ||
      result?.data.length === 0
    ) {
      activeMessage = true;
    } else if (
      response.result?.runResult?.get_applications?.reason === reasons.filter &&
      response.result?.runResult?.get_applications_extra_details?.reason !==
        reasons.compare
    ) {
      activeMessage = false;
    }

    setMessages((pre: any) => {
      pre[messages.length + 1].sender = 'Assistant';
      pre[messages.length + 1].content.message = {
        html: message,
        text: message,
        wordCount: message?.length,
      };
      pre[messages.length + 1].content.active = activeMessage;
      pre[messages.length + 1].content.result_applications =
        result_applications;
      pre[messages.length + 1].content.searchArguments = searchArguments;
      return [...pre];
    });
    await createMessage({
      ...userMessage,
      message_id: response.result?.userMessageId,
    });

    await createMessage({
      sender: 'Assistant',
      content: {
        message: {
          html: message,
          text: message,
          wordCount: String(message).length,
        },
        active: activeMessage,
        result_applications: result_applications,
        searchArguments: searchArguments,
      },
      message_id: response.result?.assistantMessageId,
    });
    const lastMessage = message || '';
    updateJobAssistantChat(
      lastMessage?.length > 50 ? lastMessage.slice(0, 50) : lastMessage,
    );

    setResLoading(false);
  };

  ///////////////////////Fetch Company details//////////////////////////////////
  async function getCompanyDetails(job_id: string | string[]) {
    const { data: job, error } = await supabase
      .from('public_jobs')
      .select()
      .eq('id', job_id);
    if (!error) {
      job_descriptions = job[0].description as string;
      getJobAssistantChat(job[0].id);
      setCompanyDetails(job[0]);
    }
  }

  ////////////////////////////Fetch candidates and applications/////////////////////////////////////
  async function getCandidates() {
    setFetching(true);
    const { data: candidates } = await supabase
      .from('applications')
      .select('*, candidates (*)')
      .eq('job_id', job_id);
    setCandidates(candidates);
    setFetching(false);
  }
  async function getApplications(job_id: string) {
    const { data: applications, error } = await supabase
      .from('applications')
      .select()
      .eq('job_id', job_id);
    if (!error) {
      setApplications(applications);
    }
  }
  // async function getCandidatesFiles() {
  //   console.log('kj');
  //   const { data: candidatesFiles, error } = await supabase
  //     .from('candidate_files')
  //     .select();
  //   console.log(candidatesFiles, error);
  //   setCandidatesFiles(candidatesFiles);
  // }
  // getCandidatesFiles();

  ////////////////////////////// get application details //////////////////////////////////////////////////

  return (
    <JobAssistantContext.Provider
      value={{
        companyDetails,
        setCompanyDetails,
        candidates,
        setCandidates,
        candidatesFiles,
        setCandidatesFiles,
        applications,
        setApplications,
        createNewChat,
        messages,
        setMessages,
        handleChat,
        resLoading,
        setResLoading,
        textMessage,
        setTextMessage,
        backEndText,
        setBackEndText,
        inputRef,
        jobAssistantChats,
        setJobAssistantChats,
        currentChat,
        setCurrentChat,
        switchChat,
        fetching,
        setFetching,
        isPopUpOpen,
        setIsPopUpOpen,
        applicationDetails,
        setApplicationDetails,
      }}
    >
      {children}
    </JobAssistantContext.Provider>
  );
}

export { JobAssistantProvider, useJobAssistantContext };

//   {
//     "message": "The top 3 candidates based on the overall score are:\n\n1. Application ID: 697cd8c4-ad6f-4230-a8a1-ddd30aa8fc16\n2. Application ID: 2dd1f051-1e85-40ff-9116-1f96c6c576c4\n3. Application ID: 9760544e-b345-4c47-842e-4de94e45d7ae\n\nWould you like more details about these candidates?",
//     "runResult": {
//         "get_applications": {
//             "reason": "filtered_result",
//             "data": [
//                 {
//                     "applications_id": "697cd8c4-ad6f-4230-a8a1-ddd30aa8fc16"
//                 },
//                 {
//                     "applications_id": "2dd1f051-1e85-40ff-9116-1f96c6c576c4"
//                 },
//                 {
//                     "applications_id": "9760544e-b345-4c47-842e-4de94e45d7ae"
//                 }
//             ]
//         }
//     }
// }

//   {
//     "get_applications_extra_details": {
//         "reason": "compared_result",
//         "data": [

//         ]
//     }
// }
