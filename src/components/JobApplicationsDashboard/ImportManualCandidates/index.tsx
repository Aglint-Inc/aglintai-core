import { useJobApplications } from '@context/JobApplicationsContext';
import { Stack, TextField, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Dispatch, SetStateAction, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import { ButtonTextGrey } from '@/devlink';
import { ButtonOutlinedSmall } from '@/devlink/ButtonOutlinedSmall';
import { SelectedPopup } from '@/devlink2';
import { palette } from '@/src/context/Theme/Theme';

// type ApplicantInfo = {
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone: string;
//   status: string;
//   linkedin?: string;
//   resume?: string;
//   score: number;
//   job_title: string;
//   company: string;
//   profile_image: string;
// };

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
  value: string;
  error: boolean;
  validation: 'text' | 'mail' | 'phone' | 'url';
};

const initialFormField: FormField = {
  value: null,
  error: false,
  validation: 'text',
};

const initialFormFields: FormEntries = {
  first_name: initialFormField,
  last_name: initialFormField,
  email: { ...initialFormField, validation: 'mail' },
  phone: { ...initialFormField, validation: 'phone' },
  linkedin: { ...initialFormField, validation: 'url' },
  resume: { ...initialFormField, validation: 'url' },
  status: { ...initialFormField, value: 'applied' },
};

const ImportManualCandidates = () => {
  const { setOpenManualImportCandidates } = useJobApplications();
  const [applicant, setApplicant] = useState(initialFormFields);
  const handleValidate = () => {
    setApplicant((prev) => {
      return Object.entries(prev).reduce((acc, [key, curr]) => {
        let value = curr.value;
        let error = false;
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
                // eslint-disable-next-line security/detect-unsafe-regex, no-useless-escape
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
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
                // eslint-disable-next-line security/detect-unsafe-regex, no-useless-escape
                /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(
                  value.trim(),
                )
              )
                value = value.trim();
              else error = true;
            }
            break;
          case 'phone': {
            if (
              value &&
              value.trim() !== '' &&
              // eslint-disable-next-line security/detect-unsafe-regex, no-useless-escape
              /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(value.trim())
            )
              value = value.trim();
            else error = true;
          }
        }
        // eslint-disable-next-line security/detect-object-injection
        return { ...acc, [key]: { ...acc[key], value, error } };
      }, prev);
    });
  };
  return (
    <SelectedPopup
      onClickClose={{ onClick: () => setOpenManualImportCandidates(false) }}
      slotTitle={
        <Stack fontWeight={600} fontSize={'18px'}>
          Add Candidate
        </Stack>
      }
      slotBody={<FormBody applicant={applicant} setApplicant={setApplicant} />}
      slotButtons={
        <>
          <ButtonTextGrey
            buttonText={'Cancel'}
            onClickCancel={{
              onClick: () => setOpenManualImportCandidates(false),
            }}
          />
          <ButtonOutlinedSmall
            textLabel={'Add'}
            onClickButton={{ onClick: () => handleValidate() }}
          />
        </>
      }
    />
  );
};

const FormBody = ({
  applicant,
  setApplicant,
}: {
  applicant: FormEntries;
  setApplicant: Dispatch<SetStateAction<FormEntries>>;
}) => {
  const fileTypes = ['PDF', 'DOCX', 'TXT'];
  const handleChange = (e, key) => {
    setApplicant((prev) => {
      return {
        ...prev,
        // eslint-disable-next-line security/detect-object-injection
        [key]: { ...prev[key], value: e.target.value, error: false },
      };
    });
  };
  return (
    <Stack gap={3}>
      <Stack flexDirection={'row'} gap={3}>
        <TextField
          margin='none'
          label={'First name'}
          fullWidth
          required
          id={'first_name'}
          value={applicant.first_name.value}
          error={applicant.first_name.error}
          helperText={applicant.first_name.error && getHelper('first name')}
          onChange={(e) => handleChange(e, 'first_name')}
        />
        <TextField
          margin='none'
          label={'Last name'}
          fullWidth
          required
          id={'last_name'}
          value={applicant.last_name.value}
          error={applicant.last_name.error}
          helperText={applicant.last_name.error && getHelper('last name')}
          onChange={(e) => handleChange(e, 'last_name')}
        />
      </Stack>
      <Stack flexDirection={'row'} gap={2}>
        <TextField
          margin='none'
          label={'Email'}
          fullWidth
          required
          id={'email'}
          value={applicant.email.value}
          error={applicant.email.error}
          helperText={applicant.email.error && getHelper('email')}
          onChange={(e) => handleChange(e, 'email')}
        />
        <TextField
          margin='none'
          label={'Phone number'}
          fullWidth
          required
          id={'phone_number'}
          value={applicant.phone.value}
          error={applicant.phone.error}
          helperText={applicant.phone.error && getHelper('phone number')}
          onChange={(e) => handleChange(e, 'phone')}
        />
      </Stack>
      <TextField
        margin='none'
        label={'LinkedIn url'}
        fullWidth
        id={'linkedin'}
        value={applicant.linkedin.value}
        error={applicant.linkedin.error}
        helperText={applicant.linkedin.error && getHelper('LinkedIn url')}
        onChange={(e) => handleChange(e, 'linkedin')}
      />
      <FileUploader
        //   handleChange={uploadFile}
        name='file'
        types={fileTypes}
      >
        <Stack
          sx={{
            border: '1px dashed',
            borderColor: palette.grey[600],
            borderRadius: 1,
            py: '40px',
            px: '20px',
            cursor: 'pointer',
            background: '#fff',
          }}
          direction='row'
          spacing={2}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
          >
            <path
              d='M1 14.5C1 12.1716 2.22429 10.1291 4.06426 8.9812C4.56469 5.044 7.92686 2 12 2C16.0731 2 19.4353 5.044 19.9357 8.9812C21.7757 10.1291 23 12.1716 23 14.5C23 17.9216 20.3562 20.7257 17 20.9811L7 21C3.64378 20.7257 1 17.9216 1 14.5ZM16.8483 18.9868C19.1817 18.8093 21 16.8561 21 14.5C21 12.927 20.1884 11.4962 18.8771 10.6781L18.0714 10.1754L17.9517 9.23338C17.5735 6.25803 15.0288 4 12 4C8.97116 4 6.42647 6.25803 6.0483 9.23338L5.92856 10.1754L5.12288 10.6781C3.81156 11.4962 3 12.927 3 14.5C3 16.8561 4.81833 18.8093 7.1517 18.9868L7.325 19H16.675L16.8483 18.9868ZM13 13V17H11V13H8L12 8L16 13H13Z'
              fill='#2F3941'
            />
          </svg>
          <Typography variant='body2' sx={{ textAlgin: 'center' }}>
            {/* {file
              ? `Uploaded File: ${file?.name}`
              :  */}
            Please upload your resume in PDF or DOC format.
          </Typography>
        </Stack>
      </FileUploader>
      <Stack fontWeight={600} fontSize={'14px'}>
        Choose Applicant Status
      </Stack>
      <Select
        id='status'
        value={applicant.status.value}
        error={applicant.status.error}
        placeholder={'Status'}
        onChange={(e) => handleChange(e, 'status')}
      >
        <MenuItem value={'applied'}>Applied</MenuItem>
        <MenuItem value={'interviewing'}>Interviewing</MenuItem>
        <MenuItem value={'selected'}>Selected</MenuItem>
        <MenuItem value={'rejected'}>Rejected</MenuItem>
      </Select>
    </Stack>
  );
};

const getHelper = (title: string) => {
  return `Please provide a valid ${title}`;
};

export default ImportManualCandidates;
