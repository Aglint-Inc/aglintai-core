import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Fragment, useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

import { ImportCandidate, LoaderSvg, UploadCsv } from '@/devlink';
import toast from '@/src/utils/toast';

function ImportCandidates() {
  const [bulkImportdata, setbulkImportdata] = useState([]);
  const [headers, setHeaders] = useState([]);
  useEffect(() => {
    setHeaders([
      'Name',
      'Email',
      'Phone',
      'JobTitle',
      'ResumeScore',
      'InterviewScore',
    ]);
  }, []);
  const [isLoading, setIsLoading] = useState(false);

  const csvData = [
    ['Name', 'Email', 'Phone', 'JobTitle', 'ResumeScore', 'InterviewScore'],
    ['xyz1', 'xyz@gmail.com', '123456789', 'Full Stack Developer', '80', '90'],
    ['xyz2', 'xyz@gmail.com', '123456789', 'Full Stack Developer', '80', '90'],
    ['xyz3', 'xyz@gmail.com', '123456789', 'Full Stack Developer', '80', '90'],
    ['xyz4', 'xyz@gmail.com', '123456789', 'Full Stack Developer', '80', '90'],
    ['xyz5', 'xyz@gmail.com', '123456789', 'Full Stack Developer', '80', '90'],
  ];

  function UplopadPeople(emp) {
    // eslint-disable-next-line no-console
    console.log(emp);
    // let imageURL = props.avatarFile != null ? `https://jwkqolhzkayulhxafvsb.supabase.co/storage/v1/object/public/employee-image/public/${props.avatarFile.name}` : 'No-Image';
    // console.log(Object.values(data))
    // Object.values(emp).map(async (ele) => {
    // eslint-disable-next-line no-console
    //   const { error } = await supabase.from('employee').insert({
    //     name: ele.Name,
    //     email: ele.Email,
    //     designation: ele.Designation,
    //     phone: ele.Phone,
    //     department: ele.Department,
    //     salary: ele.Salary,
    //     status: 'Created',
    //     image: ele.Image_url,
    //     company_id: companyID,
    //     out_place: stage === 'notoutPlace' ? false : true,
    //   });
    //   if (!error) {
    //     getListOfPeople(companyID);
    //   }
    // });
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
              headers?.reduce((_, item) => Object.keys(data[0]).has(item.key));

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
          UplopadPeople(data);
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
                  <Stack>Completed</Stack>
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
