/* eslint-disable security/detect-object-injection */
import axios from 'axios';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

const InterviewContext = createContext();
let audioElement = null;
let interviewerIndex = 1;
// voice
let audioBlob;
let animationFrameId;
const context = [];
let totalNumberOfQuestions = [];

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { handleAssessmentResultApi } from '@/src/pages/api/assessment-result/utils';
import interviewerList from '@/src/utils/interviewer_list';
import toast from '@/src/utils/toast';

import { useCandidateAssessment } from '../CandidateAssessment';
const useInterviewContext = () => useContext(InterviewContext);

function InterviewContextProvider({ children }) {
  let {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const router = useRouter();

  const { assessmentQuestions } = useCandidateAssessment();

  useEffect(() => {
    if (assessmentQuestions)
      totalNumberOfQuestions.push(`Thank you for taking the time to meet with us today.
     We're excited to have you here for this interview and learn more about your qualifications and experiences. Let's get started.`);
    assessmentQuestions.map((item) => {
      totalNumberOfQuestions.push(item.question.label);
    });
    totalNumberOfQuestions.push(`Thank you,for your time and sharing your insights with us today.
     If you have any further questions or need more information from us, 
     please don't hesitate to reach out.Wishing you a great day ahead.`);
  }, [assessmentQuestions]);

  const [openSidePanelDrawer, setOpenSidePanelDrawer] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [loadingRes, setLoadingRes] = useState(false);

  const [allowMic, setAllowMic] = useState(false);

  const [openEndInterview, setOpenEndInterview] = useState(false);

  const [openThanksPage, setOpenThanksPage] = useState(false);

  const [showStartCard, setShowStartCard] = useState(false);

  //questions
  const [questionIndex, setQuestionIndex] = useState(0);

  // speaking
  const [speaking, setSpeaking] = useState(false);
  const senderRef = useRef();

  // print char

  const [character, setCharacter] = useState('');

  async function startInterview() {
    audioElement = null;
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(async () => {
        setAllowMic(false);
        setOpenSidePanelDrawer(true);
        if (questionIndex !== 0) {
          context.push({
            role: 'assistant',
            content: totalNumberOfQuestions[Number(questionIndex)],
          });
        }
        handleSpeak('assistant', totalNumberOfQuestions[Number(questionIndex)]);
      });
  }

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

    const textToSpeech = content;

    try {
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
      const error = null;
      if (!error) {
        setLoadingRes(false);
        const audioContent = data.audioContent;
        // Convert the base64-encoded audio content to a data URL
        const audioDataUrl = `data:audio/mp3;base64,${audioContent}`;
        fetch(audioDataUrl)
          .then((response) => response.blob())
          .then(async (blob) => {
            // eslint-disable-next-line no-console
            console.log(blob);
            if (
              questionIndex !== 0 &&
              questionIndex < totalNumberOfQuestions.length - 2
            ) {
              setConversations((pre) => [
                ...pre,
                {
                  role: role,
                  content: content,
                  userRole: '',
                  userContent: '',
                  userVoice: '',
                  aiAnswer: '',
                  aiVoice: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/candidate_interview/${data.path}`,
                },
              ]);
            }
          });

        setSpeaking(true);
        setCharacter(textToSpeech);
        audioElement = new Audio();
        audioElement.src = audioDataUrl;
        audioElement.addEventListener('ended', () => {
          // Handle the completion of the audio playback here
          // You can invoke a callback function or trigger any desired events
          if (totalNumberOfQuestions.length - 2 === questionIndex) {
            setOpenEndInterview(true);
            setOpenThanksPage(true);
            getFeedback();
            setSpeaking(false);
            return null;
          }
          if (questionIndex !== 0) {
            startRecording();

            SpeechRecognition.startListening({
              continuous: true,
            });
          }
          if (questionIndex === 0) {
            setQuestionIndex((pre) => pre + 1);
          }

          setSpeaking(false);
        });
        audioElement?.play();
      } else {
        setLoadingRes(false);
      }
    } catch (error) {
      setLoadingRes(false);
      return error;
    }
  }

  async function submitAnswers() {
    const userText = senderRef?.current?.value;
    stopRecording();
    if (userText) {
      setCharacter('');
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
      setLoadingRes(true);
      setQuestionIndex((pre) => pre + 1);
      if (questionIndex < totalNumberOfQuestions.length - 2) {
        context.push({
          role: 'assistant',
          content: totalNumberOfQuestions[Number(questionIndex + 1)],
        });
      }
      handleSpeak(
        'assistant',
        totalNumberOfQuestions[Number(questionIndex + 1)],
      );
    } else {
      toast.warning('Please provide your answer!');
    }
  }
  function stopRecording() {
    if (document.getElementById('mic-trigger')) {
      document.getElementById('mic-trigger').click();
    }
    SpeechRecognition.abortListening();
    SpeechRecognition.stopListening();
    resetTranscript();
  }
  function startRecording() {
    audioBlob = null;
    navigator.mediaDevices
      ?.getUserMedia({ audio: true })
      .then(function () {
        // Store the media stream
        document.getElementById('mic-trigger').click();
      })
      .catch(function (error) {
        alert('Error accessing microphone:', error);
      });
  }

  // handle listening
  const handleListing = () => {
    if (!browserSupportsSpeechRecognition) {
      toast.error(`Browser does't support`);
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
    }
  };

  function stopListening() {
    if (!browserSupportsSpeechRecognition) {
      toast.error(`Browser does't suppoert`);
      return null;
    }
    stopRecording();
  }

  async function getFeedback() {
    stopRecording();
    audioElement?.pause();
    const userResponse = conversations.map((item) => {
      return { label: item.userContent };
    });
    const { data: answers } = await axios.post(
      '/api/candidate-assessment/assessment-answers',
      {
        assessment_id: router.query?.assessment_id,
      },
    );
    const { data: results } = await axios.post(
      '/api/candidate-assessment/assessment-result-details',
      {
        assessment_id: router.query?.assessment_id,
        application_id: router.query?.application_id,
      },
    );

    const responses = assessmentQuestions.map((item, i) => {
      return {
        question_id: item.id,
        type: item.type,
        question: item.question,
        answer: answers[i].answer,
        response: userResponse[i],
      };
    });
    await axios.post('/api/candidate-assessment/assessment-result-update', {
      assessment_id: router.query?.assessment_id,
      objData: {
        responses: responses,
        is_submitted: true,
      },
    });
    await handleAssessmentResultApi('result', {
      result_id: results.id,
    });
    router.push('/assessment-thanks');
  }

  async function disconnecting() {
    getFeedback();
  }

  useEffect(() => {
    return () => {
      SpeechRecognition.abortListening();
      SpeechRecognition.stopListening();
    };
  }, [router]);

  return (
    <InterviewContext.Provider
      value={{
        startInterview,
        audioElement,
        interviewerIndex,
        totalNumberOfQuestions,
        questionIndex,
        setQuestionIndex,
        transcript,
        submitAnswers,
        senderRef,
        handleListing,
        stopListening,
        listening,
        conversations,
        openSidePanelDrawer,
        setOpenSidePanelDrawer,
        allowMic,
        setAllowMic,
        getFeedback,
        disconnecting,
        speaking,
        loadingRes,
        animationFrameId,
        audioBlob,
        openThanksPage,
        setOpenThanksPage,
        openEndInterview,
        setOpenEndInterview,
        character,

        setCharacter,
        showStartCard,
        setShowStartCard,
        setConversations,
        context,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
}

export { InterviewContextProvider, useInterviewContext };
