import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { CheckCircle2, FileIcon, UploadCloud } from 'lucide-react';
import React, { type ChangeEvent, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import { PhoneInput } from '@/components/PhoneInput';
import { useApplicationsActions, useJob } from '@/job/hooks';
import { SafeObject } from '@/utils/safeObject';

const fileTypes = ['PDF', 'DOCX', 'TXT'];

type FormField = {
  value: string | File | null;
  error: boolean;
  required: boolean;
};

type FormEntries = {
  first_name: FormField;
  last_name: FormField;
  email: FormField;
  phone: FormField;
  linkedin: FormField;
  resume: FormField;
};

const initialFormFields: FormEntries = {
  first_name: { value: '', error: false, required: true },
  last_name: { value: '', error: false, required: true },
  email: { value: '', error: false, required: true },
  phone: { value: '', error: false, required: false },
  linkedin: { value: '', error: false, required: false },
  resume: { value: null, error: false, required: true },
};

export const ImportManual = () => {
  const [applicant, setApplicant] = useState(initialFormFields);
  const { setImportPopup } = useApplicationsActions();
  const { handleUploadApplication } = useJob();

  const validateForm = () => {
    const newApplicant = { ...applicant };
    let isValid = true;

    SafeObject.entries(newApplicant).forEach(([key, field]) => {
      if (field.required && !field.value) {
        newApplicant[key].error = true;
        isValid = false;
      } else if (
        key === 'email' &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value as string)
      ) {
        newApplicant[key].error = true;
        isValid = false;
      }
    });

    setApplicant(newApplicant);
    return isValid;
  };

  const handleSubmit = async () => {
    try {
      if (validateForm()) {
        await handleUploadApplication({
          candidate: {
            first_name: applicant.first_name.value as string,
            last_name: applicant.last_name.value as string,
            email: applicant.email.value as string,
            phone: applicant.phone.value as string,
            linkedin: applicant.linkedin.value as string,
          },
          file: applicant.resume.value as File,
        });
        setImportPopup(false);
      }
    } catch {
      //
    }
  };

  return (
    <Card
      className='flex flex-col border-0 pt-2 shadow-none'
      style={{ height: '550px' }}
    >
      <div className='flex-grow overflow-auto'>
        <FormBody applicant={applicant} setApplicant={setApplicant} />
      </div>
      <div className='p-0'>
        <Button onClick={handleSubmit} className='w-full'>
          Add Candidate
        </Button>
      </div>
    </Card>
  );
};

const FormBody = ({
  applicant,
  setApplicant,
}: {
  applicant: FormEntries;
  setApplicant: React.Dispatch<React.SetStateAction<FormEntries>>;
}) => {
  const handleChange = (
    value: FormEntries['email']['value'],
    key: keyof FormEntries,
  ) => {
    setApplicant((prev) => ({
      ...prev,
      [key]: { ...prev[key], value, error: false },
    }));
  };

  return (
    <div className='flex flex-col gap-4 p-1'>
      <div className='grid grid-cols-2 gap-4'>
        <FormField
          label='First Name'
          id='first_name'
          value={applicant.first_name.value}
          onChange={(e: ChangeEvent<{ value: string }>) =>
            handleChange(e.target.value, 'first_name')
          }
          error={applicant.first_name.error}
        />
        <FormField
          label='Last Name'
          id='last_name'
          value={applicant.last_name.value}
          onChange={(e: ChangeEvent<{ value: string }>) =>
            handleChange(e.target.value, 'last_name')
          }
          error={applicant.last_name.error}
        />
      </div>
      <div className='flex flex-col gap-4'>
        <FormField
          label='Email'
          id='email'
          type='email'
          value={applicant.email.value}
          onChange={(e: ChangeEvent<{ value: string }>) =>
            handleChange(e.target.value, 'email')
          }
          error={applicant.email.error}
        />
        <div className='space-y-2'>
          <Label htmlFor='phone'>Phone Number</Label>
          <PhoneInput
            value={applicant.phone.value as string}
            onChange={(value) => handleChange(value, 'phone')}
          />
        </div>
      </div>
      <FormField
        label='LinkedIn URL'
        id='linkedin'
        value={applicant.linkedin.value}
        onChange={(e: ChangeEvent<{ value: string }>) =>
          handleChange(e.target.value, 'linkedin')
        }
        error={applicant.linkedin.error}
      />
      <ResumeUploadComp
        value={applicant.resume.value}
        error={applicant.resume.error}
        handleChange={(file: File) => handleChange(file, 'resume')}
      />
    </div>
  );
};

const FormField = ({
  label,
  id,
  value,
  onChange,
  error,
  type = 'text',
}: {
  label: string;
  id: string;
  value: any;
  onChange: any;
  error: any;
  type?: string;
}) => (
  <div className='space-y-2'>
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className={error ? 'border-red-500' : ''}
    />
    {error && (
      <p className='text-sm text-red-500'>Please provide a valid {label}</p>
    )}
  </div>
);

const ResumeUploadComp = ({ value, handleChange, error }: any) => (
  <div className='space-y-2'>
    <Label htmlFor='resume' className='mb-3 flex items-center gap-1'>
      Upload Resume <span className='text-red-500'>*</span>
    </Label>
    <FileUploader handleChange={handleChange} types={fileTypes}>
      <div
        className={`flex h-[100px] cursor-pointer items-center justify-center space-x-2 rounded-md border-2 border-dashed p-8 ${error ? 'border-red-500' : 'border-border'} bg-gray-50`}
      >
        {value ? <FileIcon size={20} /> : <UploadCloud size={24} />}
        <span
          className={`text-sm ${error ? 'text-red-500' : 'text-gray-600'} ${value ? 'font-medium' : ''}`}
        >
          {value ? value.name : 'Upload candidate resume [PDF/DOCX]'}
        </span>
        {value && <CheckCircle2 size={16} className='text-green-600' />}
      </div>
    </FileUploader>
    {error && (
      <p className='text-sm text-red-500'>Please upload the candidate resume</p>
    )}
  </div>
);
