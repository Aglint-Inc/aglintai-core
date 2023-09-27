import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Fragment, useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

import { ImportCandidate, LoaderSvg, UploadCsv } from '@/devlink';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import toast from '@/src/utils/toast';

import CandidatesListTable from './CandidatesListTable';
// import { bulkCreateJobApplicationDbAction } from '@/src/context/JobApplicationsContext/utils';

function ImportCandidates() {
  const { setOpenImportCandidates, handleJobApplicationBulkCreate } =
    useJobApplications();

  const [bulkImportdata, setbulkImportdata] = useState([]);
  const [headers, setHeaders] = useState([]);
  useEffect(() => {
    setHeaders([
      'first_name',
      'last_name',
      'email',
      'phone',
      'job_title',
      'score',
      'company',
    ]);
  }, []);
  const [isLoading, setIsLoading] = useState(false);

  const csvData = [
    [
      'first_name',
      'last_name',
      'email',
      'phone',
      'job_title',
      'score',
      'company',
      'status',
    ],
    [
      'xyz1',
      'l_xyz',
      'xyz@gmail.com',
      '123456789',
      'Full Stack Developer',
      '80',
      'xyz.com',
      'applied',
    ],
  ];

  async function createCandidates(candidates) {
    const data = await handleJobApplicationBulkCreate(candidates);
    // eslint-disable-next-line no-console
    console.log(candidates, data);
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
          const data = XLSX.utils.sheet_to_json(ws);
          /* Update state */
          if (headers?.length) {
            const validityOfHeaders =
              headers?.length === Object.keys(data[0])?.length &&
              headers?.reduce((_, item) => Object.keys(data[0]).has(item));

            if (validityOfHeaders) {
              toast.success('Headers Are Valid.');
              setbulkImportdata(data);
            } else toast.error('Invalid headers, Please use the template.');
          } else {
            toast.success('CSV Uploaded Successfully');
            setbulkImportdata(data);
          }
          setbulkImportdata(data);
          setIsLoading(false);
          createCandidates(data);
        }
      };
      if (rABS) reader.readAsBinaryString(file);
      else reader.readAsArrayBuffer(file);
    },
    onDropRejected: () => {
      toast.error('Invalid file.', {
        duration: 2000,
      });
    },
    // disabled: !allowed || isLoading || areHeadersLoading,
  });
  return (
    <Stack
      p={1}
      sx={{
        bgcolor: 'white',
        borderRadius: '10px',
      }}
      elevation={10}
    >
      <Stack spacing={1} mt='16px'>
        <Fragment>
          {/* {isLoading || areHeadersLoading ? (
          <CircularProgress
            sx={{ fontSize: '4rem', marginBottom: '0.5rem' }}
            className='container_icon'
          />
        ) : bulkImportdata?.length > 0 && areHeadersValid ? (
          <CloudDone sx={{ fontSize: '4rem' }} />
        ) : (
          <CloudUpload sx={{ fontSize: '4rem', color: '#000000' }} />
        )}

        <HeadingTypography variant='h3'>
          {isLoading
            ? 'Uploading...'
            : areHeadersLoading
            ? 'Headers Loading...'
            : bulkImportdata?.length > 0
            ? 'Completeeed'
            : text}
        </HeadingTypography> */}
          <ImportCandidate
            onClickClose={{ onClick: () => setOpenImportCandidates(false) }}
            slotDownload={
              <CSVLink filename={'candidates-sample.csv'} data={csvData}>
                <Stack direction={'row'}>
                  <Typography
                    sx={{
                      textDecoration: 'underline',
                    }}
                    color={'blue.600'}
                    fontSize={'14px'}
                  >
                    Download Sample CSV
                  </Typography>
                </Stack>
              </CSVLink>
            }
            slotUpload={
              <Stack {...getRootProps()}>
                <input {...getInputProps()} />
                {isLoading ? (
                  <Stack width={'100%'} height={'300px'}>
                    <LoaderSvg />
                  </Stack>
                ) : bulkImportdata?.length > 0 ? (
                  <CandidatesListTable importedCandidate={bulkImportdata} />
                ) : (
                  <UploadCsv />
                )}
              </Stack>
            }
          />
        </Fragment>
      </Stack>
    </Stack>
  );
}
export default ImportCandidates;
