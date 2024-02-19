/* eslint-disable jsx-a11y/media-has-caption */
import Stack from '@mui/material/Stack';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import { UploadedVideo, UploadVideo } from '@/devlink';
import { LoaderSvg } from '@/devlink/LoaderSvg';
import AUIButton from '@/src/components/Common/AUIButton';
import MuiPopup from '@/src/components/Common/MuiPopup';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import QuestionVideoPlayer from './QuestionVideoPlayer';
import { useJobForm } from '../../JobPostFormProvider';
import { API_FAIL_MSG, supabaseWrap } from '../../utils';

const fileTypes = ['mp4', 'mkv'];
const bucketUrl = 'interview_setting_videos';

function UploadInstructionVideo() {
  const [isVideoUploading, setIsVideoUploading] = useState(false);
  const { jobForm, handleUpdateFormFields } = useJobForm();
  const videoRef = useRef();
  const videoInfo = jobForm.formFields.interviewSetting.uploadedVideoInfo;
  const [openPopup, setOpenPopup] = useState(false);

  const handleChange = async (file) => {
    try {
      setIsVideoUploading(true);
      const data = supabaseWrap(
        await supabase.storage
          .from(bucketUrl)
          .upload(`${jobForm.jobPostId}?${new Date().toISOString()}`, file, {
            cacheControl: '3600',
            // Overwrite file if it exis
            upsert: true,
            contentType: file.type,
          }),
      );

      let videoUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucketUrl}/${data.path}`;
      handleUpdateFormFields({
        path: 'interviewSetting.uploadedVideoInfo.videoUrl',
        value: videoUrl,
      });
    } catch (err) {
      toast.error(API_FAIL_MSG);
    } finally {
      setIsVideoUploading(false);
    }
  };

  const handleRemoveVideo = async () => {
    try {
      const path = videoInfo.videoUrl.replace(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/`,
        '',
      );
      supabaseWrap(await supabase.storage.from(bucketUrl).remove([path]));
      handleUpdateFormFields({
        path: 'interviewSetting.uploadedVideoInfo.videoUrl',
        value: '',
      });
    } catch (err) {
      toast.error(API_FAIL_MSG);
    }
  };

  const showFileUpload = isEmpty(videoInfo.videoUrl);

  return isVideoUploading ? (
    <Stack alignItems={'center'} justifyContent={'center'} height={200}>
      <LoaderSvg />
    </Stack>
  ) : (
    <>
      <MuiPopup
        props={{
          open: openPopup,
          // onClose: handleVideoEnd,
          maxWidth: 'md',
          fullWidth: true,
        }}
      >
        <QuestionVideoPlayer
          avatarName={''}
          setOpenPopUp={setOpenPopup}
          videoUrl={videoInfo.videoUrl}
        />
      </MuiPopup>
      <Stack width={'100%'}>
        {showFileUpload && (
          <FileUploader
            handleChange={handleChange}
            name={`${'instructionVideo.mp4'}_${new Date().toUTCString()}`}
            types={fileTypes}
          >
            <UploadVideo />
          </FileUploader>
        )}
        {videoInfo.videoUrl && (
          <UploadedVideo
            onClickClear={{
              onClick: handleRemoveVideo,
            }}
            isPlayIconVisible={true}
            onClickPlayPause={{
              onClick: () => {
                setOpenPopup(true);
              },
            }}
            slotButton={
              <>
                <FileUploader
                  handleChange={handleChange}
                  name={`${'instructionVideo.mp4'}_${new Date().toUTCString()}`}
                  types={fileTypes}
                >
                  <AUIButton
                    variant='outlined'
                    onClick={() => {
                      // inputref.current?.click();
                    }}
                    startIcon={
                      <>
                        <Image
                          src={'/images/svg/uploadIcon.svg'}
                          height={20}
                          width={20}
                          alt='upload'
                        />
                      </>
                    }
                  >
                    Reupload
                  </AUIButton>
                </FileUploader>
              </>
            }
            slotVideo={
              <>
                <video
                  ref={videoRef}
                  onClick={() => {
                    // console.log('feok');
                  }}
                >
                  <source src={videoInfo.videoUrl} type='video/mp4' />
                </video>
              </>
            }
          />
        )}
      </Stack>
    </>
  );
}

export default UploadInstructionVideo;
