import { Popper, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import { useState } from 'react';

import UITypography from '@/src/components/Common/UITypography';

import { JobFormState, useJobForm } from '../JobPostFormProvider';
import { FormErrorParams } from './JobForm';

const SectionWarning = ({
  warnings,
  slidePath,
  currSlideNo,
}: {
  warnings: FormErrorParams;
  slidePath: JobFormState['currSlide'];
  currSlideNo: number;
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    jobForm: { formType, jobPostId },
  } = useJobForm();
  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const isShowWarn =
    (formType === 'edit' && warnings[String(slidePath)].err.length > 0) ||
    (formType === 'new' &&
      currSlideNo <=
        Number(localStorage.getItem(`MaxVisitedSlideNo-${jobPostId}`) || -1) &&
      warnings[String(slidePath)].err.length > 0);

  return (
    <>
      {isShowWarn && (
        <Stack onMouseOver={handleMouseEnter} onMouseOut={handleMouseLeave}>
          <Image
            alt='info'
            height={16}
            width={16}
            src={'/images/svg/info.svg'}
          />
        </Stack>
      )}
      <Popper
        open={open}
        anchorEl={anchorEl}
        sx={{
          zIndex: 1,
        }}
      >
        <Paper sx={{ p: 1, mt: 4.5, width: '320px', borderRadius: 'var(--radius-4)' }}>
          <Stack gap={2} borderRadius={4}>
            <Stack direction={'row'} gap={0.5} alignItems={'center'}>
              <Image
                alt='info'
                height={14}
                width={14}
                src={'/images/svg/info.svg'}
              />
              <UITypography fontBold='normal' type='small'>
                Warnings
              </UITypography>
            </Stack>
            <Stack>
              <ul>
                {warnings[String(slidePath)].err.map((msg, idx) => (
                  <li key={idx}>{msg}</li>
                ))}
              </ul>
            </Stack>
          </Stack>
        </Paper>
      </Popper>
    </>
  );
};

export default SectionWarning;
