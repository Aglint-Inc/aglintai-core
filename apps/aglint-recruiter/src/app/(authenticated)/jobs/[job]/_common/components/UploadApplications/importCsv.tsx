import { useToast } from '@components/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { FileText, Upload } from 'lucide-react';
import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import { Loader } from '@/components/Common/Loader';
import { UIButton } from '@/components/Common/UIButton';
import { useApplicationsActions, useJob } from '@/job/hooks';

type Candidate = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  linkedin: string;
  file_url: string;
  avatar: string;
};

export const ImportCsv: React.FC = () => {
  const { handleUploadCsv } = useJob();
  const { setImportPopup } = useApplicationsActions();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (file: File) => {
    if (!file) return;

    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result as string;
      const lines = content.split('\n');
      const headers = lines[0].split(',');

      if (!validateHeaders(headers)) {
        toast({ title: 'Invalid CSV headers' });
        setIsLoading(false);
        return;
      }

      const parsedCandidates = lines
        .slice(1)
        .map((line) => {
          const values = line.split(',');
          return headers.reduce((obj, header, index) => {
            obj[header.trim()] = values[index]?.trim();
            return obj;
          }, {} as Candidate);
        })
        .filter((candidate) => candidate.first_name && candidate.email);

      setCandidates(parsedCandidates);
      setIsLoading(false);
    };

    reader.readAsText(file);
  };

  const validateHeaders = (headers: string[]): boolean => {
    const requiredHeaders = ['first_name', 'last_name', 'email', 'phone'];
    return requiredHeaders.every((header) => headers.includes(header));
  };

  const handleImport = async () => {
    try {
      const formattedCandidates = candidates.map((candidate) => {
        return {
          ...candidate,
          linkedin: candidate.linkedin || '',
          file_url: candidate.file_url,
          avatar: candidate.avatar,
        };
      });
      await handleUploadCsv({ candidates: formattedCandidates });
      setImportPopup(false);
    } catch {
      //
    }
  };

  return (
    <div className='flex h-[500px] flex-col border-0 shadow-none'>
      <div className='flex-grow overflow-auto'>
        {isLoading ? (
          <Loader />
        ) : candidates.length ? (
          <div className='flex flex-col gap-2'>
            <CandidatesListTable candidates={candidates} />
            <div className='flex items-center justify-between overflow-hidden'>
              <label
                htmlFor='file-upload'
                className='flex cursor-pointer items-center justify-center rounded-md border border-border bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50'
              >
                <Upload className='mr-2 h-5 w-5 text-gray-400' />
                Re-Upload
                <input
                  id='file-upload'
                  type='file'
                  className='hidden'
                  accept='.csv'
                  onChange={(event) =>
                    handleFileUpload(
                      (
                        event.target as React.ChangeEvent<HTMLInputElement>['target']
                      ).files[0],
                    )
                  }
                />
              </label>
              {candidates.length > 0 && (
                <p className='text-center text-sm text-gray-600'>{`Listing ${candidates.length} candidates`}</p>
              )}
            </div>
          </div>
        ) : (
          <div className='flex h-full flex-col'>
            <div className='flex-grow overflow-auto'>
              <FileUploader
                handleChange={(
                  file: React.ChangeEvent<HTMLInputElement>['target']['files'][number],
                ) => {
                  handleFileUpload(file);
                }}
              >
                <div className='flex h-[450px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-slate-50 text-center'>
                  <FileText
                    className='mx-auto mb-4 h-12 w-12'
                    strokeWidth={1.5}
                  />
                  <p className='text-muted-foreground'>
                    Upload a CSV file to import candidates
                  </p>
                </div>
              </FileUploader>
            </div>
          </div>
        )}
      </div>
      <div className=''>
        <UIButton
          onClick={handleImport}
          disabled={candidates.length === 0}
          className='w-full'
        >
          Import
        </UIButton>
      </div>
    </div>
  );
};

const CandidatesListTable: React.FC<{ candidates: Candidate[] }> = ({
  candidates,
}) => (
  <div className='max-h-[330px] overflow-auto'>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {candidates.map((candidate, index) => (
          <TableRow key={index}>
            <TableCell>{`${candidate.first_name} ${candidate.last_name}`}</TableCell>
            <TableCell>{candidate.email}</TableCell>
            <TableCell>{candidate.phone}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);
