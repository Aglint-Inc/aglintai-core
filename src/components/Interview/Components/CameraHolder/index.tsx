/* eslint-disable no-console */
/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useRef, useState } from 'react';

import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getGravatar } from '@/src/components/JobApplicationsDashboard/ApplicationCard';
import { useInterviewDetailsContext } from '@/src/context/InterviewDetails';

function CameraHolder() {
  const { candidateDetails } = useInterviewDetailsContext();
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const [cameraFailed, setCamaraFailed] = useState(false);
  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          mediaStreamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch(function (error) {
          setCamaraFailed(true);
          console.error('Error accessing the camera:', error);
        });
    } else {
      console.error('MediaDevices API is not supported in this browser.');
    }

    return () => {
      // Cleanup function to stop and close the video stream when the component unmounts
      if (mediaStreamRef.current) {
        const tracks = mediaStreamRef.current.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <>
      {cameraFailed ? (
        <MuiAvatar
          src={getGravatar(
            candidateDetails?.email,
            candidateDetails?.first_name,
          )}
          // src={undefined}
          fontSize={'200px'}
          height={'calc(100% - 235px)'}
          width={'100%'}
          variant={'rounded'}
          level={candidateDetails && candidateDetails?.first_name}
        />
      ) : (
        <video
          style={{
            width: '100%',
            // height: '100%',
            height: 'calc(100% - 235px)',

            // borderRadius: '50%',
            objectFit: 'cover',
            transform: 'scale(-1,1)',
          }}
          ref={videoRef}
          autoPlay
          playsInline
        ></video>
      )}
    </>
  );
}

export default CameraHolder;
