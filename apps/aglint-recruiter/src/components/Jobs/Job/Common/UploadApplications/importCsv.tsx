import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { CSVLink } from 'react-csv';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

import { useToast } from '@/components/hooks/use-toast';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { type CsvUploadApi } from '@/src/apiUtils/job/candidateUpload/types';
import { useApplicationsStore } from '@/src/context/ApplicationsContext/store';
import { useJob } from '@/src/context/JobContext';

export type BulkImportCandidateCsv = CsvUploadApi['request']['candidates'];

const ImportCsv = () => {
  const { handleUploadCsv } = useJob();
  const setImportPopup = useApplicationsStore(
    ({ setImportPopup }) => setImportPopup,
  );

  const [bulkImportdata, setbulkImportdata] = useState<BulkImportCandidateCsv>(
    [],
  );
  const headers = [
    'first_name',
    'last_name',
    'email',
    'phone',
    'linkedin',
    'file_url',
  ];
  const [isLoading, setIsLoading] = useState(false);

  const csvData = [
    [...headers],
    [
      'xyz',
      'abc',
      'xyzabc@gmail.com',
      '1234567890',
      'https://www.linkedin.com',
      'https://img.freepik.com/free-psd/clean-modern-resume-portfolio-cv-template_120329-3607.jpg',
    ],

    [
      'abc',
      'd',
      'abcd@gmail.com',
      '9876543210',
      'https://www.linkedin.com',
      'https://img.freepik.com/free-psd/clean-modern-resume-portfolio-cv-template_120329-3607.jpg',
    ],
  ];

  function createCandidates(candidates: BulkImportCandidateCsv) {
    setbulkImportdata([]);
    handleUploadCsv({ candidates });
    setImportPopup(false);
  }

  const { toast } = useToast();

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 20000000,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
        '.csv',
        '.xls',
      ],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      setIsLoading(true);
      const file = acceptedFiles.map((file) => Object.assign(file))[0];
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;
      reader.onload = (e) => {
        if (e.target) {
          /* Parse data */
          const bstr = e.target.result;
          const wb = XLSX?.read(bstr, { type: rABS ? 'binary' : 'array' });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          // eslint-disable-next-line security/detect-object-injection
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(
            ws,
          ) as unknown as BulkImportCandidateCsv;
          /* Update state */
          if (headers?.length) {
            if (data.length === 0) {
              toast({
                title: 'Candidates are not in CSV format.',
              });
              setIsLoading(false);
              return;
            }
            let validityOfHeaders =
              headers?.length >= Object.keys(data[0])?.length &&
              Object.keys(data[0])?.every((item) => {
                return headers.includes(item);
              });

            if (validityOfHeaders) {
              // toast.success('Headers Are Valid.');
              // console.log('valid header');

              setbulkImportdata(data);
            } else {
              toast({
                title: 'Invalid header.',
              });
              // console.log('invalid header');
            }
          }
          setIsLoading(false);
        }
      };
      if (rABS) reader.readAsBinaryString(file);
      else reader.readAsArrayBuffer(file);
    },
    onDropRejected: () => {
      toast({
        title: 'Invalid file.',
      });
    },
  });
  return (
    <Card className='bg-white rounded-lg h-full'>
      <div className='space-y-4 h-full'>
        {isLoading && (
          <div className='flex justify-center items-center w-full h-[200px]'>
            <Loader2 className='w-8 h-8 animate-spin text-gray-500' />
          </div>
        )}
        {!isLoading && (
          <div>
            {/* Replace ImportCsvDev with custom implementation */}
            <div {...getRootProps()} className='h-full'>
              <input id='uploadCsv' {...getInputProps()} />
              <Button variant='ghost'>Reupload</Button>
            </div>
            <p className='text-sm'>{`Listing ${bulkImportdata?.length} candidates`}</p>
            {bulkImportdata?.length > 0 ? (
              <CandidatesListTable importedCandidate={bulkImportdata} />
            ) : (
              <>
                <div className='flex pb-1'>
                  <p className='text-sm'>Need help?&nbsp;</p>
                  <CSVLink filename={'candidates-sample.csv'} data={csvData}>
                    <p className='text-sm text-blue-600 underline'>
                      Download our sample file here.
                    </p>
                  </CSVLink>
                </div>
                <div {...getRootProps()}>
                  <input id='uploadCsv' {...getInputProps()} />
                  {/* Replace ImportCandidatesCsv with custom implementation */}
                  <div className='border-2 border-dashed border-gray-300 p-6 text-center'>
                    <p>
                      Drag and drop your CSV file here, or click to select a
                      file
                    </p>
                  </div>
                </div>
              </>
            )}
            <Button onClick={() => createCandidates(bulkImportdata)}>
              Import
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

function CandidatesListTable({ importedCandidate }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Candidate</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {importedCandidate.map((ele, i) => (
          <TableRow key={i}>
            <TableCell className='flex items-center space-x-2'>
              <Avatar>
                <Image
                  src={ele.profile_image}
                  alt={ele.first_name}
                  width={40}
                  height={40}
                />
              </Avatar>
              <span>{`${ele.first_name} ${ele.last_name}`}</span>
            </TableCell>
            <TableCell>{ele.email}</TableCell>
            <TableCell>{ele.phone}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { ImportCsv };
