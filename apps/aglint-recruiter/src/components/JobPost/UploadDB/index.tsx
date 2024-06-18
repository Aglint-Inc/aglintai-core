import {
  CandidateType,
  JobApplcationDB,
  JobTypeDB,
  RecruiterType,
} from '@aglint/shared-types';
import { Grid, IconButton, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { v4 as uuidv4 } from 'uuid';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { Checkbox } from '@/devlink/Checkbox';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { errorMessages } from '@/src/utils/errorMessages';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import Icon from '../../Common/Icons/Icon';
import UITextField from '../../Common/UITextField';

const initialError = () => {
  return {
    firstName: {
      error: false,
      msg: 'First name cannot be empty',
    },
    lastName: {
      error: false,
      msg: 'Last name cannot be empty',
    },
    email: {
      error: false,
      msg: errorMessages.emailRequired,
    },
    phone: {
      error: false,
      msg: '',
    },
    linkedinUrl: {
      error: false,
      msg: errorMessages.invalidLinkedIn,
    },
    file: {
      error: false,
      msg: 'Please upload your resume',
    },
    usn: {
      error: false,
      msg: 'Please enter you usn',
    },
    college_name: {
      error: false,
      msg: 'Please enter you College Name',
    },
    branch: {
      error: false,
      msg: 'Please enter you Branch',
    },
    cgpa: {
      error: false,
      msg: 'Please enter you CGPA',
    },
  };
};

function UploadDB({
  post,
  setThank,
  setLoading,
  setApplication,
  recruiter,
  setCandidate,
}: {
  post: JobTypeDB;
  setThank: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setApplication: Dispatch<SetStateAction<JobApplcationDB>>;
  recruiter: RecruiterType;
  setCandidate: Dispatch<SetStateAction<CandidateType[]>>;
}) {
  const [profile, setProfile] = useState<any>({
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null,
    resume: null,
    linkedin: null,
  });
  const [checked, setChecked] = useState(true);
  const [error, setError] = useState(initialError());
  const [file, setFile] = useState<any>();
  const [isDisabled, setIsDisabled] = useState(false);
  // eslint-disable-next-line no-unused-vars

  const router = useRouter();

  useEffect(() => {
    if (router?.isReady && router?.query?.college_name) {
      setProfile({
        ...profile,
        college_name: router?.query?.college_name,
        branch: router?.query?.branch,
      });
    }
  }, [router]);

  const uploadFile = (file) => {
    setFile(file);
  };

  const validate = () => {
    let isValid = true;
    if (!profile?.firstName) {
      error.firstName.error = true;
      isValid = false;
    } else {
      error.firstName.error = false;
    }

    if (!file) {
      error.file.error = true;
      isValid = false;
    } else {
      error.file.error = false;
    }

    const emailRegex = /^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i;
    if (profile?.email === '') {
      isValid = false;
      error.email.error = true;
      error.email.msg = errorMessages.emailRequired;
    } else if (emailRegex.test(profile?.email)) {
      error.email.error = false;
    } else {
      isValid = false;
      error.email.error = true;
      error.email.msg = errorMessages.emailRequired;
    }

    if (profile?.linkedin) {
      const regex = /^https:\/\/(www\.)?linkedin\.com.*/;
      const result = regex.test(profile.linkedin);

      if (!result) {
        isValid = false;
        error.linkedinUrl.error = true;
        error.linkedinUrl.msg = 'Please enter a valid LinkedIn URL';
      } else {
        error.linkedinUrl.error = false;
      }
    } else {
      error.linkedinUrl.error = false;
    }

    setError({ ...error });

    return isValid;
  };

  const submitHandler = async () => {
    if (checked && validate()) {
      setIsDisabled(true);
      let fileId = uuidv4();
      let uploadUrl = null;
      const { data } = await supabase.storage
        .from('resume-job-post')
        .upload(
          `public/${fileId}.${
            file.type.includes('pdf')
              ? 'pdf'
              : file.type.includes('doc')
                ? 'docx'
                : 'txt'
          }`,
          file,
          {
            cacheControl: '3600',
            // Overwrite file if it exist
            upsert: true,
          },
        );
      uploadUrl = `${
        process.env.NEXT_PUBLIC_SUPABASE_URL
      }/storage/v1/object/public/resume-job-post/${data?.path}?t=${new Date().toISOString()}`;

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/jobpost/write`,
        {
          profile: profile,
          recruiter: recruiter,
          post: post,
          fileId: fileId,
          uploadUrl: uploadUrl,
        },
      );

      if (response.status === 200 && response.data) {
        if (response.data.applied) {
          setLoading(false);
          toast.error('You have already applied for this job.');
        } else {
          setCandidate(response.data.candidate);
          setApplication(response.data.application);
          setLoading(false);
          setThank(true);
        }
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    }
  };

  useEffect(() => {
    if (isDisabled) setIsDisabled(false);
  }, [profile]);

  return (
    <Stack
      id='scrollTarget'
      sx={{
        background: 'var(--neutral-1)',
        p: { xs: '10px', mm: '30px' },
        borderRadius: 'var(--radius-4)',
      }}
    >
      <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
        <Typography variant='h3'>Apply for this job.</Typography>
        <Typography variant='caption' color={'#000'}>
          <span style={{ color: 'var(--error-11)' }}>*</span> Required
        </Typography>
      </Stack>
      <Grid container spacing={3} pt={'var(--space-5)'}>
        <Grid item xs={12} sm={6} md={6}>
          <UITextField
            required
            fullWidth
            placeholder='First Name'
            label='First Name'
            error={error.firstName.error}
            helperText={error.firstName.error ? error.firstName.msg : null}
            value={profile?.firstName}
            onChange={(e) => {
              setProfile({ ...profile, firstName: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <UITextField
            fullWidth
            label='Last Name'
            placeholder='Last Name'
            value={profile?.lastName}
            onChange={(e) => {
              setProfile({ ...profile, lastName: e.target.value });
            }}
            error={error.lastName.error}
            helperText={error.lastName.error ? error.lastName.msg : null}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <UITextField
            required
            fullWidth
            label='Email'
            placeholder='Email'
            value={profile?.email}
            onChange={(e) => {
              setProfile({ ...profile, email: e.target.value });
            }}
            error={error.email.error}
            helperText={error.email.error ? error.email.msg : null}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <UITextField
            fullWidth
            label='Phone'
            placeholder='Phone'
            value={profile?.phoneNumber}
            onChange={(e) => {
              setProfile({ ...profile, phoneNumber: e.target.value });
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <UITextField
            value={profile.usn}
            fullWidth
            label='LinkedIn URL'
            placeholder='https://www.linkedin.com/in/your-id'
            error={error.linkedinUrl.error}
            helperText={error.linkedinUrl.error ? error.linkedinUrl.msg : null}
            onChange={(e) => {
              setProfile({ ...profile, linkedin: e.target.value });
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Stack position={'relative'}>
            {/* <Stack direction={'row'} justifyContent={'flex-end'} pb={'var(--space-2)'}>
              <Typography variant='caption'>* Optional</Typography>
            </Stack> */}

            <FileUploader
              handleChange={uploadFile}
              name='file'
              types={fileTypes}
            >
              <Stack
                sx={{
                  border: '1px dashed',
                  borderColor: 'var(--neutral-6)',
                  borderRadius: 1,
                  py: '40px',
                  px: '20px',
                  cursor: 'pointer',
                  background: 'var(--white)',
                }}
                direction='row'
                spacing={2}
                alignItems={'center'}
                justifyContent={'center'}
              >
                {!file && (
                  <GlobalIcon iconName='cloud_upload' />
                  // <svg
                  //   xmlns='http://www.w3.org/2000/svg'
                  //   width='24'
                  //   height='24'
                  //   viewBox='0 0 24 24'
                  //   fill='none'
                  // >
                  //   <path
                  //     d='M1 14.5C1 12.1716 2.22429 10.1291 4.06426 8.9812C4.56469 5.044 7.92686 2 12 2C16.0731 2 19.4353 5.044 19.9357 8.9812C21.7757 10.1291 23 12.1716 23 14.5C23 17.9216 20.3562 20.7257 17 20.9811L7 21C3.64378 20.7257 1 17.9216 1 14.5ZM16.8483 18.9868C19.1817 18.8093 21 16.8561 21 14.5C21 12.927 20.1884 11.4962 18.8771 10.6781L18.0714 10.1754L17.9517 9.23338C17.5735 6.25803 15.0288 4 12 4C8.97116 4 6.42647 6.25803 6.0483 9.23338L5.92856 10.1754L5.12288 10.6781C3.81156 11.4962 3 12.927 3 14.5C3 16.8561 4.81833 18.8093 7.1517 18.9868L7.325 19H16.675L16.8483 18.9868ZM13 13V17H11V13H8L12 8L16 13H13Z'
                  //     fill='#2F3941'
                  //   />
                  // </svg>
                )}
                <Typography variant='body1' sx={{ textAlgin: 'center' }}>
                  {file
                    ? `Uploaded File: ${file?.name}`
                    : 'Please upload your resume in PDF or DOC format.'}
                </Typography>
              </Stack>
            </FileUploader>
            {file && (
              <IconButton
                sx={{ zIndex: 1000, position: 'absolute', right: 20, top: 34 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
              >
                <Icon variant='TrashIcon' />
              </IconButton>
            )}
            {error.file.error && (
              <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'start'}
                px={1.5}
                pt={0.5}
              >
                <Typography variant='caption' color={'error.main'}>
                  {error.file.msg}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <Checkbox
              isChecked={checked}
              onClickCheck={{
                onClick: () => {
                  setChecked(!checked);
                },
              }}
            />

            <Stack
              direction={'row'}
              spacing={'var(--space-1)'}
              sx={{ flexWrap: 'wrap' }}
            >
              <Typography
                variant='caption'
                color={!checked && 'error.main'}
                sx={{ cursor: 'default' }}
              >
                By applying, you are agreeing to the
              </Typography>
              <Typography
                sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                variant='caption'
                color={!checked && 'error.main'}
                onClick={() => {
                  window.open('https://www.aglinthq.com/terms', '_blank');
                }}
              >
                terms and conditions
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item>
          <ButtonSolid
            textButton='Apply Now'
            size={2}
            isDisabled={isDisabled}
            isLoading={isDisabled}
            onClickButton={{
              onClick: () => {
                if (!isDisabled) submitHandler();
              },
            }}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default UploadDB;

export const fileTypes = ['PDF', 'DOCX', 'TXT'];
