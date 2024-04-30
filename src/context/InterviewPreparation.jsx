/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
// ** React Imports
// import { useResumeBuilderContext } from '@context/ResumeBuilderContext';
import { calculateCompletionPercentage } from '@components/ResumeBuilderDashboard/CreateResume';
import { useAuthDetails } from '@context/AuthContext';
import { useJobTrack } from '@context/JobTrackingContext';
import { createSkillsPrompt } from '@utils/ai-prompts/createSkills';
import { improveAnswerPrompt } from '@utils/ai-prompts/improve_answer';
import { prePrompts } from '@utils/ai-prompts/interview_prompts';
import interviewerList from '@utils/interviewer_list';
import { pageRoutes } from '@utils/pageRouting';
import { updateProgressStatusInDb } from '@utils/temp/authUtils';
//import { toast } from 'react-toastify';
import toast from '@utils/toast';
import axios from 'axios';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

import { supabase } from '@/src/utils/supabase/client';

import { selectJobApplicationQuery } from '../pages/api/job/jobApplications/read/utils';
import { mockTestPrePrompts } from '../utils/ai-prompts/mock-test-prompts';
import { interviewCompleted } from '../utils/email_templates/innterview_completed';
import { useInterviewSignUp } from './InterviewSignup';
import { useLogActivities } from './LogActivities';
import { useResumeList } from './ResumeListContext';

const InterviewPrepContext = createContext();
const useInterviewPrep = () => useContext(InterviewPrepContext);
export var interviewDetails = {};
let context = [];
let audioElement;
let currentInterviewID;
let log_id;
let interviewerIndex = 0;

// timmer
let timmer;
let tempTime = 0;

// voice

let mediaRecorder;
let mediaStream;
let audioBlob;
let animationFrameId;

const InterviewPrepProvider = ({ children }) => {
  const { userJobTrack } = useJobTrack();
  const { updateFeedbackOnJobApplications, setOpenUserFeedback } =
    useInterviewSignUp();
  const { employeeDtails, progressStatus, setProgressStatus } =
    useAuthDetails();
  const { jobDetails, setTokenJson, applicantDetails } = useInterviewSignUp();

  const jsonData = jobDetails?.screening_questions[0];

  // Extract and format the questions
  const totalNumberOfQuestions = [];
  for (const category in jsonData) {
    // eslint-disable-next-line security/detect-object-injection
    const questions = jsonData[category].questions;
    for (const question of questions) {
      totalNumberOfQuestions.push(question.question);
    }
  }

  const { listResumeData } = useResumeList();
  const router = useRouter();
  const { update_log_activity, log_activity } = useLogActivities();
  let {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  //======================Start: States======================================================
  const [openInterviewStartedDrawer, setOpenInterviewStartedDrawer] =
    useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [introStep, setIntroStep] = useState(0);
  const [openSideDrawer, setOpenSideDrawer] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState([
    {
      selectedCompany: false,
      selectedResum: null,
    },
  ]);

  const [openAddComp, setOpenAddComp] = useState(false);

  const [trackerJobs, setTrackerJobs] = useState([]);
  useEffect(() => {
    setTrackerJobs(userJobTrack);
  }, [userJobTrack]);

  const [openAlertBox, setOpenAlertBox] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  // const [listening, setListening] = useState(false);

  const [keepText, setkeepText] = useState('');

  const [loadingRes, setLoadingRes] = useState(false);
  const [aiFailed, setAiFailed] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [aiFeedback, setAiFeedback] = useState('');
  const [aiFeedbackJSON, setAiFeedbackJSON] = useState([]);
  const [openAiChatToken, setOpenAiChatToken] = useState(0);

  const [convIndex, setConvIndex] = useState(null);

  const senderRef = useRef();
  let [aiskills, setAiSkills] = useState([]);
  let [tempSkills, setTempSkills] = useState([]);
  const [deletedSkills, setDeletedSkills] = useState([]);
  const [loadingSkills, setLoadingSkills] = useState(false);
  const [openSkillInput, setOpenSkillInput] = useState(false);
  const skillsRef = useRef();
  const [interviewsList, setInterviewsList] = useState([]);
  const [fetchingInterviews, setFetchingInterview] = useState(true);
  const [micLevel, setMicLevel] = useState(0);
  const [blinkLayer, setBlinkLayer] = useState(0);

  // timer

  const [getSecound, setSecond] = useState(0);
  const [getminutes, setMinutes] = useState(0);

  //=================================================== -:End:- =============================
  useEffect(() => {
    if (employeeDtails.length) getInterviews();
  }, [employeeDtails]);
  // for outsider interview

  useEffect(() => {
    if (router.pathname.includes('mock-test')) {
      setOpenInterviewStartedDrawer(true);
      // console.log(applicantDetails);
      // console.log(jobDetails);
      interviewDetails.company_name = jobDetails?.company;
      interviewDetails.job_role = jobDetails?.job_title;
    }
  }, [router]);

  //===============================================Start: common functions===================

  async function sendEmailAfterCompleteTheInterview() {
    await axios.post('/api/sendgrid', {
      email: employeeDtails[0]?.email,
      subject: `Thank You for Interviewing with ${jobDetails.company}`,
      text: interviewCompleted(
        jobDetails.company,
        employeeDtails[0]?.designation,
        employeeDtails[0]?.first_name,
        employeeDtails[0]?.email,
        applicantDetails.first_name.split('')[0].toUpperCase() +
          applicantDetails.first_name
            .slice(1, applicantDetails.first_name.length)
            .toLowerCase() +
          '@' +
          applicantDetails.application_id.split('-')[0],
      ),
    });
  }

  // ------------------------------ go to previous interview ---------------------
  function gotoHistoryPage(interview) {
    currentInterviewID = interview.id;
    interviewerIndex = interview.ai_interviewer_id;
    setConversations(interview.conversation);
    context = [...(interview.conversation || [])];
    interviewDetails.company_name = interview.company;
    interviewDetails.job_role = interview.role;
    interviewDetails.resume_skills = JSON.parse(interview.skills);
    interviewDetails.resume_id = interview.resume_id;
    interviewDetails.completed = interview.complete;
    interviewDetails.created_at = interview.created_at;
    interviewDetails.feedbackJSON = interview.feedback;
    interviewDetails.feedback = interview.ai_feedback;

    setAiFeedback(interview.ai_feedback);
    setOpenSideDrawer(true);
  }

  // ----------------------------- improve my answer -------------------
  function closeSidePanel() {
    interviewDetails = {};
  }
  async function improvemyans(index, question, answer) {
    setLoadingRes(true);
    const { error, data } = await axios.post('/api/interviewChatOpenAi', {
      context: [
        {
          role: 'system',
          content: improveAnswerPrompt(question, answer),
        },
      ],
    });
    if (!error) {
      setConversations((pre) => {
        pre[Number(index)].aiAnswer = data.response.content;
        updateConversation(pre);
        return [...pre];
      });
    }
  }

  async function updateConversation(preConversation) {
    const { data: updatedData, error: updateError } = await supabase
      .from('interview_preparation')
      .update({
        conversation: [...preConversation],
      })
      .eq('id', currentInterviewID)
      .select();
    if (!updateError) {
      setLoadingRes(false);
      return updatedData;
    }
  }
  async function updateAiToken(token) {
    const { data: updatedData, error: updateError } = await supabase
      .from('interview_preparation')
      .update({
        total_token_used: openAiChatToken + token,
      })
      .eq('id', currentInterviewID)
      .select();
    if (!updateError) {
      return updatedData;
    }
  }

  async function updateAiTokenForSignUpUser(usedToken) {
    const { data: updatedData, error: updateError } = await supabase
      .from('job_applications')
      .update({
        used_token: [usedToken],
      })
      .eq('application_id', router.query.id)
      .select(`${selectJobApplicationQuery}`);
    if (!updateError) {
      return updatedData;
    }
  }

  async function getInterviews() {
    const { data: interview_history, error } = await supabase
      .from('interview_preparation')
      .select()
      .order('created_at', { ascending: false })
      .eq('employee_id', employeeDtails[0]?.employee_id);
    if (!error) {
      setInterviewsList(interview_history);
    }
    setFetchingInterview(false);
  }

  const onCardClick = (index, jobs) => {
    // setActiveStep(1);
    setAiSkills([]);
    interviewDetails.company_name = jobs.company_name;
    interviewDetails.job_role = jobs.job_title;
    interviewDetails.tracker_job_id = jobs.job_id;
    setSelectedIndex((prevState) => {
      const newState = [...prevState];
      newState[0] = {
        ...newState[0],
        selectedCompany: index,
      };
      return newState;
    });
  };

  // ai suggested skills
  async function ai_suggested_skills() {
    if (skillsRef.current) {
      skillsRef.current.focus();
    }
    setOpenSkillInput(true);
    setLoadingSkills(true);
    const { data: skills, error } = await axios.post('/api/openAi', {
      inputText: createSkillsPrompt(interviewDetails.job_role),
    });

    if (!error) {
      if (Array.isArray(skills)) {
        setAiSkills(
          skills.map((skill) => {
            return {
              skill,
              active: false,
            };
          }),
        );
      } else {
        setAiSkills(
          JSON.parse(skills).map((skill) => {
            return {
              skill,
              active: false,
            };
          }),
        );
      }
      setLoadingSkills(false);
    }
  }

  function closeInterviewStartedDrawer() {
    if (router.asPath == pageRoutes.ONBOARDING) {
      router.push(pageRoutes.DASHBOARD);
      return;
    }

    if (router.pathname.includes(pageRoutes.MOCK_TEST) && introStep === 1) {
      updateFeedbackOnJobApplications(
        [],
        conversations,
        interviewerIndex,
        (getminutes < 10 ? '0' : '') +
          getminutes +
          ':' +
          (getSecound < 10 ? '0' : '') +
          getSecound,
      );
    }
    // senderRef.current.value = '';
    setLoadingSkills(false);
    setOpenAddComp(false);
    interviewDetails = {};
    setSelectedIndex([
      {
        selectedCompany: null,
        selectedResum: null,
      },
    ]);
    setActiveStep(0);
    setAiSkills([]);

    getInterviews();
    setOpenInterviewStartedDrawer(false);
    // clearing states
    context = [];
    setkeepText('');
    stopTimer();
    setSpeaking(false);
    setIntroStep(0);
    stopRecording();
    SpeechRecognition.abortListening();
    SpeechRecognition.stopListening();
    resetTranscript();
    setConversations([]);
    currentInterviewID = '';
    audioElement?.pause();
    audioElement = null;
    router.push(pageRoutes.MOCKTEST);
  }

  async function letsBegin() {
    audioElement = null;
    interviewerIndex = null;
    interviewerIndex = Math.floor(Math.random() * 10); // its generate the random index to pick the interviewer
    interviewDetails.resume_skills = tempSkills;
    const { error, data: interview } = await supabase
      .from('interview_preparation')
      .insert({
        employee_id: employeeDtails[0].employee_id,
        company: interviewDetails.company_name,
        role: interviewDetails.job_role,
        skills: deletedSkills,
        resume_id: interviewDetails.resume_id,
        complete: false,
        tracker_job_id: interviewDetails.tracker_job_id,
        ai_interviewer_id: interviewerIndex,
      })
      .select();

    if (!error) {
      // update user progress status
      if (!progressStatus?.interview?.first_interview) {
        updateProgressStatusInDb(
          {
            interview: { first_interview: true },
          },
          employeeDtails[0].user_id,
        ).then((data) => {
          setProgressStatus(data);
        });
      }
      // // log recent activities
      log_activity({
        type: pageRoutes.MOCK_INTERVIEW,
        item_id: interview[0].id,
        log_message: `Incomplete mock interview for ${interview[0].role} at ${interview[0].company}`,
      }).then((data) => {
        if (data && data.length) {
          log_id = data[0].id;
        }
      });
      currentInterviewID = interview[0].id;
      setOpenInterviewStartedDrawer(true);
    }
  }

  //=================================================================== -:End:- ====================
  //==========================================================Start: voice recording================

  // ask user for permission to access microphone
  function startRecording() {
    audioBlob = null;
    navigator.mediaDevices
      ?.getUserMedia({ audio: true })
      .then(function (stream) {
        // Store the media stream
        mediaStream = stream;

        // Create a MediaRecorder instance
        mediaRecorder = new MediaRecorder(stream);

        // Start recording
        mediaRecorder.ondataavailable = async (event) => {
          if (event.data.size > 0) {
            audioBlob = new Blob([event.data], { type: 'audio/mp3' });
          }
        };
        // mic level
        const audioContext = new window.AudioContext();
        const sourceNode = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        sourceNode.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        function updateVolume() {
          analyser.getByteFrequencyData(dataArray);
          const averageVolume =
            dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
          //   console.log(averageVolume);
          setMicLevel(averageVolume);

          setBlinkLayer('blink-layer');

          animationFrameId = requestAnimationFrame(updateVolume);
        }

        updateVolume();
        if (mediaRecorder) {
          mediaRecorder.start();
        }
      })
      .catch(function (error) {
        alert('Error accessing microphone:', error);
      });
  }
  async function uploadAudio() {
    //uploading audio file
    const { data, error } = await supabase.storage
      .from('interview_prep')
      .upload(
        `${employeeDtails[0].email.split('@')[0]}_${
          employeeDtails[0].user_id
        }/${currentInterviewID}/recorded_voice_${new Date().getTime()}.mp3`,
        audioBlob,
      );

    if (!error) {
      setConversations((pre) => {
        if (conversations.length === 0) {
          pre[1].userVoice = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/interview_prep/${data.path}`;
        } else {
          pre[conversations.length - 1].userVoice =
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/interview_prep/${data.path}`;
        }
        return [...pre];
      });
      audioBlob = null;
    }
  }
  function stopRecording() {
    if (mediaRecorder) {
      // Turn off the microphone
      if (mediaStream && mediaStream.getTracks) {
        mediaStream.getTracks().forEach(function (track) {
          track.stop();
        });
      }

      mediaRecorder.stop();
    }
  }
  //================================================================== -:End:- =====================
  //==========================================================Start: Timer functions================

  function startTimer() {
    timmer = setInterval(updateTimer, 1000); // Start the timer with a 1-second interval
  }
  function updateTimer() {
    tempTime = tempTime + 1;
    // Display the elapsed time
    if (tempTime > 59) {
      setSecond(0);
      tempTime = 0;
      setMinutes((pre) => pre + 1);
    }
    setSecond((pre) => pre + 1);
  }
  function stopTimer() {
    // setMinutes(0);
    // setSecond(0);
    tempTime = 0;
    clearInterval(timmer); // Clear the interval to stop the timer
  }
  //=========================================================== -:End:- ===================================
  //==========================================================Start: functions to handle steps=============

  const handleNext = async () => {
    if (
      activeStep === 0 &&
      listResumeData.filter(
        (f) => calculateCompletionPercentage(f).value > 90,
      ) !== 'loading' &&
      listResumeData.filter((f) => calculateCompletionPercentage(f).value > 90)
        .length === 0
    ) {
      ai_suggested_skills();
      setActiveStep(2);
    } else if (activeStep === 1 && interviewDetails.resume_id) {
      setActiveStep(3);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (interviewDetails.resume_id && activeStep === 3) {
      setActiveStep(1);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  //================================================================= -:End:- ======================

  //=============================================Start: funtions to fetch resume data================

  async function getResumeSkills(resume_id) {
    const { data, error } = await supabase
      .from('resume_skill')
      .select('*')
      .eq('resume_id', resume_id);
    if (!error) {
      const skillNames = JSON.stringify(
        data.map((skill) => skill.skill).join(', '),
      );
      interviewDetails.resume_skills = skillNames.replaceAll('"', '');
      return data;
    }
  }

  async function getAllResumeExperience(resume_id) {
    const { data, error } = await supabase
      .from('resume_experience')
      .select('*')
      .eq('resume_id', resume_id);
    if (!error) {
      interviewDetails.resume_experience = data;
      return data;
    }
  }

  async function getAllResumeProject(resume_id) {
    const { data, error } = await supabase
      .from('resume_project')
      .select('*')
      .eq('resume_id', resume_id);
    if (!error) {
      const projectsString = data
        .map(
          (project) =>
            JSON.stringify({
              title: project.title,
              orgnization: project.orgnization,
              start_date: project.start_date,
              end_date: project.end_date,
              description: project.description,
            }).replace(/^{|"|}|<\/p>|<p>|<br>|$/g, ''), // remove curly brackets and double quotes
        )
        .join(', ');
      interviewDetails.resume_projects = projectsString;
      return data;
    }
  }

  async function handleResumeCard(data) {
    interviewDetails.resume_id = data.resume_id;
    interviewDetails.resume_summary = data?.summary?.summary;
    getResumeSkills(data.resume_id);
    getAllResumeExperience(data.resume_id);
    getAllResumeProject(data.resume_id);
  }
  //============================================================== -:End:- ==========================

  //===========================================Start: funtions for interview pannel =================

  async function start_interview() {
    audioElement = null;
    interviewerIndex = null;
    interviewerIndex = Math.floor(Math.random() * 10); // its generate the random index to pick the interviewer
    const timeforMicPer = setTimeout(() => {
      document.getElementById('open-mic').click();
    }, 1000);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(async () => {
        document.getElementById('close-mic').click();
        document.getElementById('close-mic-block').click();
        // Permission granted
        clearTimeout(timeforMicPer);

        setIntroStep((pre) => pre + 1);
        startTimer();
        if (router.pathname.includes(pageRoutes.MOCK_TEST)) {
          context = mockTestPrePrompts(jobDetails);
        } else {
          context = prePrompts(interviewDetails);
        }
        setLoadingRes(true);
        try {
          const { data: response, error } = await axios.post(
            '/api/interviewChatOpenAi',
            {
              context: context,
            },
          );
          if (!error) {
            context.push(response.response);
            handleSpeak(response.response.role, response.response.content);
            if (router.pathname.includes(pageRoutes.MOCK_TEST)) {
              setTokenJson((pre) => {
                pre.interview_pre = openAiChatToken + response.token;
                updateAiTokenForSignUpUser(pre);
                return pre;
              });
            } else {
              updateAiToken(response.token);
            }
            setOpenAiChatToken((pre) => pre + response.token);
          }
        } catch (error) {
          setAiFailed(true);
          setLoadingRes(false);
        }
      })
      .catch(() => {
        clearTimeout(timeforMicPer);
        document.getElementById('close-mic').click();
        document.getElementById('open-mic-block').click();
      })
      .finally(() => {
        clearTimeout(timeforMicPer);
      });
  }

  async function ai_interviewer_reply() {
    const userText = senderRef?.current?.value;
    if (
      conversations.filter((ele) => ele.userContent).length + 1 >=
      totalNumberOfQuestions?.length
        ? totalNumberOfQuestions?.length
        : 10
    ) {
      senderRef.current.value = '';
      audioElement = null;
      context.push({
        role: 'user',
        content: 'End interview now',
      });
      setConversations((pre) => {
        pre[conversations.length - 1].userRole = 'You';
        pre[conversations.length - 1].userContent = userText;
        return [...pre];
      });
      stopRecording();
      SpeechRecognition.abortListening();
      SpeechRecognition.stopListening();
      resetTranscript();
      setLoadingRes(true);
      setTimeout(() => {
        uploadAudio();
      }, 500);
      try {
        const { data: response, error } = await axios.post(
          '/api/interviewChatOpenAi',
          {
            context: context,
          },
        );
        if (!error) {
          context.push(response.response);
          handleSpeak(response.response.role, response.response.content);
          if (router.pathname.includes(pageRoutes.MOCK_TEST)) {
            setTokenJson((pre) => {
              pre.interview_pre = openAiChatToken + response.token;
              updateAiTokenForSignUpUser(pre);
              return pre;
            });
          } else {
            updateAiToken(response.token);
          }
          setOpenAiChatToken((pre) => pre + response.token);
        }
      } catch (error) {
        setLoadingRes(false);
        setAiFailed(true);
      }
      return;
    }
    if (userText) {
      senderRef.current.value = '';
      audioElement = null;
      context.push({
        role: 'user',
        content: userText,
      });
      setConversations((pre) => {
        pre[conversations.length - 1].userRole = 'You';
        pre[conversations.length - 1].userContent = userText;
        return [...pre];
      });

      stopRecording();
      SpeechRecognition.abortListening();
      SpeechRecognition.stopListening();
      resetTranscript();
      setLoadingRes(true);
      setTimeout(() => {
        uploadAudio();
      }, 500);
      try {
        const { data: response, error } = await axios.post(
          '/api/interviewChatOpenAi',
          {
            context: context,
          },
        );
        if (!error) {
          context.push(response.response);
          handleSpeak(response.response.role, response.response.content);
          if (router.pathname.includes(pageRoutes.MOCK_TEST)) {
            setTokenJson((pre) => {
              pre.interview_pre = openAiChatToken + response.token;
              updateAiTokenForSignUpUser(pre);
              return pre;
            });
          } else {
            updateAiToken(response.token);
          }
          setOpenAiChatToken((pre) => pre + response.token);
        }
      } catch (error) {
        setLoadingRes(false);
        setAiFailed(true);
      }
    } else {
      toast.warning('Please give you answer.');
    }
  }

  async function getFeedback() {
    if (router.pathname.includes(pageRoutes.MOCK_TEST)) {
      setOpenUserFeedback(true);
    }
    audioElement?.pause();
    stopTimer();
    setIntroStep(2);

    stopRecording();
    SpeechRecognition.abortListening();
    SpeechRecognition.stopListening();
    resetTranscript();
    setLoadingRes(true);

    const pre_prompts = router.pathname.includes(pageRoutes.MOCK_TEST)
      ? mockTestPrePrompts(jobDetails)
      : prePrompts(interviewDetails);

    for (let i = 0; i < pre_prompts.length; i++) {
      context.shift();
    }
    console.log('Start interview feeback👍');
    const result = await axios.post('/api/interview', {
      interviewData: context,
    });

    console.log(result, '🔥', context);

    const structuredFeedback = result.data.data.results.map((item) => {
      const key = Object.keys(item)[0];
      const feedback = item[key].feedback;
      const rating = item[key].rating;
      return {
        topic: key,
        feedback,
        rating,
      };
    });

    console.log(structuredFeedback, '😍', result);

    setAiFeedback('response.response.content');
    let ai_feedback_json = [];

    ai_feedback_json = structuredFeedback;
    setAiFeedbackJSON(structuredFeedback);

    // if (router.pathname.includes(pageRoutes.MOCK_TEST)) {
    //   setTokenJson((pre) => {
    //     pre.interview_pre = openAiChatToken + response.token;
    //     updateAiTokenForSignUpUser(pre);
    //     return pre;
    //   });
    // } else {
    //   updateAiToken(response.token);
    // }
    // setOpenAiChatToken((pre) => pre + response.token);

    setLoadingRes(false);
    if (router.pathname.includes(pageRoutes.MOCK_TEST)) {
      updateFeedbackOnJobApplications(
        ai_feedback_json,
        conversations,
        interviewerIndex,
        (getminutes < 10 ? '0' : '') +
          getminutes +
          ':' +
          (getSecound < 10 ? '0' : '') +
          getSecound,
      );
      sendEmailAfterCompleteTheInterview();
      return;
    }

    const { data, error: updateError } = await supabase
      .from('interview_preparation')
      .update({
        context,
        conversation: [...conversations],
        complete: true,
        ai_feedback: 'response.response.content',
        feedback: ai_feedback_json,
        duration:
          (getminutes < 10 ? '0' : '') +
          getminutes +
          ':' +
          (getSecound < 10 ? '0' : '') +
          getSecound,
      })
      .eq('id', currentInterviewID)
      .select();
    if (!updateError) {
      // log recent activities
      update_log_activity(log_id, {
        log_message: `Completed mock interview for ${data[0].role} at ${data[0].company}`,
        type: pageRoutes.MOCKTEST,
      });
    }
  }

  // retry if Ai failed
  async function retry_if_ai_failed() {
    setAiFailed(false);
    setLoadingRes(true);
    try {
      const { data: response, error } = await axios.post(
        '/api/interviewChatOpenAi',
        {
          context: context,
        },
      );
      if (!error) {
        context.push(response.response);
        handleSpeak(response.response.role, response.response.content);
      }
    } catch (error) {
      setAiFailed(true);
      setLoadingRes(false);
    }
  }

  const handleListing = () => {
    if (!browserSupportsSpeechRecognition) {
      alert(`Brawser does't suppert`);
      return null;
    }

    if (!listening) {
      senderRef.current.value = '';
      startRecording();

      SpeechRecognition.startListening({
        continuous: true,
      });
    } else {
      stopRecording();
      SpeechRecognition.abortListening();
      SpeechRecognition.stopListening();
      resetTranscript();
    }
  };

  async function handleSpeak(role, content) {
    if (audioElement) {
      if (audioElement.paused) {
        setSpeaking(true);

        audioElement?.play();
      } else {
        audioElement?.pause();
        setSpeaking(false);
      }
      return null;
    }

    const textToSpeech = context.length
      ? context[context.length - 1]['content']
      : '';

    setkeepText('');
    try {
      console.log('entered with', interviewerIndex);
      const resp = await fetch(
        'https://us-west1-aglint-cloud-381414.cloudfunctions.net/text-to-speech',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip',
          },
          body: JSON.stringify({
            data: {
              audioConfig: {
                audioEncoding: 'LINEAR16',

                pitch: 0,
                speakingRate: 0.9,
              },
              input: {
                text: textToSpeech,
              },
              voice: interviewerList[Number(interviewerIndex)].voice,
            },
          }),
        },
      );
      const data = await resp.json();
      console.log('response', 'nfen', data);
      const error = null;
      console.log('after texttospeach', interviewerIndex);
      if (!error) {
        setLoadingRes(false);
        console.log('response from texttospeach', data);
        const audioContent = data.audioContent;
        // Convert the base64-encoded audio content to a data URL
        const audioDataUrl = `data:audio/mp3;base64,${audioContent}`;
        fetch(audioDataUrl)
          .then((response) => response.blob())
          .then(async (blob) => {
            console.log('ai voice blob', blob);
            const { data, error } = await supabase.storage
              .from('interview_prep')
              .upload(
                `${employeeDtails[0].email.split('@')[0]}_${
                  employeeDtails[0].user_id
                }/${currentInterviewID}/recorded_ai_voice_${new Date().getTime()}.mp3`,
                blob,
              );
            if (!error) {
              console.log('file uploaded', data);
              setConversations((pre) => [
                ...pre,
                {
                  role: role,
                  content: content,
                  userRole: '',
                  userContent: '',
                  userVoice: '',
                  aiAnswer: '',
                  aiVoice: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/interview_prep/${data.path}`,
                },
              ]);
            }
          });

        setSpeaking(true);
        setLoadingRes(false);
        setkeepText(textToSpeech);

        // Create an <audio> element
        audioElement = new Audio();
        audioElement.src = audioDataUrl;
        audioElement.addEventListener('ended', () => {
          // Handle the completion of the audio playback here
          // You can invoke a callback function or trigger any desired events

          if (router.pathname === pageRoutes.MOCK_INTERVIEW) {
            startRecording();
          }

          if (
            conversations.filter((ele) => ele.userContent).length + 1 >
            totalNumberOfQuestions?.length
              ? totalNumberOfQuestions?.length
              : 10
          ) {
            getFeedback();
          } else {
            SpeechRecognition.startListening({
              continuous: true,
            });
          }

          setSpeaking(false);
        });

        // audioElement.addEventListener("timeupdate", () => {
        //   const currentTime = audioElement.currentTime;
        //   const duration = audioElement.duration;
        //   const progressPercentage = (currentTime / duration) * 100;

        //   console.log(`Current time: ${currentTime} seconds`);
        //   console.log(`Duration: ${duration} seconds`);
        //   console.log(`Progress: ${progressPercentage}%`);
        // });
        audioElement?.play();
      } else {
        setLoadingRes(false);
        console.log(error);
      }
    } catch (error) {
      setLoadingRes(false);
      console.log(error);
      return error;
    }
  }

  // delete interview

  async function deleteInterview(interviewId) {
    const { error: interviewsError } = await supabase
      .from('interview_preparation')
      .delete()
      .eq('id', interviewId);
    if (!interviewsError) {
      const filteredInterview = interviewsList.filter(
        (pre) => pre.id !== interviewId,
      );
      setInterviewsList(filteredInterview);
      toast.success('Interview successfully deleted.');
    }
    // deleting all files from bucket
    const { data: allfiles, error: allfilesError } = await supabase.storage
      .from('interview_prep')
      .list(
        `${employeeDtails[0].email.split('@')[0]}_${
          employeeDtails[0].user_id
        }/${interviewId}`,
      );
    if (!allfilesError) {
      if (allfiles.length) {
        allfiles.forEach(async (file) => {
          await supabase.storage
            .from('interview_prep')
            .remove([
              `${employeeDtails[0].email.split('@')[0]}_${
                employeeDtails[0].user_id
              }/${interviewId}/${file.name}`,
            ]);
        });
      }
    }
  }

  return (
    <InterviewPrepContext.Provider
      value={{
        getInterviews,
        deleteInterview,
        currentInterviewID,
        interviewerIndex,
        gotoHistoryPage,
        improvemyans,
        interviewsList,
        setInterviewsList,
        fetchingInterviews,
        closeSidePanel,

        openInterviewStartedDrawer,
        setOpenInterviewStartedDrawer,
        closeInterviewStartedDrawer,

        openSideDrawer,
        setOpenSideDrawer,

        openAddComp,
        setOpenAddComp,
        trackerJobs,
        setTrackerJobs,
        onCardClick,

        getResumeSkills,
        getAllResumeExperience,
        getAllResumeProject,

        interviewDetails,
        selectedIndex,
        setSelectedIndex,
        activeStep,
        setActiveStep,
        introStep,
        setIntroStep,
        handleNext,
        handleBack,
        handleResumeCard,

        openAlertBox,
        setOpenAlertBox,

        context,
        loadingRes,
        setLoadingRes,
        senderRef,
        conversations,
        setConversations,
        aiFeedback,
        aiFeedbackJSON,
        setAiFeedbackJSON,
        convIndex,
        setConvIndex,

        listening,
        transcript,
        handleListing,
        handleSpeak,
        speaking,
        setSpeaking,
        keepText,
        setkeepText,

        aiskills,
        setAiSkills,
        tempSkills,
        setTempSkills,
        deletedSkills,
        setDeletedSkills,
        ai_suggested_skills,
        loadingSkills,
        openSkillInput,
        setOpenSkillInput,
        skillsRef,

        letsBegin,
        start_interview,
        ai_interviewer_reply,
        getFeedback,

        retry_if_ai_failed,
        aiFailed,
        setAiFailed,

        startTimer,
        stopTimer,
        getSecound,
        getminutes,

        micLevel,
        blinkLayer,

        animationFrameId,
        mediaRecorder,
      }}
    >
      {children}
    </InterviewPrepContext.Provider>
  );
};

export { InterviewPrepContext, InterviewPrepProvider, useInterviewPrep };
