import React, { useState } from 'react';

import { useToast } from '@/components/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useApplicationsStore } from '@/src/context/ApplicationsContext/store';
import { useJob } from '@/src/context/JobContext';

type Candidate = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  linkedin: string;
  file_url: string;
};

const ImportCsv: React.FC = () => {
  const { handleUploadCsv } = useJob();
  const setImportPopup = useApplicationsStore(
    ({ setImportPopup }) => setImportPopup,
  );
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

  const handleImport = () => {
    const formattedCandidates = candidates.map((candidate) => ({
      ...candidate,
      linkedin: candidate.linkedin || '',
      file_url: candidate.file_url || '',
    }));
    handleUploadCsv({ candidates: formattedCandidates });
    setImportPopup(false);
  };

  return (
    <Card className='bg-white rounded-lg h-full p-4'>
      <div className='space-y-4 h-full'>
        {isLoading ? (
          <div className='flex justify-center items-center w-full h-[200px]'>
            <p>Loading...</p>
          </div>
        ) : (
          <div>
            <input
              type='file'
              accept='.csv'
              onChange={handleFileUpload}
              className='mb-4'
            />
            <p className='text-sm mb-4'>{`Listing ${candidates.length} candidates`}</p>
            {candidates.length > 0 ? (
              <CandidatesListTable candidates={candidates} />
            ) : (
              <div className='border-2 border-dashed border-gray-300 p-6 text-center'>
                <p>Upload a CSV file to import candidates</p>
              </div>
            )}
            <Button onClick={handleImport} disabled={candidates.length === 0}>
              Import
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

const CandidatesListTable: React.FC<{ candidates: Candidate[] }> = ({
  candidates,
}) => (
  <table className='w-full mb-4'>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
      </tr>
    </thead>
    <tbody>
      {candidates.map((candidate, index) => (
        <tr key={index}>
          <td>{`${candidate.first_name} ${candidate.last_name}`}</td>
          <td>{candidate.email}</td>
          <td>{candidate.phone}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export { ImportCsv };
