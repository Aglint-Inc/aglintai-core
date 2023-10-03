import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Fragment, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

import { ImportCandidate, LoaderSvg, UploadCsv } from '@/devlink';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import { JobApplicationSections } from '@/src/context/JobApplicationsContext/types';
import toast from '@/src/utils/toast';

import CandidatesListTable from './CandidatesListTable';
import AUIButton from '../../Common/AUIButton';
// import { bulkCreateJobApplicationDbAction } from '@/src/context/JobApplicationsContext/utils';

function ImportCandidates() {
  const {
    setOpenImportCandidates,
    handleJobApplicationBulkCreate,
    applicationsData,
  } = useJobApplications();

  const [bulkImportdata, setbulkImportdata] = useState([]);
  const headers = [
    'first_name',
    'last_name',
    'email',
    'phone',
    'job_title',
    'company',
    'status',
    'score',
    'profile_image',
    'resume',
  ];
  const [isLoading, setIsLoading] = useState(false);

  const csvData = [
    [
      'first_name',
      'last_name',
      'email',
      'phone',
      'job_title',
      'company',
      'status',
      'profile_image',
      'resume',
    ],
    [
      'xyz',
      'c',
      'xyz@gmail.com',
      '1234567890',
      'sales manager',
      'xyz',
      JobApplicationSections.APPLIED,
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
      'https://img.freepik.com/free-psd/clean-modern-resume-portfolio-cv-template_120329-3607.jpg',
    ],
    [
      'chi',
      'mai',
      'chinmaichromium@gmail.com',
      '9876543210',
      'Engineer',
      'hireDumb',
      JobApplicationSections.APPLIED,
      '',
      'https://img.freepik.com/free-psd/clean-modern-resume-portfolio-cv-template_120329-3607.jpg',
    ],
    [
      'abc',
      'c',
      'abc@gmail.com',
      '9876543210',
      'designer',
      'hireDumb',
      JobApplicationSections.APPLIED,
      '',
      'https://img.freepik.com/free-psd/clean-modern-resume-portfolio-cv-template_120329-3607.jpg',
    ],
  ];

  async function createCandidates(candidates) {
    const applied = applicationsData.applications.applied.list;
    const interviewing = applicationsData.applications.interviewing.list;
    const selected = applicationsData.applications.selected.list;
    const rejected = applicationsData.applications.rejected.list;
    const totalApplications = [
      ...applied,
      ...interviewing,
      ...selected,
      ...rejected,
    ].map((ele) => ele.email);
    const filteredCandidates = candidates.filter(
      (ele) => !totalApplications.includes(ele.email),
    );
    setbulkImportdata([]);
    setIsLoading(true);
    const data = await handleJobApplicationBulkCreate(filteredCandidates);
    setOpenImportCandidates(false);
    setIsLoading(data);
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
          <ImportCandidate
            slotReuploadBtn={
              <>
                {bulkImportdata.length ? (
                  <Stack {...getRootProps()}>
                    <input {...getInputProps()} />
                    <AUIButton variant='text'>Browse again</AUIButton>
                  </Stack>
                ) : null}
              </>
            }
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
              <>
                {isLoading ? (
                  <Stack
                    justifyContent={'center'}
                    alignItems={'center'}
                    direction={'row'}
                    width={'100%'}
                    height={'200px'}
                  >
                    <LoaderSvg />
                  </Stack>
                ) : bulkImportdata?.length > 0 ? (
                  <CandidatesListTable importedCandidate={bulkImportdata} />
                ) : (
                  <>
                    <Stack {...getRootProps()}>
                      <input {...getInputProps()} />
                      <UploadCsv />
                    </Stack>
                  </>
                )}
              </>
            }
            onClickImport={{
              onClick: () => {
                createCandidates(bulkImportdata);
              },
            }}
            isImportDisable={!bulkImportdata.length}
          />
        </Fragment>
      </Stack>
    </Stack>
  );
}
export default ImportCandidates;
