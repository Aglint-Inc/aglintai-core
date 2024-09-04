import { CheckCircle2, FileIcon, UploadCloud } from 'lucide-react';
import React from 'react';
import { Dispatch, SetStateAction, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import UIPhoneInput from '@/src/components/Common/UIPhoneInput';
import { useApplicationsStore } from '@/src/context/ApplicationsContext/store';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJob } from '@/src/context/JobContext';

const fileTypes = ['PDF', 'DOCX', 'TXT'];

type FormEntries = {
  first_name: FormField;
  last_name: FormField;
  email: FormField;
  phone: FormField;
  linkedin?: FormField;
  resume?: FormField;
  status: FormField;
};

type FormField = {
  value: string | File | null;
  error: boolean;
  validation: 'text' | 'mail' | 'phone' | 'url' | 'file';
  required: boolean;
};

const initialFormField: FormField = {
  value: null,
  error: false,
  validation: 'text',
  required: true,
};

const initialFormFields: FormEntries = {
  first_name: initialFormField,
  last_name: initialFormField,
  email: { ...initialFormField, validation: 'mail' },
  phone: { ...initialFormField, validation: 'phone', required: false },
  linkedin: { ...initialFormField, validation: 'url', required: false },
  resume: { ...initialFormField, validation: 'file' },
  status: { ...initialFormField, value: 'new' },
};

const validatePhone = (value: string): boolean => {
  const digitCount = (value.match(/\d/g) || []).length;
  return digitCount === 10 || digitCount === 11;
};

const ImportManual = () => {
  const [applicant, setApplicant] = useState(initialFormFields);
  const setImportPopup = useApplicationsStore(
    ({ setImportPopup }) => setImportPopup,
  );
  const { handleUploadApplication } = useJob();

  const handleValidate = (): {
    newApplicant: FormEntries;
    validation: boolean;
  } => {
    return Object.entries(applicant).reduce(
      (acc, [key, curr]) => {
        let value = curr.value;
        let error = false;

        if (
          !curr.required &&
          (!value || (typeof value === 'string' && value.trim() === ''))
        ) {
          return {
            ...acc,
            newApplicant: {
              ...acc.newApplicant,
              [key]: { ...curr, value: '', error: false },
            },
          };
        }

        switch (curr.validation) {
          case 'text':
            error =
              !value || (typeof value === 'string' && value.trim() === '');
            break;
          case 'mail':
            error =
              !value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string);
            break;
          case 'url':
            error =
              !value ||
              !/^https?:\/\/(?:www\.)?linkedin\.com\/\S+$/i.test(
                value as string,
              );
            break;
          case 'file':
            error = !value;
            break;
          case 'phone':
            error = !validatePhone(value as string);
            break;
        }

        return {
          newApplicant: {
            ...acc.newApplicant,
            [key]: { ...curr, value, error },
          },
          validation: acc.validation && !error,
        };
      },
      { newApplicant: applicant, validation: true },
    );
  };

  const handleSubmit = async () => {
    const { newApplicant, validation } = handleValidate();
    if (validation) {
      handleUploadApplication({
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
    } else {
      setApplicant(newApplicant);
    }
  };

  return (
    <div className='bg-white p-4'>
      <FormBody applicant={applicant} setApplicant={setApplicant} />
      <div className='flex justify-end mt-4'>
        <Button onClick={handleSubmit}>Add Candidate</Button>
      </div>
    </div>
  );
};

const FormBody = ({
  applicant,
  setApplicant,
}: {
  applicant: FormEntries;
  setApplicant: Dispatch<SetStateAction<FormEntries>>;
}) => {
  const { userCountry } = useAuthDetails();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | string | File,
    key: keyof FormEntries,
  ) => {
    setApplicant((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        value:
          key === 'resume'
            ? e
            : typeof e === 'string'
              ? e
              : 'target' in e
                ? e.target.value
                : e,
        error: false,
      },
    }));
  };

  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='first_name'>First Name</Label>
          <Input
            id='first_name'
            placeholder='First Name'
            value={applicant.first_name.value as string}
            onChange={(e) => handleChange(e, 'first_name')}
            className={applicant.first_name.error ? 'border-red-500' : ''}
          />
          {applicant.first_name.error && (
            <p className='text-red-500 text-sm'>{getHelper('First Name')}</p>
          )}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='last_name'>Last Name</Label>
          <Input
            id='last_name'
            placeholder='Last Name'
            value={applicant.last_name.value as string}
            onChange={(e) => handleChange(e, 'last_name')}
            className={applicant.last_name.error ? 'border-red-500' : ''}
          />
          {applicant.last_name.error && (
            <p className='text-red-500 text-sm'>{getHelper('Last Name')}</p>
          )}
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            placeholder='Email'
            value={applicant.email.value as string}
            onChange={(e) => handleChange(e, 'email')}
            className={applicant.email.error ? 'border-red-500' : ''}
          />
          {applicant.email.error && (
            <p className='text-red-500 text-sm'>{getHelper('Email')}</p>
          )}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='phone'>Phone Number</Label>
          <UIPhoneInput
            phoneNumber={applicant.phone.value as string}
            setPhoneNumber={(formattedValue) =>
              handleChange(formattedValue, 'phone')
            }
            country={userCountry}
            isError={applicant.phone.error}
          />
          {applicant.phone.error && (
            <p className='text-red-500 text-sm'>{getHelper('Phone Number')}</p>
          )}
        </div>
      </div>
      <div className='space-y-2'>
        <Label htmlFor='linkedin'>LinkedIn URL</Label>
        <Input
          id='linkedin'
          placeholder='LinkedIn'
          value={applicant.linkedin.value as string}
          onChange={(e) => handleChange(e, 'linkedin')}
          className={applicant.linkedin.error ? 'border-red-500' : ''}
        />
        {applicant.linkedin.error && (
          <p className='text-red-500 text-sm'>{getHelper('LinkedIn url')}</p>
        )}
      </div>
      <ResumeUploadComp
        value={applicant.resume.value as File}
        error={applicant.resume.error}
        handleChange={() => handleChange(null, 'resume')}
      />
    </div>
  );
};

export const ResumeUploadComp = ({
  value,
  handleChange,
  error = false,
  label = true,
}: {
  value: File;
  handleChange: () => any;
  error?: boolean;
  label?: boolean;
}) => {
  return (
    <div className='space-y-2'>
      {label && (
        <Label htmlFor='resume' className='flex items-center gap-1'>
          Upload Resume <span className='text-red-500'>*</span>
        </Label>
      )}
      <FileUploader handleChange={handleChange} types={fileTypes}>
        <div
          className={`border border-dashed rounded-md p-8 cursor-pointer flex items-center justify-center space-x-2 ${error ? 'border-red-500' : 'border-gray-300'} bg-gray-50`}
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
        <p className='text-red-500 text-sm'>
          Please upload the candidate resume
        </p>
      )}
    </div>
  );
};

const getHelper = (title: string) => {
  return `Please provide a valid ${title}`;
};

export { ImportManual };
