import { Button } from '@components/ui/button';
import { ScrollArea } from '@components/ui/scroll-area';
import { File, FileText, Plus, Upload, X } from 'lucide-react';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import { useApplicationsActions, useJob } from '@/job/hooks';
import toast from '@/utils/toast';

const MAX_FILE_SIZE = 4;
const FILE_TYPES = ['PDF', 'DOCX', 'TXT'];

export const ImportResume = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { handleUploadResume } = useJob();
  const { setImportPopup } = useApplicationsActions();
  const [loading, setLoading] = useState(false);

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

  const handleDeleteFile = (index: number) => {
    setSelectedFiles((files) => files.filter((_, i) => i !== index));
  };

  const handleFileUpload = async () => {
    if (!loading) {
      try {
        setLoading(true);
        await handleUploadResume({ files: selectedFiles });
        setImportPopup(false);
      } catch {
        //
      } finally {
        setLoading(false);
      }
    }
  };

  const formatFileSize = (bytes: number) => {
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
      <div className='flex h-full items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted'>
        <div className='text-center'>
          <Upload strokeWidth={1.5} className='mx-auto h-12 w-12' />
          <h3 className='mt-2 text-sm font-semibold text-muted-foreground'>
            Import Resume
          </h3>
          <p className='mt-1 text-sm text-muted-foreground'>
            Drag and drop or click to upload
          </p>
        </div>
      </div>
    </FileUploader>
  );

  const renderFileList = () => (
    <div className='flex h-full flex-col content-between'>
      <ScrollArea className='h-[450px]'>
        {selectedFiles.map((file, index) => (
          <div
            key={index}
            className='mb-2 flex items-center justify-between rounded-md bg-muted p-2'
          >
            {file.type.includes('pdf') ? (
              <FileText className='h-5 w-5 text-blue-500' />
            ) : (
              <File className='h-5 w-5 text-green-500' />
            )}
            <span className='ml-2 flex-1 truncate'>{file.name}</span>
            <span className='text-sm text-muted-foreground'>
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
        ))}{' '}
      </ScrollArea>
      <div className='mt-[10px] flex items-center justify-between'>
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
          <Button variant='outline' size='md'>
            <Plus className='mr-2 h-4 w-4' />
            Add More Resume
          </Button>
        </FileUploader>
        <span className='text-sm text-muted-foreground'>
          {selectedFiles.length} Resumes
        </span>
      </div>
    </div>
  );

  return (
    <div className='flex h-[550px] flex-col'>
      <div className='mb-4 h-full flex-grow overflow-auto'>
        {selectedFiles.length === 0 ? renderFileUploader() : renderFileList()}
      </div>
      <div>
        <Button
          onClick={handleFileUpload}
          disabled={selectedFiles.length === 0 || loading}
          className='w-full'
        >
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
