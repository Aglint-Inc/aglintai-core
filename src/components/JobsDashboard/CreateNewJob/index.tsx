import Drawer from '@mui/material/Drawer';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import isEmpty from 'lodash/isEmpty';
import { useState } from 'react';

import { CreateNewJobDrawer, StepBottomProgress } from '@/devlink';

import FormFive from './Forms/FormFive';
import FormFour from './Forms/FormFour';
import FormOne from './Forms/FormOne';
import FormThree from './Forms/FormThree';
import FormTwo from './Forms/FormTwo';
import { useJobList } from './JobPostFormProvider';

function CreateNewJob({ open, setDrawerOpen }) {
  const {
    jobs: { editingJob },
  } = useJobList();
  const [slideNo, setSlideNo] = useState(0);
  const [formError, setFormError] = useState({
    jobTitle: '',
    company: '',
    location: '',
  });

  let formSlide = null;

  const changeSlide = (newSlideNo: number) => {
    setSlideNo(newSlideNo);
  };

  if (slideNo === 0) {
    formSlide = <FormOne nextSlide={() => changeSlide(1)} />;
  } else if (slideNo === 1) {
    formSlide = <FormTwo formError={formError} setFormError={setFormError} />;
  } else if (slideNo === 2) {
    formSlide = <FormThree />;
  } else if (slideNo === 3) {
    formSlide = <FormFour />;
  } else if (slideNo === 4) {
    formSlide = <FormFive />;
  }

  const isformValid = () => {
    let flag = true;

    const {
      job: { company, jobTitle, jobLocation },
    } = editingJob;
    if (slideNo === 2) {
      if (isEmpty(jobTitle)) {
        flag = false;
        setFormError((p) => ({ ...p, jobTitle: 'Please Enter Job Title' }));
      }

      if (isEmpty(company)) {
        flag = false;
        setFormError((p) => ({ ...p, company: 'Please Enter Company Name' }));
      }

      if (isEmpty(jobLocation)) {
        flag = false;
        setFormError((p) => ({ ...p, location: 'Please Enter Location' }));
      }
    }

    return flag;
  };

  const handleClickBack = () => {
    setSlideNo((p) => (p !== 0 ? p - 1 : p));
  };

  const handleClickContinue = () => {
    if (slideNo === 2) {
      if (!isformValid()) return;
    }
    setSlideNo((p) => p + 1);
  };

  return (
    <>
      <Drawer
        anchor='right'
        open={open}
        onClose={() => {
          setDrawerOpen(() => false);
          changeSlide(0);
        }}
      >
        <Stack p={2} width={'500px'} position={'relative'} minHeight={'100vh'}>
          <CreateNewJobDrawer
            onClickClose={{ onClick: () => setDrawerOpen(() => false) }}
            slotNewJobStep={formSlide}
            slotBottomButtonProgress={
              slideNo !== 0 && (
                <StepBottomProgress
                  textStepCount={`Step ${slideNo} of 5`}
                  onClickBack={{
                    onClick: handleClickBack,
                  }}
                  onClickContinue={{
                    onClick: handleClickContinue,
                  }}
                  slotProgressBar={
                    <>
                      <LinearProgress
                        variant='determinate'
                        value={(slideNo / 5) * 100}
                      />
                    </>
                  }
                />
              )
            }
          />
        </Stack>
      </Drawer>
    </>
  );
}

export default CreateNewJob;
