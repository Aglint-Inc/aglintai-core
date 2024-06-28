import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { CSVLink } from 'react-csv';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { ImportCandidatesCsv } from '@/devlink/ImportCandidatesCsv';
import { ImportCsv as ImportCsvDev } from '@/devlink/ImportCsv';
import { LoaderSvg } from '@/devlink/LoaderSvg';
import { CsvUploadApi } from '@/src/apiUtils/job/candidateUpload/types';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useApplications } from '@/src/context/ApplicationsContext';
import { useApplicationsStore } from '@/src/context/ApplicationsContext/store';
import { YTransform } from '@/src/utils/framer-motions/Animation';
import toast from '@/src/utils/toast';

export type BulkImportCandidateCsv = CsvUploadApi['request']['candidates'];

const ImportCsv = () => {
  const { handleUploadCsv } = useApplications();
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
              toast.error('Candidates are not in CSV format.');
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
              toast.error('Invalid header.');
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
          <ImportCsvDev
            slotReuploadButton={
              <Stack {...getRootProps()} sx={{ height: '100%' }}>
                <input id='uploadCsv' {...getInputProps()} />
                <ButtonGhost textButton='Reupload' size={2} color={'neutral'} />
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
                  <Stack {...getRootProps()}>
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
};
export { ImportCsv };

function CandidatesListTable({ importedCandidate }) {
  // eslint-disable-next-line no-console
  console.log('importedCandidate', importedCandidate);
  return (
    <Stack
      borderRadius={'10px'}
      border={'1px solid '}
      borderColor={'grey.200'}
      height={'100%'}
      overflow={'auto'}
    >
      <TableHeader />
      {importedCandidate.map((ele, i) => {
        return (
          <YTransform key={i} uniqueKey={i}>
            <TableRow
              index={i}
              name={ele.first_name + ' ' + ele.last_name}
              email={ele.email}
              phone={ele.phone}
              profile_image={ele.profile_image}
            />
          </YTransform>
        );
      })}
    </Stack>
  );
}

function TableHeader() {
  return (
    <Stack
      bgcolor={'grey.100'}
      py={'10px'}
      px={'20px'}
      justifyContent={'left'}
      direction={'row'}
      alignItems={'center'}
      spacing={'5px'}
      position={'sticky'}
      top={0}
      zIndex={2}
    >
      {headerObject.map((ele, i) => {
        const { heading, icon } = ele;
        return (
          <Stack
            key={i}
            width={`${100 / 3}%`}
            direction={'row'}
            alignItems={'center'}
            spacing={'5px'}
          >
            {icon}
            <Typography variant='body1'>{heading}</Typography>
          </Stack>
        );
      })}
    </Stack>
  );
}

const headerObject = [
  {
    heading: 'Candidate',
    icon: <GlobalIcon iconName='person' size='4' color='neutral' />,
  },
  {
    heading: 'Email',
    icon: <GlobalIcon iconName='mail' size='4' color='neutral-8' />,
  },
  {
    heading: 'Phone',
    icon: <GlobalIcon iconName='phone' size='4' color='neutral-8' />,
  },
];

function TableRow({ name, email, phone, profile_image, index }) {
  return (
    <Stack
      key={index}
      py={'4px'}
      px={'20px'}
      justifyContent={'left'}
      direction={'row'}
      alignItems={'center'}
      // bgcolor={'yellow.100'} // background color for duplicate candidate row
    >
      <Stack
        width={`${100 / 3}%`}
        direction={'row'}
        alignItems={'center'}
        spacing={'5px'}
      >
        <MuiAvatar src={profile_image} level={name} variant={'rounded-small'} />
        <Typography variant='body1' className='one-line-clamp'>
          {name}
        </Typography>
      </Stack>
      <Typography
        variant='body1'
        className='one-line-clamp'
        width={`${100 / 3}%`}
      >
        {email}
      </Typography>
      <Typography
        variant='body1'
        className='one-line-clamp'
        width={`${100 / 3}%`}
        pl={'10px'}
      >
        {phone}
      </Typography>
    </Stack>
  );
}
