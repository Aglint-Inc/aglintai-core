import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import { AddSocialLink, CompanyInfo, CompanySetting } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { palette } from '@/src/context/Theme/Theme';

import ImageUpload from '../Common/ImageUpload';
import UITextField from '../Common/UITextField';
import UITypography from '../Common/UITypography';

const CompanyDetailComp = () => {
  const { recruiter, setRecruiter } = useAuthDetails();
  const [logo, setLogo] = useState<string>();

  useEffect(() => {
    setLogo(recruiter?.logo);
  }, []);

  return (
    <>
      <CompanySetting
        slotCompanyInfo={
          <CompanyInfo
            slotCompanyLogo={
              <>
                <ImageUpload image={logo} setImage={setLogo} size={80} />
              </>
            }
            onClickChangeLogo={{
              onClick: () => {
                document.getElementById('image-upload').click();
              },
            }}
            slotBasicForm={
              <Stack
                direction={'row'}
                p={'4px'}
                width={'100%'}
                spacing={'40px'}
              >
                <Stack spacing={'20px'} width={'100%'}>
                  <UITextField
                    labelSize='medium'
                    fullWidth
                    label='Company Name'
                    placeholder='Search'
                    value={recruiter?.name}
                    onChange={(e) => {
                      setRecruiter({ ...recruiter, name: e.target.value });
                    }}
                  />
                  <UITextField
                    labelSize='medium'
                    fullWidth
                    label='Industry Type'
                    placeholder='Ex. Healthcare'
                    value={recruiter?.industry}
                    onChange={(e) => {
                      setRecruiter({ ...recruiter, industry: e.target.value });
                    }}
                  />
                  <UITextField
                    labelSize='medium'
                    fullWidth
                    label='Company Adress'
                    placeholder='Ex. San Francisco, California'
                    value={recruiter?.address?.line1 || ''}
                    onChange={(e) => {
                      setRecruiter({
                        ...recruiter,
                        address: {
                          line1: e.target.value,
                          line2: '',
                          city: '',
                          country: '',
                          state: '',
                        },
                      });
                    }}
                    multiline
                  />
                </Stack>
                <Stack spacing={'20px'} width={'100%'}>
                  <UITextField
                    labelSize='medium'
                    fullWidth
                    label='Company Website'
                    placeholder='Search'
                    value={recruiter?.company_website}
                    onChange={(e) => {
                      setRecruiter({
                        ...recruiter,
                        company_website: e.target.value,
                      });
                    }}
                  />

                  <Stack>
                    <UITypography
                      type={'medium'}
                      color={palette.grey[800]}
                      fontBold='normal'
                    >
                      Social Links
                    </UITypography>
                    {recruiter?.socials &&
                      Object.keys(recruiter.socials).map((socialName) => (
                        <li key={socialName}>
                          <strong>{socialName}:</strong>
                        </li>
                      ))}
                    <AddSocialLink />
                  </Stack>
                </Stack>
              </Stack>
            }
          />
        }
      />
    </>
  );
};

export default CompanyDetailComp;
