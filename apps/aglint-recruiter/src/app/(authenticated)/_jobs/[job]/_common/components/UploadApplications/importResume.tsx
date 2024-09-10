/* eslint-disable security/detect-object-injection */
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import { useApplicationsActions, useJob } from '@/job/hooks';
import toast from '@/utils/toast';
import { Button } from '@components/ui/button';
import { File, FileText, Plus, Upload, X } from 'lucide-react';
import { Card } from '@components/ui/card';

export const ImportResume = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { handleUploadResume } = useJob();
  const { setImportPopup } = useApplicationsActions();

  const handleInputChange = (files) => {
    // --For Multiple File Input
    const images = [];
    const uploadedFileNames = selectedFiles.map((file) => file.name);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type.includes('csv')) {
        toast.error(
          'Invalid file type. Please select a .pdf, .docx, or .txt file.',
        );
      } else {
        if (!uploadedFileNames.includes(file.name)) {
          images.push(file);

          setSelectedFiles((preValue) => {
            return [...preValue, file];
          });
        }
      }
    }
  };

  const handleDeleteFile = (index) => {
    const result = selectedFiles.filter((_data, i) => i !== index);
    setSelectedFiles(result);
  };

  const handleFileUpload = () => {
    handleUploadResume({ files: selectedFiles });
    setImportPopup(false);
  };

  return (
    <div className='p-4'>
      <Card className='p-6'>
        {selectedFiles.length === 0 ? (
          <FileUploader
            maxSize={4}
            onSizeError={(file) =>
              file.size > 4
                ? null
                : toast.error('Please upload resumes that are less than 4 MB.')
            }
            handleChange={handleInputChange}
            multiple={true}
            name='file'
            types={fileTypes}
          >
            <div className='h-[398px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg'>
              <div className='text-center'>
                <Upload className='mx-auto h-12 w-12 text-gray-400' />
                <h3 className='mt-2 text-sm font-semibold text-gray-900'>
                  Import Resume
                </h3>
                <p className='mt-1 text-sm text-gray-500'>
                  Drag and drop or click to upload
                </p>
              </div>
            </div>
          </FileUploader>
        ) : (
          <div className='space-y-4'>
            <div className='space-y-2'>
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between p-2 bg-gray-50 rounded-md'
                >
                  {file.type.includes('pdf') ? (
                    <FileText className='h-5 w-5 text-blue-500' />
                  ) : (
                    <File className='h-5 w-5 text-green-500' />
                  )}
                  <span className='flex-1 ml-2 truncate'>{file.name}</span>
                  <span className='text-sm text-gray-500'>
                    {convertBytesToKB(file.size)}
                  </span>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => handleDeleteFile(index)}
                    className='ml-2'
                  >
                    <X className='h-4 w-4' />
                  </Button>
                </div>
              ))}
            </div>
            <div className='flex justify-between items-center'>
              <FileUploader
                handleChange={handleInputChange}
                multiple={true}
                name='file'
                types={fileTypes}
                maxSize={4.5}
                onSizeError={(file) =>
                  file.size > 4
                    ? null
                    : toast.error(
                        'Please upload resumes that are less than 4 MB.',
                      )
                }
              >
                <Button variant='outline' size='sm'>
                  <Plus className='h-4 w-4 mr-2' />
                  Add More Resume
                </Button>
              </FileUploader>
              <span className='text-sm text-gray-500'>
                {selectedFiles.length} documents
              </span>
            </div>
            <div className='flex justify-end'>
              <Button onClick={handleFileUpload}>Upload</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export const candidateDatabaseSampleJob = () => {
  return {
    job_title: 'Candidate Database',
    is_campus: true,
  };
};

export const fileTypes = ['PDF', 'DOCX', 'TXT'];
