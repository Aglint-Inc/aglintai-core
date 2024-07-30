/* eslint-disable no-useless-escape */
/* eslint-disable security/detect-unsafe-regex */
/* eslint-disable security/detect-object-injection */
import { Stack, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import UIPhoneInput from '@/src/components/Common/UIPhoneInput';
import UITextField from '@/src/components/Common/UITextField';
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

type FormField =
  | {
      value: string | any;
      error: boolean;
      validation: 'text' | 'mail' | 'phone' | 'url';
      required: boolean;
    }
  | {
      value: any;
      error: boolean;
      validation: 'file';
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

const validatePhone = (value: string) => {
  function countRept(string, regex) {
    var numbers = string?.match(regex);
    return numbers ? numbers.length : 0;
  }
  return !(
    value.trim() === '' ||
    !(
      countRept(value.trim(), /\d/g) === countRept('+.. .....-.....', /\./g) ||
      countRept(value.trim(), /\d/g) === countRept('+. ......-....', /\./g)
    )
  );
};

const ImportManual = () => {
  const [applicant, setApplicant] = useState(initialFormFields);
  const setImportPopup = useApplicationsStore(
    ({ setImportPopup }) => setImportPopup,
  );
  const { handleUploadApplication } = useJob();

  const handleValidate = () => {
    return Object.entries(applicant).reduce(
      (acc, [key, curr]) => {
        let value = curr.value;
        let error = false;
        if (
          !curr.required &&
          (value === '' || value === null || (value && value.trim() === ''))
        ) {
          return {
            ...acc,
            newApplicant: {
              ...acc.newApplicant,
              [key]: { ...acc.newApplicant[key], value: '', error },
            },
          };
        }
        switch (curr.validation) {
          case 'text':
            {
              if (value && value.trim() !== '') value = value.trim();
              else error = true;
            }
            break;
          case 'mail':
            {
              if (
                value &&
                value.trim() !== '' &&
                /([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)/g.test(
                  value.trim(),
                )
              )
                value = value.trim();
              else error = true;
            }
            break;
          case 'url':
            {
              if (
                value &&
                value.trim() !== '' &&
                /^(http(s):\/\/.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(
                  value.trim(),
                ) &&
                value.trim().toLowerCase().includes('linkedin')
              )
                value = value.trim();
              else error = true;
            }
            break;
          case 'file':
            {
              if (value === null) error = true;
            }
            break;
          case 'phone':
            {
              if (validatePhone(value)) value = value.trim();
              else error = true;
            }
            break;
        }
        return {
          newApplicant: {
            ...acc.newApplicant,
            [key]: { ...acc.newApplicant[key], value, error },
          },
          validation: error && acc.validation ? false : acc.validation,
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
          first_name: applicant.first_name.value,
          last_name: applicant.last_name.value,
          email: applicant.email.value,
          phone: applicant.phone.value,
          linkedin: applicant.linkedin.value,
        },
        file: applicant.resume.value,
      });
      setImportPopup(false);
    } else {
      setApplicant(newApplicant);
    }
  };
  return (
    <Stack style={{ background: 'white' }}>
      <FormBody applicant={applicant} setApplicant={setApplicant} />
      <Stack
        direction={'row'}
        justifyContent={'flex-end'}
        style={{ marginTop: '16px' }}
      >
        <ButtonSolid
          size={2}
          onClickButton={{ onClick: async () => await handleSubmit() }}
          textButton={'Add Candidate'}
        />
      </Stack>
    </Stack>
  );
};

type TPhone = {
  countryCode: string;
  dialCode: string;
  format: string;
  name: string;
};

const FormBody = ({
  applicant,
  setApplicant,
}: {
  applicant: FormEntries;
  setApplicant: Dispatch<SetStateAction<FormEntries>>;
}) => {
  const { userCountry } = useAuthDetails();
  const handleChange = (e, key) => {
    setApplicant((prev) => {
      return {
        ...prev,
        // eslint-disable-next-line security/detect-object-injection
        [key]: {
          ...prev[key],
          value: key === 'resume' ? e : e.target.value,
          error: false,
        },
      };
    });
  };
  return (
    <Stack gap={1.5}>
      <Stack flexDirection={'row'} gap={2}>
        <UITextField
          fullWidth
          label='First Name'
          placeholder={'First Name'}
          required
          value={applicant.first_name.value}
          error={applicant.first_name.error}
          helperText={applicant.first_name.error && getHelper('First Name')}
          onChange={(e) => handleChange(e, 'first_name')}
        />

        <UITextField
          fullWidth
          label='Last Name'
          placeholder='Last Name'
          required
          value={applicant.last_name.value}
          error={applicant.last_name.error}
          helperText={applicant.last_name.error && getHelper('Last Name')}
          onChange={(e) => handleChange(e, 'last_name')}
        />
      </Stack>
      <Stack flexDirection={'row'} gap={2}>
        <UITextField
          fullWidth
          label='Email'
          placeholder='Email'
          required
          value={applicant.email.value}
          error={applicant.email.error}
          helperText={applicant.email.error && getHelper('Email')}
          onChange={(e) => handleChange(e, 'email')}
        />
        <Stack
          width={'700px'}
          className='JobApplicationAddManuallyPhoneInput'
          sx={{
            '& .react-tel-input .form-control': {
              height: '36px !important',
              font: 'inherit',
              '&::placeholder': {
                opacity: 0.6,
                fontSize: '14px',
              },
            },
          }}
        >
          <UIPhoneInput
            label='Phone Number'
            labelSize='small'
            defaultCountry={userCountry}
            placeholder={'Phone number with country code'}
            value={applicant.phone.value}
            error={applicant.phone.error}
            required={false}
            onChange={(value, data: TPhone, event, formattedValue) => {
              handleChange({ target: { value: formattedValue } }, 'phone');
            }}
            helperText={applicant.phone.error && getHelper('Phone Number')}
          />
        </Stack>
      </Stack>
      <UITextField
        label='LinkedIn URL'
        fullWidth
        placeholder='Linkedin'
        required
        value={applicant.linkedin.value}
        error={applicant.linkedin.error}
        helperText={applicant.linkedin.error && getHelper('LinkedIn url')}
        onChange={(e) => handleChange(e, 'linkedin')}
      />
      <ResumeUploadComp
        value={applicant.resume.value}
        error={applicant.resume.error}
        handleChange={(e) => handleChange(e, 'resume')}
      />
    </Stack>
  );
};

export const ResumeUploadComp = ({
  value,
  handleChange,
  error = false,
  label = true,
}: {
  value: File;
  // eslint-disable-next-line no-unused-vars
  handleChange: (e: any) => any;
  error?: boolean;
  label?: boolean;
}) => {
  return (
    <Stack spacing={1}>
      {label && (
        <Stack flexDirection={'row'} gap={'4px'}>
          Upload Resume
          <Stack style={{ color: 'var(--error-11)' }}>*</Stack>
        </Stack>
      )}
      <Stack>
        <FileUploader handleChange={handleChange} types={fileTypes}>
          <Stack
            sx={{
              border: '1px dashed',
              borderColor: 'var(--neutral-6)',
              borderRadius: 1,
              py: '32px',
              px: '32px',
              cursor: 'pointer',
              background: 'var(--neutral-2)',
            }}
            direction='row'
            spacing={'8px'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            {value ? <FileIcon /> : <UploadIcon />}
            <Typography
              variant='body1'
              sx={{ textAlgin: 'center', fontSize: '14px' }}
              style={{
                color: error ? 'var(--error-11)' : 'inherit',
                fontWeight: value ? 500 : 400,
              }}
            >
              {value ? value.name : 'Upload candidate resume [PDF/DOCX]'}
            </Typography>
            {value && <CheckIcon />}
          </Stack>
        </FileUploader>
        {error && (
          <Stack fontSize={'0.75rem'} style={{ color: 'var(--error-11)' }}>
            Please upload the candidate resume
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

const getHelper = (title: string) => {
  return `Please provide a valid ${title}`;
};

export const FileIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M3.33464 1.66992H11.6673V5.00167C11.6673 5.92215 12.4135 6.66834 13.334 6.66834H16.668V18.3366H3.33464V1.66992ZM18.3346 18.3366L18.3346 5.87168C18.336 5.84335 18.336 5.81488 18.3346 5.7864L18.3346 5.34139C18.3283 4.90177 18.1486 4.48244 17.8346 4.17472L14.1572 0.497333C13.8555 0.189316 13.4361 0.00960148 12.9965 0.00333974L12.5807 0.0033361C12.5311 -0.0011535 12.4814 -0.00106994 12.4323 0.0033348L3.33464 0.00325522C2.41416 0.00325522 1.66797 0.749447 1.66797 1.66992V18.3366C1.66797 19.2571 2.41416 20.0033 3.33464 20.0033H16.668C17.5884 20.0033 18.3346 19.2571 18.3346 18.3366ZM15.4882 5.00248H13.3333V2.84766L15.4882 5.00248ZM14.1667 15.0026H5.83333C4.72222 15.0026 4.72222 16.6693 5.83333 16.6693H14.1667C15.2778 16.6693 15.2778 15.0026 14.1667 15.0026ZM5.83268 8.33529C5.37245 8.33529 4.99935 8.70838 4.99935 9.16862V12.502C4.99935 12.9622 5.37244 13.3353 5.83268 13.3353H14.166C14.6263 13.3353 14.9993 12.9622 14.9993 12.502V9.16862C14.9993 8.70838 14.6263 8.33529 14.166 8.33529H5.83268Z'
        fill='#2F3941'
      />
    </svg>
  );
};

export const UploadIcon = () => {
  return (
    <GlobalIcon
      iconName='cloud_upload'
      size={8}
      weight={'thin'}
      color='neutral-11'
    />
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
  );
};

export const CheckIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M8 0C3.58667 0 0 3.58667 0 8C0 12.4133 3.58667 16 8 16C12.4133 16 16 12.4133 16 8C16 3.58667 12.4133 0 8 0ZM12.5878 6.58781L7.92115 11.2545C7.76115 11.4145 7.54781 11.4945 7.33448 11.4945C7.12115 11.4945 6.90781 11.4145 6.74781 11.2545L4.08115 8.58781C3.76115 8.26781 3.76115 7.73448 4.08115 7.41448C4.40115 7.09448 4.93448 7.09448 5.25448 7.41448L7.33448 9.49448L11.4145 5.41448C11.7345 5.09448 12.2678 5.09448 12.5878 5.41448C12.9211 5.73448 12.9211 6.26781 12.5878 6.58781Z'
        fill='#228F67'
      />
    </svg>
  );
};

export { ImportManual };
