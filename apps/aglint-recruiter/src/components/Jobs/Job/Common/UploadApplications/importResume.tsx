/* eslint-disable security/detect-object-injection */
import { Stack } from '@mui/material';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { ImportResume as ImportResumeDev } from '@/devlink/ImportResume';
import { UploadedResume } from '@/devlink/UploadedResume';
import { UploadedResumeList } from '@/devlink/UploadedResumeList';
import { useApplicationsStore } from '@/src/context/ApplicationsContext/store';
import { useJob } from '@/src/context/JobContext';
import toast from '@/src/utils/toast';

const ImportResume = () => {
  const [selectedfile, setSelectedFile] = useState([]);
  const { handleUploadResume } = useJob();
  const setImportPopup = useApplicationsStore(
    ({ setImportPopup }) => setImportPopup,
  );

  const InputChange = (files) => {
    // --For Multiple File Input
    let images = [];
    let uploadedFileNames = selectedfile.map((file) => file.name);

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

  const FileUploadSubmit = () => {
    handleUploadResume({ files: selectedfile });
    setImportPopup(false);
  };

  return (
    <>
      <Stack spacing={2} height={'100%'} p={'1px'}>
        {selectedfile.length == 0 && (
          <FileUploader
            maxSize={4}
            onSizeError={(file: any) =>
              file.size > 4
                ? null
                : toast.error('Please upload resumes that are less than 4 MB.')
            }
            handleChange={InputChange}
            multiple={true}
            name='file'
            types={fileTypes}
          >
            <Stack height={'398px'}>
              <ImportResumeDev />
            </Stack>
          </FileUploader>
        )}
        {selectedfile.length !== 0 && (
          <Stack spacing={2} position={'relative'}>
            <Stack spacing={2}>
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
                      maxSize={4.5}
                      onSizeError={(file: any) =>
                        file.size > 4
                          ? null
                          : toast.error(
                              'Please upload resumes that are less than 4 MB.',
                            )
                      }
                    >
                      <Stack style={{ fontWeight: '400' }}>
                        <ButtonGhost size={2} textButton='Add More Resume' />
                      </Stack>
                    </FileUploader>
                  }
                  textCountDocument={selectedfile.length + ' documents'}
                  slotPrimaryButton={
                    selectedfile.length !== 0 && (
                      <Stack direction={'row'} justifyContent={'flex-end'}>
                        <ButtonSolid
                          textButton='Upload'
                          size={2}
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

export { ImportResume };

export const candidateDatabaseSampleJob = () => {
  return {
    job_title: 'Candidate Database',
    is_campus: true,
  };
};

export const fileTypes = ['PDF', 'DOCX', 'TXT'];
