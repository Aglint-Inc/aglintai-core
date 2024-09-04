import {
  type CandidateType,
  type JobApplcationDB,
  type JobTypeDB,
} from '@aglint/shared-types';
import { Grid, IconButton, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { Loader2, Trash } from 'lucide-react';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { v4 as uuidv4 } from 'uuid';
import { GlobalIcon } from '@devlink2/GlobalIcon';
import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { useRouterPro } from '@/hooks/useRouterPro';
import { type PublicJobAPI } from '@/pages/api/jobpost/read';
import { errorMessages } from '@/utils/errorMessages';
import { supabase } from '@/utils/supabase/client';
import toast from '@/utils/toast';

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
  recruiter: PublicJobAPI['recruiter'];
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

  const router = useRouterPro<{ college_name: string; branch: string }>();

  useEffect(() => {
    if (router.queryParams.college_name) {
      setProfile({
        ...profile,
        college_name: router.queryParams.college_name,
        branch: router.queryParams.branch,
      });
    }
  }, [router.queryParams.college_name]);

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
        borderRadius: 'var(--radius-4)',
      }}
    >
      <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
        <Typography variant='h4' className='font-semibold'>
          Apply for this job.
        </Typography>
        <Typography variant='caption' className='text-sm' color={'#000'}>
          <span style={{ color: '#FF0000' }} className='text-sm'>
            *
          </span>{' '}
          Required
        </Typography>
      </Stack>
      <Grid container spacing={3} className='mt-2'>
        <Grid item xs={12} sm={6}>
          <div className='space-y-2'>
            <Label htmlFor='firstName'>
              First Name <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='firstName'
              placeholder='First Name'
              value={profile?.firstName || ''}
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
              className={error.firstName.error ? 'border-red-500' : ''}
            />
            {error.firstName.error && (
              <p className='text-sm text-red-500'>{error.firstName.msg}</p>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className='space-y-2'>
            <Label htmlFor='lastName'>Last Name</Label>
            <Input
              id='lastName'
              placeholder='Last Name'
              value={profile?.lastName || ''}
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
              className={error.lastName.error ? 'border-red-500' : ''}
            />
            {error.lastName.error && (
              <p className='text-sm text-red-500'>{error.lastName.msg}</p>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className='space-y-2'>
            <Label htmlFor='email'>
              Email <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='email'
              placeholder='Email'
              value={profile?.email || ''}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              className={error.email.error ? 'border-red-500' : ''}
            />
            {error.email.error && (
              <p className='text-sm text-red-500'>{error.email.msg}</p>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className='space-y-2'>
            <Label htmlFor='phone'>Phone</Label>
            <Input
              id='phone'
              placeholder='Phone'
              value={profile?.phoneNumber || ''}
              onChange={(e) =>
                setProfile({ ...profile, phoneNumber: e.target.value })
              }
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className='space-y-2'>
            <Label htmlFor='linkedin'>LinkedIn URL</Label>
            <Input
              id='linkedin'
              placeholder='https://www.linkedin.com/in/your-id'
              value={profile?.linkedin || ''}
              onChange={(e) =>
                setProfile({ ...profile, linkedin: e.target.value })
              }
              className={error.linkedinUrl.error ? 'border-red-500' : ''}
            />
            {error.linkedinUrl.error && (
              <p className='text-sm text-red-500'>{error.linkedinUrl.msg}</p>
            )}
          </div>
        </Grid>
        <Grid item xs={12}>
          <Stack position={'relative'}>
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
                {!file && <GlobalIcon iconName='cloud_upload' />}
                <Typography variant='body1' sx={{ textAlign: 'center' }}>
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
                <Trash />
              </IconButton>
            )}
            {error.file.error && (
              <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'start'}
                pt={0.5}
              >
                <Typography
                  variant='caption'
                  className='text-sm'
                  color={'error.main'}
                >
                  {error.file.msg}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <Checkbox
              id='terms'
              checked={checked}
              onCheckedChange={() => setChecked(!checked)}
            />
            <Stack direction={'row'} spacing={'4px'} sx={{ flexWrap: 'wrap' }}>
              <Typography variant='caption' sx={{ cursor: 'default' }}>
                By applying, you are agreeing to the
              </Typography>
              <Typography
                sx={{
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  color: 'gray.800',
                  '&:hover': {
                    color: 'text.secondary',
                  },
                }}
                variant='caption'
                onClick={() => {
                  window.open('https://www.aglinthq.com/terms', '_blank');
                }}
              >
                terms and conditions
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Button
            size='sm'
            disabled={isDisabled}
            onClick={() => {
              if (!isDisabled) submitHandler();
            }}
          >
            {isDisabled ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : null}
            Apply Now
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default UploadDB;

export const fileTypes = ['PDF', 'DOCX', 'TXT'];
