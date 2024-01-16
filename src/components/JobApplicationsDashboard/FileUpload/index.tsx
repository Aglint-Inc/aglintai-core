/* eslint-disable security/detect-object-injection */
import { Paper, Stack, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import posthog from 'posthog-js';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import { ImportResume, LoaderSvg } from '@/devlink';
import AUIButton from '@/src/components/Common/AUIButton';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import toast from '@/src/utils/toast';

import useUploadCandidate from '../ImportManualCandidates/hooks';

const ResumeUpload = ({ setOpenSidePanel }) => {
  const [selectedfile, setSelectedFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const { handleJobApplicationRefresh } = useJobApplications();
  const { handleBulkResumeUpload } = useUploadCandidate();

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
    setLoading(true);
    const { confirmation } = await handleBulkResumeUpload(selectedfile);
    setLoading(false);
    setSelectedFile([]);
    setOpenSidePanel(false);
    if (confirmation) {
      await handleJobApplicationRefresh();
      posthog.capture('ADD candidates using resume');
    }
  };

  return (
    <>
      <Stack spacing={2} height={'100%'} overflow={'auto'} p={'1px'}>
        {selectedfile.length == 0 && (
          <FileUploader
            handleChange={InputChange}
            multiple={true}
            name='file'
            types={fileTypes}
          >
            <Stack height={'398px'}>
              <ImportResume />
            </Stack>
          </FileUploader>
        )}
        {selectedfile.length !== 0 && (
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
                          Modified Time :{' '}
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
        )}

        {selectedfile.length !== 0 && (
          <Stack direction={'row'} justifyContent={'flex-end'}>
            <AUIButton
              disabled={loading}
              onClick={() => {
                FileUploadSubmit();
              }}
            >
              Upload
            </AUIButton>
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default ResumeUpload;

export const candidateDatabaseSampleJob = () => {
  return {
    job_title: 'Candidate Database',
    is_campus: true,
  };
};

export const fileTypes = ['PDF', 'DOCX', 'TXT'];
