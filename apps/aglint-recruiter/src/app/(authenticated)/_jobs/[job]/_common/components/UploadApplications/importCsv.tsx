import { useToast } from '@components/hooks/use-toast';
import { Button } from '@components/ui/button';
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

import { useApplicationsActions, useJob } from '@/job/hooks';

type Candidate = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  linkedin: string;
  file_url: string;
};

export const ImportCsv: React.FC = () => {
  const { handleUploadCsv } = useJob();
  const { setImportPopup } = useApplicationsActions();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
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
      const formattedCandidates = candidates.map((candidate) => ({
        ...candidate,
        linkedin: candidate.linkedin || '',
        file_url: candidate.file_url || '',
      }));
      await handleUploadCsv({ candidates: formattedCandidates });
      setImportPopup(false);
    } catch {
      //
    }
  };

  return (
    <div className='border-0 shadow-none h-[500px] flex flex-col'>
      <div className='flex-grow overflow-auto p-6'>
        {isLoading ? (
          <div className='flex justify-center items-center w-full h-full'>
            <p className='text-gray-500'>Loading...</p>
          </div>
        ) : (
          <div className='space-y-6 h-full flex flex-col'>
            <div className='flex items-center justify-center w-full'>
              <label
                htmlFor='file-upload'
                className='flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer'
              >
                <Upload className='w-5 h-5 mr-2 text-gray-400' />
                Select CSV file
                <input
                  id='file-upload'
                  type='file'
                  className='hidden'
                  accept='.csv'
                  onChange={handleFileUpload}
                />
              </label>
            </div>
            <p className='text-sm text-gray-600 text-center'>{`Listing ${candidates.length} candidates`}</p>
            {/* <div className='flex-grow overflow-auto'>
              {candidates.length > 0 ? (
                <CandidatesListTable candidates={candidates} />
              ) : (
                <div className='border border-dashed border-gray-300 p-6 text-center rounded-lg'>
                  <FileText className='w-12 h-12 text-gray-400 mx-auto mb-4' />
                  <p className='text-gray-500'>
                    Upload a CSV file to import candidates
                  </p>
                </div>
              )}
            </div> */}
          </div>
        )}
      </div>
      <div className='p-4'>
        <Button
          onClick={handleImport}
          disabled={candidates.length === 0}
          className='w-full'
        >
          Import
        </Button>
      </div>
    </div>
  );
};

const CandidatesListTable: React.FC<{ candidates: Candidate[] }> = ({
  candidates,
}) => (
  <div className='overflow-auto max-h-[300px]'>
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
