/* eslint-disable security/detect-object-injection */
import {
  LinearProgress,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import { LoaderSvg } from '@/devlink';
import AUIButton from '@/src/components/Common/AUIButton';
import { fileTypes } from '@/src/components/JobPost/UploadDB';
import { useJobs } from '@/src/context/JobsContext';
import { palette } from '@/src/context/Theme/Theme';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

const FileUpload = ({ setOpenSidePanel }) => {
  const [selectedfile, setSelectedFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const { jobsData, handleApplicationsRead } = useJobs();

  const InputChange = (files) => {
    // --For Multiple File Input
    let images = [];
    let uploadedFileNames = selectedfile.map((file) => file.filename);

    for (let i = 0; i < files.length; i++) {
      let file = files[i];

      if (file.type.includes('csv')) {
        toast.error(
          'Invalid file type. Please select a .pdf, .docx, or .txt file.',
        );
      } else {
        if (!uploadedFileNames.includes(file.name)) {
          images.push(file);

          setSelectedFile((preValue) => {
            return [...preValue, file];
          });
        }
      }
    }
  };

  const DeleteSelectFile = (name) => {
    const result = selectedfile.filter((data) => data.name !== name);
    setSelectedFile(result);
  };

  const FileUploadSubmit = async () => {
    let candidateDatabaseJob = jobsData.jobs.filter((job) => job.is_campus);

    if (candidateDatabaseJob?.length > 0) {
      setLoading(true);
      for (const [ind, file] of selectedfile.entries()) {
        let uploadUrl = await uploadResume(file);

        try {
          const res = await axios.post(
            'https://us-central1-aglint-cloud-381414.cloudfunctions.net/pdf_docx_to_text',
            { url: uploadUrl, json_parse: false },
          );

          if (res.status === 200 && res.data.data.text) {
            const emailExist = jobsData.applications.filter(
              (app) => app.email === details.email,
            );
            let details;
            let embedding;
            if (emailExist.length === 0) {
              details = await extractDetails(res.data.data.text, ind);
              embedding = await createEmbeddings(res.data.data.text);
            }
            if (embedding && details) {
              if (candidateDatabaseJob.length > 0) {
                await supabase
                  .from('job_applications')
                  .insert({
                    first_name: details.name || `Resume ${ind}`,
                    last_name: '',
                    email: details.email || '',
                    job_id: candidateDatabaseJob[0].id,
                    embedding: embedding as any,
                    job_location: details.location || null,
                    job_title: details.current_job_title || null,
                    linkedin: details.linkedin || null,
                    phone: details.phone || null,
                  })
                  .select();
              }
            }
          }
        } catch (error) {
          // Handle errors, if needed
        }
      }
      await handleApplicationsRead(jobsData.jobs.map((job) => job.id));
      setLoading(false);
      setSelectedFile([]);
      setOpenSidePanel(false);
    }
  };

  const createEmbeddings = async (text) => {
    if (text) {
      const input = text.replace(/\n/g, ' ');
      const response = await axios.post('/api/ai/create-embeddings', {
        text: input,
      });
      if (response.status === 200) {
        const embedding = Array.from(response.data.data[0].embedding);
        return embedding;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  const uploadResume = async (file) => {
    const { data } = await supabase.storage
      .from('resume-job-post')
      .upload(
        `public/${new Date().toISOString().trim() + file.name.toLowerCase()}`,
        file,
        {
          cacheControl: '3600',
          // Overwrite file if it exist
          upsert: true,
        },
      );
    let uploadUrl = `${
      process.env.NEXT_PUBLIC_SUPABASE_URL
    }/storage/v1/object/public/resume-job-post/${data?.path}?t=${new Date().toISOString()}`;
    return uploadUrl;
  };

  const extractDetails = async (text: string, ind: number) => {
    try {
      const response = await axios.post('/api/extract-openai', {
        text: `Extract details from the given resume text and provide a response in the following parsable JSON format:
                    {
                    "email": "",
                    "gender": "",
                    "location": "",
                    "linkedin": "",
                    "name": "",
                    "phone": "",
                    "current_job_title":"",
                    "languages": [],
                    "skills": []
                    }
                    Here is the text to parse: ${text}`,
      });
      return JSON.parse(response.data.choices[0].text);
    } catch (error) {
      return {
        email: '',
        gender: '',
        location: null,
        linkedin: null,
        name: `Resume ${ind}`,
        phone: '',
        languages: [],
        skills: [],
        job_title: null,
      };
    }
  };

  return (
    <>
      {loading && <LinearProgress color='info' />}
      <Stack
        width={{ sm: '300px', md: '500px' }}
        p={2}
        height={'100vh'}
        spacing={2}
      >
        <FileUploader
          handleChange={InputChange}
          multiple={true}
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
            Drag and drop your resumes in .pdf or .docx or .txt format.
          </Stack>
        </FileUploader>
        {/* <div>
          <label
            htmlFor='fileupload'
            style={{
              cursor: 'pointer',
              borderRadius: '4px',
            }}
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
              Drag and drop your resumes in .pdf or .docx or .txt format.
            </Stack>
          </label>
          <input
            type='file'
            id='fileupload'
            className='file-upload-input'
            onChange={InputChange}
            multiple
            accept='.pdf, .docx, .txt'
            style={{ display: 'none' }}
          />
        </div> */}

        <Stack spacing={2} overflow={'scroll'} position={'relative'}>
          {loading && (
            <Stack
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 2,
              }}
              alignItems={'center'}
            >
              <LoaderSvg />
              <Typography variant='h5' textAlign={'center'}>
                Please dont close drawer or reload while uploading
              </Typography>
            </Stack>
          )}

          <Stack
            spacing={2}
            sx={{
              pointerEvents: loading ? 'none' : 'auto',
              opacity: loading ? 0.5 : 1,
            }}
          >
            {selectedfile.map((data, index) => {
              const { name, type, lastModifiedDate, size } = data;
              return (
                <Paper
                  sx={{
                    p: 2,
                  }}
                  key={index}
                >
                  <Stack spacing={1}>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                      <Tooltip title={name}>
                        <Typography variant='h5' className='one-line-clamp'>
                          {name}
                        </Typography>
                      </Tooltip>

                      <Typography variant='caption'>{type}</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={2}>
                      <Typography variant='body2'>Size : {size}</Typography>
                      <Typography variant='body2'>
                        {dayjs(lastModifiedDate).format('MMM D, YYYY h:mm A')}
                      </Typography>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'flex-end'}>
                      <Typography
                        sx={{ cursor: 'pointer' }}
                        variant='caption'
                        color={'error.main'}
                        component={'span'}
                        onClick={() => DeleteSelectFile(name)}
                      >
                        Delete
                      </Typography>
                    </Stack>
                  </Stack>
                </Paper>
              );
            })}
          </Stack>
        </Stack>

        {selectedfile.length !== 0 && (
          <AUIButton
            disabled={loading}
            onClick={() => {
              FileUploadSubmit();
            }}
          >
            Upload
          </AUIButton>
        )}
      </Stack>
    </>
  );
};

export default FileUpload;

export const candidateDatabaseSampleJob = () => {
  return {
    job_title: 'Candidate Database',
    is_campus: true,
  };
};
