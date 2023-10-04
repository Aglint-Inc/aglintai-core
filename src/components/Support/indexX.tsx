import {
  Autocomplete,
  AutocompleteProps,
  Checkbox,
  Chip,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { InboxContactSupport } from '@/devlink/InboxContactSupport';
import {
  JobApplcationDB,
  Public_jobsType,
  Support_ticketType,
} from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

function Support() {
  const router = useRouter();
  const [applicationId, setApplicationId] = useState<string>(null);
  const [ticketId, setTicketId] = useState<string>(null);
  const [jobDetails, setJobDetails] = useState<
    JobApplcationDB & {
      jobDetails: Public_jobsType;
    }
  >(null);
  const [details, setDetails] = useState<{
    title: string;
    type: string[];
    description: string;
    email_update: boolean;
    email: string;
  }>(null);

  useEffect(() => {
    if (router.isReady) {
      const id = router.query.id as string | null;
      if (id) {
        getApplicationDetails(id).then((data) => {
          setJobDetails(data);
          if (data?.email && data.email.trim() !== '') {
            setDetails({ ...details, email: data.email });
          }
        });
        setApplicationId(id);
      }
      // getJobTitle(id).then((data) => {
      //   setJobDetails(data);
      // });
    }
  }, [router.isReady]);
  return (
    <InboxContactSupport
      slotCheckbox={
        <Checkbox
          checked={details?.email_update}
          onChange={(e) => {
            setDetails({ ...details, email_update: e.target.checked });
          }}
        />
      }
      slotFormSupport={<AddSupportTicket {...{ details, setDetails }} />}
      textJobCompanyLocations={<>{jobDetails?.jobDetails?.company}</>}
      textJobRole={jobDetails?.jobDetails?.job_title}
      onClickReport={{
        onClick: () => {
          submitSupportTicketInDb({
            company_id: 'b064cadc-493f-40e1-83af-6eafa58c08ab',
            type: details.type,
            content: [
              {
                type: 'message',
                from: 'user',
                id: null,
                name: `${jobDetails.first_name} ${jobDetails.last_name}`,
                text: details.description,
                time_stamp: new Date().toISOString(),
              },
            ],
            job_id: jobDetails.job_id || '223892dc-5057-4fc3-968d-5df2ae5fbe52',
            title: details.title,
            user_id: null,
            user_name: `${jobDetails.first_name} ${jobDetails.last_name}`,
            application_id: applicationId,
          }).then((data) => {
            setTicketId(data.id);
          });
        },
      }}
      isTicketSubmitSuccessfully={Boolean(ticketId)}
      onClickCopyLinkToTicket={{
        onClick: () => {
          navigator.clipboard
            .writeText(`${window.location.host}/support/${ticketId}`)
            .then(() => {
              toast.message('Copied to clipboard');
            });
        },
      }}
    />
  );
}

export default Support;

const getApplicationDetails = async (id: string) => {
  const { data, error } = await supabase
    .from('job_applications')
    .select('*')
    .eq('application_id', id);
  if (!error && data.length) {
    const tempData = data[0];
    // @ts-ignore
    tempData.jobDetails = await getJobTitle(tempData.job_id);
    return tempData as unknown as JobApplcationDB & {
      jobDetails: Public_jobsType;
    };
  }
  return null;
};

const getJobTitle = async (jobId: string) => {
  const { data, error } = await supabase
    .from('public_jobs')
    .select('job_title, company')
    .eq('id', jobId);
  if (!error && data.length) {
    return data[0] as {
      company: string;
      job_title: string;
    };
  }
  return null;
};

const AddSupportTicket = ({
  details,
  setDetails,
}: {
  details: {
    title: string;
    type: string[];
    description: string;
    email_update: boolean;
    email: string;
  };
  // eslint-disable-next-line no-unused-vars
  setDetails: (x: {
    title: string;
    type: string[];
    description: string;
    email_update: boolean;
    email: string;
  }) => void;
}) => {
  return (
    <Stack gap={2} sx={{ fontFamily: 'SF Pro Text, system-ui,-apple-system' }}>
      <CustomTextField
        required
        value={details?.title}
        label='Title'
        onChange={(e) => setDetails({ ...details, title: e.target.value })}
      />
      <CustomAutocomplete
        multiple
        required
        label='Issue Type'
        defaultValues={[]}
        values={details?.type}
        options={allType}
        freeSolo
        onChange={(_, newValue) => {
          if (newValue) {
            // const tempItems = newValue.pop();
            // tempItems &&
            //   newValue.push(
            //     ...tempItems.split(',').filter((ele) => ele.trim() !== ''),
            //   );
            setDetails({
              ...details,
              type: [newValue],
            });
          }
        }}
      />
      <CustomTextField
        required
        multiline
        minRows={3}
        value={details?.description}
        label='Description'
        onChange={(e) =>
          setDetails({ ...details, description: e.target.value })
        }
      />

      {details?.email_update && (
        <CustomTextField
          required
          value={details?.email}
          label='Email'
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
        />
      )}
    </Stack>
  );
};

const CustomTextField = (rest: TextFieldProps) => {
  const { label, required, sx, ...props } = rest;
  return (
    <Stack gap={1}>
      <Typography fontFamily={'inherit'}>
        {label}
        {required && '*'}
        {/* {rest?.label && ':'} */}
      </Typography>
      {/* @ts-ignore */}
      <TextField
        {...props}
        sx={{
          ...sx,
          padding: '0px',
          '& .MuiInputBase-root': { padding: '8px' },
          '& input': { padding: '0px' },
        }}
      />
    </Stack>
  );
};
// @ts-ignore
const CustomAutocomplete = (props: AutocompleteProps) => {
  const { label, required, ...rest } = props;
  return (
    <Stack gap={1}>
      <Typography fontFamily={'inherit'}>
        {label}
        {required && '*'}
        {/* {rest?.label && ':'} */}
      </Typography>
      <Autocomplete
        {...rest}
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              key={index}
              variant='outlined'
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
            }}
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
            }}
            variant='filled'
            sx={{
              '& input': { padding: '0px!important' },
              '& .MuiInputBase-root': {
                padding: '8px 39px 8px 8px !important',
              },
            }}
          />
        )}
      />
    </Stack>
  );
};
const allType = [
  'query',
  'doubt',
  'user Experience',
  'connectivity',
  'functionality',
];

const submitSupportTicketInDb = async (
  ticketData: Partial<Support_ticketType>,
) => {
  const { data, error } = await supabase
    .from('support_ticket')
    //   @ts-ignore
    .insert(ticketData)
    .select();
  if (!error && data.length) {
    return data[0];
  }
  return null;
};
