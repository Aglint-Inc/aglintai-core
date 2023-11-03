/* eslint-disable security/detect-object-injection */
import { createContext, useContext, useEffect, useRef } from 'react';

import { useInterviewDetailsContext } from '../InterviewDetails';

const InterviewContext = createContext();
let audioElement = null;
let interviewerIndex = 0;

// voice

let mediaRecorder;
let mediaStream;
let audioBlob;
let animationFrameId;

// timmer
let timmer;
let tempTime = 0;

//video

const context = [];
const totalNumberOfQuestions = [];
const video_Ids = [];
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

import interviewerList from '@/src/utils/interviewer_list';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { getRecruiter, updateFeedbackOnJobApplications } from './utils';
const useInterviewContext = () => useContext(InterviewContext);
function InterviewContextProvider({ children }) {
  let {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const router = useRouter();
  const { jobDetails, candidateDetails } = useInterviewDetailsContext();
  getRecruiter(jobDetails?.recruiter_id).then((data) => {
    interviewerIndex = data?.audio_avatar_id;
  });
  useEffect(() => {
    if (Object.keys(jobDetails).length) {
      const jsonData = jobDetails?.screening_questions[0];
      // Extract and format the questions
      for (const category in jsonData) {
        // eslint-disable-next-line security/detect-object-injection
        const questions = jsonData[category].questions;
        // const videoIds = jsonData[category].questions;
        // console.log(videoIds, category);
        for (const question of questions) {
          if (question?.video_id) {
            video_Ids.push(question?.video_id);
          }

          // console.log(question.video_id);
          totalNumberOfQuestions.push(question.question);
        }
      }
    }
    if (router?.query?.id && video_Ids.length === 0) {
      setVideoAssessment(false);
    } else {
      setVideoAssessment(true);
    }

    video_Ids.forEach(async (ele) => {
      const { data, error } = await supabase
        .from('ai_videos')
        .select()
        .eq('video_id', ele);
      if (!error) {
        setVideo_Urls((pre) => [...pre, data[0]?.file_url + data[0]?.video_id]);
        // console.log(data[0].file_url + data[0].video_id, ele);
      }
    });
  }, [jobDetails]);

  const [openSidePanelDrawer, setOpenSidePanelDrawer] = useState(false);
  const [videoAssessment, setVideoAssessment] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [loadingRes, setLoadingRes] = useState(false);

  const [allowMic, setAllowMic] = useState(false);

  const [openEndInterview, setOpenEndInterview] = useState(false);

  const [openThanksPage, setOpenThanksPage] = useState(false);

  // timer

  const [getSecond, setSecond] = useState(0);
  const [getminutes, setMinutes] = useState(0);

  //questions
  const [questionIndex, setQuestionIndex] = useState(0);

  // speaking
  const [speaking, setSpeaking] = useState(false);
  const [micLevel, setMicLevel] = useState(0);
  const senderRef = useRef();
  const videoRef = useRef();

  const [videoLoad, setVideoLoad] = useState(true);

  // video
  const [video_Urls, setVideo_Urls] = useState([]);

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

  // print char

  const [character, setCharacter] = useState('');
  function printCharactersOneByOne(inputString, delay = 100) {
    let index = 0;
    function printNextCharacter() {
      if (index < inputString.length) {
        const character = inputString.charAt(index);
        setCharacter((pre) => pre + character);
        index++;
        setTimeout(printNextCharacter, delay);
      }
    }

    printNextCharacter();
  }

  // end

  async function startInterview() {
    audioElement = null;
    // interviewerIndex = null;
    // interviewerIndex = Math.floor(Math.random() * 10); // its generate the random index to pick the interviewer
    // interviewerIndex = 6;
    const timeforMicPer = setTimeout(() => {
      setAllowMic(true);
      //   document.getElementById('open-mic').click();
    }, 1000);
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(async () => {
        // Permission granted
        setAllowMic(false);
        setOpenSidePanelDrawer(true);
        clearTimeout(timeforMicPer);
        startTimer();

        context.push({
          role: 'assistant',
          content: totalNumberOfQuestions[Number(questionIndex)],
        });
        handleSpeak('assistant', totalNumberOfQuestions[Number(questionIndex)]);
      })
      .catch(() => {
        clearTimeout(timeforMicPer);
        setAllowMic(true);
      })
      .finally(() => {
        clearTimeout(timeforMicPer);
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
            const { data, error } = await supabase.storage
              .from('candidate_interview')
              .upload(
                `${candidateDetails?.email.split('@')[0]}_${
                  candidateDetails?.application_id
                }/${
                  candidateDetails?.application_id
                }/recorded_ai_voice_${new Date().getTime()}.mp3`,
                blob,
              );
            if (!error) {
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
        setLoadingRes(false);

        // Create an <audio> element
        audioElement = new Audio();
        audioElement.src = audioDataUrl;
        audioElement.addEventListener('ended', () => {
          // Handle the completion of the audio playback here
          // You can invoke a callback function or trigger any desired events

          startRecording();

          SpeechRecognition.startListening({
            continuous: true,
          });

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
        printCharactersOneByOne(textToSpeech, 50);
      } else {
        setLoadingRes(false);
      }
    } catch (error) {
      setLoadingRes(false);
      return error;
    }
  }

  async function startVideoInterview() {
    const timeforMicPer = setTimeout(() => {
      setAllowMic(true);
      //   document.getElementById('open-mic').click();
    }, 1000);
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(async () => {
        // Permission granted
        setAllowMic(false);
        setOpenSidePanelDrawer(true);
        clearTimeout(timeforMicPer);
        // startTimer();
        setSpeaking(true);

        context.push({
          role: 'assistant',
          content: totalNumberOfQuestions[Number(questionIndex)],
        });

        setLoadingRes(false);
        setConversations((pre) => [
          ...pre,
          {
            role: 'assistant',
            content: totalNumberOfQuestions[Number(questionIndex)],
            userRole: '',
            userContent: '',
            userVoice: '',
            aiAnswer: '',
            aiVoice: ``,
          },
        ]);
      })
      .catch(() => {
        clearTimeout(timeforMicPer);
        setAllowMic(true);
      })
      .finally(() => {
        clearTimeout(timeforMicPer);
      });
  }
  function handleVideoPlay() {
    setSpeaking(true);
    stopListening();
  }
  function handleVideoPause() {
    stopListening();
    setSpeaking(false);
  }
  function handleVideoEnd() {
    startRecording();

    SpeechRecognition.startListening({
      continuous: true,
    });

    setSpeaking(false);
  }
  async function submitVideoAnswers() {
    const userText = senderRef?.current?.value;
    if (userText) {
      senderRef.current.value = '';
      setSpeaking(true);

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
      if (totalNumberOfQuestions.length === questionIndex + 1) {
        setOpenEndInterview(true);
        setOpenThanksPage(true);
        getFeedback();
        return null;
      } else {
        setQuestionIndex((pre) => pre + 1);
        context.push({
          role: 'assistant',
          content: totalNumberOfQuestions[Number(questionIndex + 1)],
        });
      }

      setLoadingRes(false);
      setConversations((pre) => [
        ...pre,
        {
          role: 'assistant',
          content: totalNumberOfQuestions[Number(questionIndex + 1)],
          userRole: '',
          userContent: '',
          userVoice: '',
          aiAnswer: '',
          aiVoice: ``,
        },
      ]);
    } else {
      toast.warning('Please provide your answer!');
    }
  }

  async function submitAnswers() {
    const userText = senderRef?.current?.value;

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

      stopRecording();
      SpeechRecognition.abortListening();
      SpeechRecognition.stopListening();
      resetTranscript();
      setLoadingRes(true);
      if (totalNumberOfQuestions.length === questionIndex + 1) {
        setOpenEndInterview(true);
        setOpenThanksPage(true);
        getFeedback();
        return null;
      } else {
        setQuestionIndex((pre) => pre + 1);
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
    document.getElementById('mic-trigger').click();
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
  function startRecording() {
    audioBlob = null;
    navigator.mediaDevices
      ?.getUserMedia({ audio: true })
      .then(function (stream) {
        // Store the media stream
        mediaStream = stream;
        document.getElementById('mic-trigger').click();

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

  // handle listening
  const handleListing = () => {
    if (!browserSupportsSpeechRecognition) {
      toast.error(`Brawser does't suppert`);
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

  function stopListening() {
    if (!browserSupportsSpeechRecognition) {
      toast.error(`Brawser does't suppert`);
      return null;
    }

    stopRecording();
    SpeechRecognition.abortListening();
    SpeechRecognition.stopListening();
    resetTranscript();
  }
  // feedback

  async function getFeedback() {
    // eslint-disable-next-line no-console
    stopRecording();
    SpeechRecognition.abortListening();
    SpeechRecognition.stopListening();
    resetTranscript();
    audioElement?.pause();

    const result = await axios.post('/api/interview', {
      interviewData: context,
    });

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

    const res = await updateFeedbackOnJobApplications(
      candidateDetails,
      jobDetails,
      structuredFeedback,
      conversations,
      interviewerIndex,
      '00:00',
    );
    if (res) {
      router.push(`/thanks-page?id=${candidateDetails?.application_id}`);
    }
  }

  async function disconnecting() {
    stopRecording();
    SpeechRecognition.abortListening();
    SpeechRecognition.stopListening();
    resetTranscript();
    audioElement?.pause();

    const structuredFeedback = [];
    const res = await updateFeedbackOnJobApplications(
      candidateDetails,
      jobDetails,
      structuredFeedback,
      conversations,
      interviewerIndex,
      '00:00',
    );
    if (res) {
      router.push(`/thanks-page?id=${candidateDetails?.application_id}`);
    }
  }
  return (
    <InterviewContext.Provider
      value={{
        startInterview,
        audioElement,
        interviewerIndex,
        getSecond,
        getminutes,
        stopTimer,
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
        micLevel,
        loadingRes,

        animationFrameId,
        audioBlob,

        openThanksPage,
        setOpenThanksPage,
        openEndInterview,
        setOpenEndInterview,

        character,
        startVideoInterview,
        submitVideoAnswers,

        video_Ids,
        video_Urls,

        setVideo_Urls,
        videoRef,
        videoLoad,
        setVideoLoad,
        handleVideoEnd,
        handleVideoPlay,
        handleVideoPause,
        videoAssessment,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
}

export { InterviewContextProvider, useInterviewContext };
