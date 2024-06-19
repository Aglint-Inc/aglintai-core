/* eslint-disable security/detect-object-injection */
import { Stack } from '@mui/material';
import posthog from 'posthog-js';
import { Dispatch, SetStateAction, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import { AddMoreResumeButton } from '@/devlink/AddMoreResumeButton';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { ImportResume } from '@/devlink/ImportResume';
import { LoaderSvg } from '@/devlink/LoaderSvg';
import { UploadedResume } from '@/devlink/UploadedResume';
import { UploadedResumeList } from '@/devlink/UploadedResumeList';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import toast from '@/src/utils/toast';

import useUploadCandidate from '../ImportManualCandidates/hooks';

const ResumeUpload = ({
  setOpenImportCandidates,
}: {
  setOpenImportCandidates: Dispatch<SetStateAction<boolean>>;
}) => {
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

  const DeleteSelectFile = (index) => {
    const result = selectedfile.filter((data, i) => i !== index);
    setSelectedFile(result);
  };

  const FileUploadSubmit = async () => {
    setLoading(true);
    const { confirmation } = await handleBulkResumeUpload(selectedfile);
    setLoading(false);
    setSelectedFile([]);
    setOpenImportCandidates(false);
    if (confirmation) {
      await handleJobApplicationRefresh();
      posthog.capture('ADD candidates using resume');
    }
  };

  return (
    <>
      <Stack spacing={2} height={'100%'} p={'1px'}>
        {selectedfile.length == 0 && (
          <FileUploader
            maxSize={5}
            onSizeError={(file: any) =>
              file.size > 5
                ? null
                : toast.error('Please upload a resume that is less than 5 MB.')
            }
            handleChange={InputChange}
            multiple={true}
            name='file'
            types={fileTypes}
          >
            <Stack>
              <ImportResume />
            </Stack>
          </FileUploader>
        )}
        {selectedfile.length !== 0 && (
          <Stack spacing={2} position={'relative'}>
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
              <>
                <UploadedResume
                  slotUploadResumeList={selectedfile.map((data, index) => {
                    const { name, type, size } = data;
                    function convertBytesToKB(bytes) {
                      if (Math.floor(bytes / (1024 * 1024))) {
                        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
                      }
                      return (bytes / 1024).toFixed(2) + ' KB';
                    }

                    return (
                      <UploadedResumeList
                        isDocVisible={!type.includes('pdf')}
                        isPdfIconVisible={type.includes('pdf')}
                        textSize={convertBytesToKB(size)}
                        key={index}
                        textName={name}
                        onClickDelete={{
                          onClick: () => DeleteSelectFile(index),
                        }}
                      />
                    );
                  })}
                  slotSecondaryButton={
                    <FileUploader
                      handleChange={InputChange}
                      classes='outline-none'
                      multiple={true}
                      name='file'
                      types={fileTypes}
                      maxSize={5}
                      onSizeError={(file: any) =>
                        file.size > 5
                          ? null
                          : toast.error(
                              'Please upload a resume that is less than 5 MB.',
                            )
                      }
                    >
                      <Stack style={{ fontWeight: '400' }}>
                        <AddMoreResumeButton />
                      </Stack>
                    </FileUploader>
                  }
                  textCountDocument={selectedfile.length + ' documents'}
                  slotPrimaryButton={
                    selectedfile.length !== 0 && (
                      <Stack direction={'row'} justifyContent={'flex-end'}>
                        <ButtonSolid
                          size={2}
                          textButton='Upload'
                          isDisabled={loading}
                          onClickButton={{
                            onClick: () => {
                              FileUploadSubmit();
                            },
                          }}
                        />
                      </Stack>
                    )
                  }
                />
              </>
            </Stack>
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
