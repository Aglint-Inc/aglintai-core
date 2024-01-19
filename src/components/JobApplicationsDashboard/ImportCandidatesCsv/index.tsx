import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { CSVLink } from 'react-csv';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

import { ImportCandidatesCsv, ImportCsv, LoaderSvg } from '@/devlink';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import { CsvUploadApi } from '@/src/pages/api/jobApplications/candidateUpload/types';
import toast from '@/src/utils/toast';

import CandidatesListTable from './CandidatesListTable';
import useUploadCandidate from '../ImportManualCandidates/hooks';
import AUIButton from '../../Common/AUIButton';

export type BulkImportCandidateCsv = CsvUploadApi['request']['candidates'];

function ImportCandidatesCSV() {
  const { setOpenImportCandidates, handleJobApplicationRefresh } =
    useJobApplications();

  const { handleBulkCsvUpload } = useUploadCandidate();

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

  async function createCandidates(candidates: BulkImportCandidateCsv) {
    setbulkImportdata([]);
    setIsLoading(true);
    const { confirmation } = await handleBulkCsvUpload(candidates);
    setOpenImportCandidates(false);
    setIsLoading(false);
    if (confirmation) await handleJobApplicationRefresh();
  }

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
              toast.error('Candidates are not in CSV file😑');
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
              toast.error('Invalid header😑');
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
      toast.error('Invalid file.');
    },
    // disabled: !allowed || isLoading || areHeadersLoading,
  });
  return (
    <Stack
      sx={{
        bgcolor: 'white',
        borderRadius: '10px',
        height: '100%',
      }}
    >
      <Stack spacing={1} height={'100%'}>
        {isLoading && (
          <Stack
            justifyContent={'center'}
            alignItems={'center'}
            direction={'row'}
            width={'100%'}
            height={'200px'}
          >
            <LoaderSvg />
          </Stack>
        )}
        {!isLoading && (
          <ImportCsv
            slotReuploadButton={
              <Stack {...getRootProps()} sx={{ height: '100%' }}>
                <input id='uploadCsv' {...getInputProps()} />
                <AUIButton variant='text'>Reupload</AUIButton>
              </Stack>
            }
            textListingCount={`Listing ${bulkImportdata?.length} candidates`}
            textCountExistinJob={'0 candidates already exists in this job'}
            isExistWarningVisible={false} // enable for showing the existing candidates
            isImportDescVisible={bulkImportdata?.length === 0}
            isListingCountVisible={bulkImportdata?.length !== 0}
            slotImportCandidatesCsv={
              bulkImportdata?.length > 0 ? (
                <CandidatesListTable importedCandidate={bulkImportdata} />
              ) : (
                <>
                  <Stack direction={'row'} pb={1}>
                    <Typography fontSize={'14px'}>Need help?&nbsp;</Typography>
                    <CSVLink filename={'candidates-sample.csv'} data={csvData}>
                      <Typography
                        sx={{
                          textDecoration: 'underline',
                        }}
                        color={'blue.600'}
                        fontSize={'14px'}
                      >
                        Download our sample file here.
                      </Typography>
                    </CSVLink>
                  </Stack>
                  <Stack {...getRootProps()} sx={{ height: '320px' }}>
                    <input id='uploadCsv' {...getInputProps()} />
                    <ImportCandidatesCsv />
                  </Stack>
                </>
              )
            }
            onClickImportRemaining={{
              onClick: async () => {
                await createCandidates(bulkImportdata);
              },
            }}
          />
        )}
      </Stack>
    </Stack>
  );
}
export default ImportCandidatesCSV;
