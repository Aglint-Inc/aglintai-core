import {
  type CandidateType,
  type JobApplcationDB,
  type JobTypeDB,
} from '@aglint/shared-types';
import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import { Input } from '@components/ui/input';
import axios from 'axios';
import { CloudUpload, Loader2, Trash } from 'lucide-react';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { errorMessages } from 'src/app/_common/utils/errorMessages';
import { v4 as uuidv4 } from 'uuid';

import { useRouterPro } from '@/hooks/useRouterPro';
import { type PublicJobAPI } from '@/pages/api/jobpost/read';
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

  const uploadFile = (file: File) => {
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
      const fileId = uuidv4();
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
    <div className='rounded-lg bg-neutral-100 p-4 sm:p-8'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>Apply for this job.</h2>
        <p className='text-sm'>
          <span className='text-red-500'>*</span> Required
        </p>
      </div>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
        <div>
          <Input
            required
            placeholder='First Name'
            value={profile?.firstName}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />
        </div>
        <div>
          <Input
            placeholder='Last Name'
            value={profile?.lastName}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
        </div>
        <div>
          <Input
            required
            placeholder='Email'
            value={profile?.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
        </div>
        <div>
          <Input
            placeholder='Phone'
            value={profile?.phoneNumber}
            onChange={(e) =>
              setProfile({ ...profile, phoneNumber: e.target.value })
            }
          />
        </div>
        <div className='col-span-full'>
          <Input
            placeholder='https://www.linkedin.com/in/your-id'
            value={profile.linkedin}
            onChange={(e) =>
              setProfile({ ...profile, linkedin: e.target.value })
            }
          />
        </div>
        <div className='col-span-full'>
          <div className='relative'>
            <FileUploader
              handleChange={uploadFile}
              name='file'
              types={fileTypes}
            >
              <div className='flex cursor-pointer items-center justify-center rounded-md border border-dashed border-neutral-300 bg-white p-8'>
                {!file && <CloudUpload className='mr-2 h-6 w-6' />}
                <p className='text-center'>
                  {file
                    ? `Uploaded File: ${file?.name}`
                    : 'Please upload your resume in PDF or DOC format.'}
                </p>
              </div>
            </FileUploader>
            {file && (
              <Button
                variant='ghost'
                size='sm'
                className='absolute right-2 top-2'
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
              >
                <Trash className='h-4 w-4' />
              </Button>
            )}
            {error.file.error && (
              <p className='ml-1 mt-1 text-sm text-red-500'>{error.file.msg}</p>
            )}
          </div>
        </div>
        <div className='col-span-full'>
          <div className='flex items-center space-x-2'>
            <Checkbox
              checked={checked}
              onCheckedChange={() => setChecked(!checked)}
            />
            <div className='flex flex-wrap items-center space-x-1'>
              <p className={`text-sm ${!checked ? 'text-red-500' : ''}`}>
                By applying, you are agreeing to the
              </p>
              <button
                className={`text-sm underline ${!checked ? 'text-red-500' : ''}`}
                onClick={() =>
                  window.open('https://www.aglinthq.com/terms', '_blank')
                }
              >
                terms and conditions
              </button>
            </div>
          </div>
        </div>
        <div className='col-span-full'>
          <Button
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
        </div>
      </div>
    </div>
  );
}

export default UploadDB;

const fileTypes = ['PDF', 'DOCX', 'TXT'];
