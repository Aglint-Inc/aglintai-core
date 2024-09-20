import { Button } from '@components/ui/button';
import { File, FileText, Plus, Upload, X } from 'lucide-react';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import { useApplicationsActions, useJob } from '@/job/hooks';
import toast from '@/utils/toast';

const MAX_FILE_SIZE = 4;
const FILE_TYPES = ['PDF', 'DOCX', 'TXT'];

export const ImportResume = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { handleUploadResume } = useJob();
  const { setImportPopup } = useApplicationsActions();

  const handleInputChange = (files: FileList) => {
    const newFiles = Array.from(files).filter((file: File) => {
      if (file.type.includes('csv')) {
        toast.error(
          'Invalid file type. Please select a .pdf, .docx, or .txt file.',
        );
        return false;
      }
      return !selectedFiles.some(
        (existingFile: File) => existingFile.name === file.name,
      );
    });

    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDeleteFile = (index) => {
    setSelectedFiles((files) => files.filter((_, i) => i !== index));
  };

  const handleFileUpload = async () => {
    try {
      await handleUploadResume({ files: selectedFiles });
      setImportPopup(false);
    } catch {
      //
    }
  };

  const formatFileSize = (bytes) => {
    const units = ['B', 'KB', 'MB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };

  const renderFileUploader = () => (
    <FileUploader
      maxSize={MAX_FILE_SIZE}
      onSizeError={() =>
        toast.error(
          `Please upload resumes that are less than ${MAX_FILE_SIZE} MB.`,
        )
      }
      handleChange={handleInputChange}
      multiple={true}
      name='file'
      types={FILE_TYPES}
    >
      <div className='flex h-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300'>
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
  );

  const renderFileList = () => (
    <div className='space-y-4'>
      <div className='max-h-[300px] space-y-2 overflow-auto'>
        {selectedFiles.map((file, index) => (
          <div
            key={index}
            className='flex items-center justify-between rounded-md bg-gray-50 p-2'
          >
            {file.type.includes('pdf') ? (
              <FileText className='h-5 w-5 text-blue-500' />
            ) : (
              <File className='h-5 w-5 text-green-500' />
            )}
            <span className='ml-2 flex-1 truncate'>{file.name}</span>
            <span className='text-sm text-gray-500'>
              {formatFileSize(file.size)}
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
      <div className='flex items-center justify-between'>
        <FileUploader
          handleChange={handleInputChange}
          multiple={true}
          name='file'
          types={FILE_TYPES}
          maxSize={MAX_FILE_SIZE}
          onSizeError={() =>
            toast.error(
              `Please upload resumes that are less than ${MAX_FILE_SIZE} MB.`,
            )
          }
        >
          <Button variant='outline' size='sm'>
            <Plus className='mr-2 h-4 w-4' />
            Add More Resume
          </Button>
        </FileUploader>
        <span className='text-sm text-gray-500'>
          {selectedFiles.length} Resumes
        </span>
      </div>
    </div>
  );

  return (
    <div className='flex h-[500px] flex-col'>
      <div className='flex-grow overflow-auto p-6'>
        {selectedFiles.length === 0 ? renderFileUploader() : renderFileList()}
      </div>
      <div className='p-4'>
        <Button onClick={handleFileUpload} className='w-full'>
          Upload
        </Button>
      </div>
    </div>
  );
};

export const candidateDatabaseSampleJob = () => ({
  job_title: 'Candidate Database',
  is_campus: true,
});

export const fileTypes = FILE_TYPES;
