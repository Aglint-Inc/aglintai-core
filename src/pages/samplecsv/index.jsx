// can be deleted this file : using for testing

import { faker } from '@faker-js/faker';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';

import { AppLogo } from '@/devlink';
import Seo from '@/src/components/Common/Seo';
const CSVGenerator = () => {
  const csvCountRef = useRef();
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);

  function generateCsv() {
    // Create an array to hold the CSV data
    const data = [];
    const header = [
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

    // Generate data for 100 people
    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    for (let i = 0; i < csvCountRef?.current?.value; i++) {
      // Function to generate a random number within a specific range

      // Generate a random number between 1 and 100
      const randomNumber = getRandomNumber(1, 100);
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const email = faker.internet.email();
      const phone = faker.number.int(9999999999);
      const jobTitle = faker.name.jobTitle();
      const score = checked1 ? randomNumber : '';
      const company = 'Aglint Inc';
      const status = checked
        ? faker.helpers.arrayElement([
            'new',
            'interviewing',
            'qualified',
            'disqualified',
          ])
        : 'new'; // You can change this if needed
      const profileImage = faker.image.avatar(); // You can change this if needed
      const resume =
        'https://aetdssowoezhaepzhzag.supabase.co/storage/v1/object/public/resume-job-post/public/729ddd04-ea4f-43af-a1f1-d88e1ca9f06a?t=2023-10-04T15:25:41.344Z'; // You can change this if needed

      const person = [
        firstName,
        lastName,
        email,
        phone,
        jobTitle,
        company,
        status,
        score,
        profileImage,
        resume,
      ];
      data.push(person);
    }

    // Create the CSV content
    const csvContent = [header.join(',')]
      .concat(data.map((row) => row.join(',')))
      .join('\n');

    // Create a Blob containing the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a link element to initiate the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'people_data.csv';
    document.body.appendChild(a);

    // Trigger a click event on the link to initiate the download
    a.click();

    // Clean up by revoking the URL
    window.URL.revokeObjectURL(url);
  }
  return (
    <>
      <Seo
        title='Aglint for Employers | CSV Generator'
        description='We help companies hire the perfect candidates quickly. Our trained models understand company culture and values, finding the right fit. Our automated screening saves time and money.'
      />
      <Stack
        top={20}
        left={20}
        position={'absolute'}
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <svg
          width='36'
          height='36'
          viewBox='0 0 36 36'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M27.4875 16.8075C24.255 15.9975 22.635 15.6 21.5175 14.4825C20.4 13.3575 20.0025 11.745 19.1925 8.5125L18 3.75L16.8075 8.5125C15.9975 11.745 15.6 13.365 14.4825 14.4825C13.3575 15.6 11.745 15.9975 8.5125 16.8075L3.75 18L8.5125 19.1925C11.745 20.0025 13.365 20.4 14.4825 21.5175C15.6 22.6425 15.9975 24.255 16.8075 27.4875L18 32.25L19.1925 27.4875C20.0025 24.255 20.4 22.635 21.5175 21.5175C22.6425 20.4 24.255 20.0025 27.4875 19.1925L32.25 18L27.4875 16.8075Z'
            fill='#FF6224'
          ></path>
        </svg>
        <AppLogo />
      </Stack>
      <Stack
        direction={'row'}
        alignItems={'center'}
        flexDirection={'column'}
        height={'100vh'}
      >
        <Stack mt={'200px'} width={500}>
          <Typography variant='h2'>Generate CSV file</Typography>
          <TextField
            placeholder='Enter the number of candidates'
            inputRef={csvCountRef}
            inputProps={{
              disableUnderline: true,
              autoCorrect: false,
              maxLength: 5,
            }}
            variant='outlined'
            type='number'
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  setChecked(e.target.checked);
                }}
              />
            }
            label='Mix status[applied ,interviewing, selected, rejected]'
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  setChecked1(e.target.checked);
                }}
              />
            }
            label='With score'
          />
          <Stack direction={'row'} justifyContent={'end'}>
            <Button variant='contained' onClick={generateCsv}>
              Generate and Download
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default CSVGenerator;

CSVGenerator.getLayout = (page) => {
  return <>{page}</>;
};
