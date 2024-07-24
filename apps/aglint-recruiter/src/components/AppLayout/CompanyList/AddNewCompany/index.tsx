import { Autocomplete, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { capitalize } from 'lodash';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { AddCompany } from '@/devlink2/AddCompany';
import { AddCompanyDetails } from '@/devlink2/AddCompanyDetails';
import { AddCompanyWebsite } from '@/devlink2/AddCompanyWebsite';
import ImageUpload from '@/src/components/Common/ImageUpload';
import Loader from '@/src/components/Common/Lotties/Loader';
import UIPhoneInput from '@/src/components/Common/UIPhoneInput';
import UITextField from '@/src/components/Common/UITextField';
import UITypography from '@/src/components/Common/UITypography';
import { sizes } from '@/src/components/CompanyDetailComp/CompanyInfoComp';
import { Error1 } from '@/src/components/SignUpComp/SlideDetailsOne';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { addHttps } from '@/src/utils/fetchCompDetails';
import { YTransform } from '@/src/utils/framer-motions/Animation';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

interface Error {
  website: ErrorField;
}

interface ErrorField {
  error: boolean;
  msg: string;
}

type phone = {
  countryCode: string;
  dialCode: string;
  format: string;
  name: string;
};
function AddNewCompany({ setOpenSideBar, getCompanies }) {
  const { recruiter } = useAuthDetails();

  const [details, setDetails] = useState({} as any);
  const [searchStatus, setSearchStatus] = useState<'' | 'success' | 'failed'>(
    '',
  );
  const [error, setError] = useState<Error>({
    website: {
      error: false,
      msg: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState(null);
  const formValidation = async (): Promise<boolean> => {
    let isValid = true;
    if (!details?.company_website) {
      isValid = false;
      error.website = {
        error: true,
        msg: 'Website is required field',
      };
      setError({
        ...error,
      });
    } else {
      await axios
        .post('/api/dns/lookup', {
          url: details?.company_website,
        })
        .then((res) => {
          if (res.status == 200 && res.data) {
            error.website = {
              error: false,
              msg: '',
            };
            setError({
              ...error,
            });
          } else {
            isValid = false;
            error.website = {
              error: true,
              msg: 'Website is not valid url',
            };
            setError({
              ...error,
            });
          }
        });
    }

    return isValid;
  };

  const submitHandler = async () => {
    try {
      setLoading(true);
      if ((await formValidation()) && recruiter?.id) {
        const url = details.company_website.replace(/^https?:\/\//i, '');
        const { data: companyDetails } = await axios.post(
          `/api/fetchCompanyDetails`,
          {
            domain_name: url,
          },
        );
        setLogo(companyDetails.logo_url);
        const company_size =
          companyDetails?.estimated_num_employees > 1 &&
          companyDetails?.estimated_num_employees < 5
            ? sizes[0]
            : companyDetails?.estimated_num_employees > 5 &&
                companyDetails?.estimated_num_employees < 50
              ? sizes[1]
              : companyDetails?.estimated_num_employees > 50 &&
                  companyDetails?.estimated_num_employees < 100
                ? sizes[2]
                : companyDetails?.estimated_num_employees > 100 &&
                    companyDetails?.estimated_num_employees < 1000
                  ? sizes[3]
                  : companyDetails?.estimated_num_employees > 1000 &&
                      companyDetails?.estimated_num_employees < 5000
                    ? sizes[4]
                    : companyDetails?.estimated_num_employees > 5000
                      ? sizes[5]
                      : '';
        setDetails((pre: any) => ({
          ...pre,
          company_website: addHttps(details?.company_website || ''),
          name: companyDetails?.name || '',
          phone_number: companyDetails?.primary_phone?.number || '',
          industry:
            capitalize(companyDetails?.industry?.replaceAll('-', ' ')) || '',
          employee_size: company_size || '',
          logo: companyDetails.logo_url || null,
          office_locations:
            [
              {
                city: companyDetails?.city || '',
                line1: companyDetails.city?.street_address || '',
                line2: '',
                region: companyDetails?.state || '',
                country: companyDetails?.country || '',
                zipcode: companyDetails?.postal_code,
                full_address: companyDetails?.raw_address,
                is_headquarter: true,
              },
            ] || [],
          company_overview: companyDetails?.short_description || '',
          // technology_score: companyDetails.technologies || [],
          socials: {
            custom: {},
            twitter: companyDetails?.twitter_url || '',
            youtube: companyDetails?.youtube_url || '',
            facebook: companyDetails?.facebook_url || '',
            linkedin: companyDetails?.linkedin_url || '',
            instagram: companyDetails?.instagram_url || '',
          },
          technology_score: companyDetails?.keywords.map(capitalize) || [],
          departments: Object.keys(
            companyDetails?.departmental_head_count || {},
          ).map((dep) => capitalize(dep.split('_').join(' '))),
        }));
        setLoading(false);
        setSearchStatus('success');
      }
      setLoading(false);
    } catch (err) {
      setSearchStatus('failed');
    } finally {
      setLoading(false);
    }
  };

  // const submitHandler = async () => {
  //   if ((await formValidation()) && recruiter?.id) {
  //     setLoading(true);
  //     await axios
  //       .post('/api/crawlwebsite', { url: formatURL(details.company_website) })
  //       .then(async (data) => {
  //         if (data.status === 200) {
  //           if (data.data.linkedIns[0]) {
  //             await axios
  //               .post('/api/fetchcompany', {
  //                 url: data.data.linkedIns[0],
  //               })
  //               .then(async (res) => {
  //                 const company = res.data;
  //                 setLogo(company?.logo_url);
  //                 setDetails((pre: any) => ({
  //                   ...pre,

  //                   company_website: formatURL(details.company_website),
  //                   socials: {
  //                     custom: {},
  //                     twitter: data.data.twitters[0] || '',
  //                     youtube: data.data.youtubes[0] || '',
  //                     facebook: data.data.facebooks[0] || '',
  //                     linkedin: data.data.linkedIns[0] || '',
  //                     instagram: data.data.instagrams[0] || '',
  //                   },

  //                   name: company.company_name || '',
  //                   industry: company.industries[0] || '',
  //                   employee_size: company.employee_range,
  //                   logo: company.logo_url,
  //                   office_locations: company.locations || [],
  //                   company_overview: company.description || '',
  //                   technology_score: extractKeywords(company.specialties),
  //                 }));
  //               });
  //           } else {
  //             setLogo('');
  //             setDetails((pre: any) => ({
  //               ...pre,

  //               company_website: formatURL(details.company_website),
  //               socials: {
  //                 custom: {},
  //                 twitter: data.data.twitters[0] || '',
  //                 youtube: data.data.youtubes[0] || '',
  //                 facebook: data.data.facebooks[0] || '',
  //                 linkedin: data.data.linkedIns[0] || '',
  //                 instagram: data.data.instagrams[0] || '',
  //               },

  //               name: '',
  //               industry: '',
  //               employee_size: null,
  //               logo: '',
  //               office_locations: [],
  //               company_overview: '',
  //               technology_score: [],
  //             }));
  //           }
  //         }
  //       });
  //     setLoading(false);
  //   }
  // };

  // function extractKeywords(inputString) {
  //   if (inputString) {
  //     // Split the input string into an array of keywords using a comma as the delimiter
  //     const keywordsArray = inputString
  //       .split(',')
  //       .map((keyword) => keyword.trim());

  //     return keywordsArray;
  //   } else {
  //     return [];
  //   }
  // }

  // function formatURL(userURL) {
  //   // Remove leading and trailing spaces
  //   userURL = userURL.trim();

  //   // Check if the URL starts with "http://" or "https://"
  //   if (!userURL.startsWith('http://') && !userURL.startsWith('https://')) {
  //     // If not, add "https://"
  //     userURL = 'https://' + userURL;
  //   }

  //   // Check if the URL contains "www."
  //   if (!userURL.includes('www.')) {
  //     // If not, add "www."
  //     userURL = userURL.replace('https://', 'https://www.');
  //   }

  //   return userURL;
  // }

  return (
    <Stack width={'600px'}>
      <AddCompany
        slotBody={
          <>
            {searchStatus === '' && (
              <YTransform uniqueKey={'search-input'}>
                <AddCompanyWebsite
                  slotWebsiteInput={
                    <>
                      <Stack
                        width={'100%'}
                        // direction={'row'}
                        justifyContent={'center'}
                        alignItems={'start'}
                        spacing={'var(--space-5)'}
                      >
                        <TextField
                          margin='none'
                          required
                          fullWidth
                          id='name'
                          variant='standard'
                          placeholder='https://companydomain.com'
                          value={details?.company_website}
                          onChange={(e) => {
                            setDetails({
                              ...details,
                              company_website: e.target.value,
                            });
                          }}
                          error={error.website.error}
                          helperText={
                            error.website.error ? error.website.msg : ''
                          }
                          inputProps={{
                            autoCapitalize: 'true',
                            style: {
                              fontSize: '14px',
                            },
                          }}
                        />
                      </Stack>
                    </>
                  }
                  slotButtons={
                    <>
                      <ButtonGhost
                        textButton='Continue'
                        color='neutral'
                        onClickButton={{
                          onClick: submitHandler,
                        }}
                        isDisabled={loading}
                        isLoading={loading}
                      />
                    </>
                  }
                />
              </YTransform>
            )}
            {searchStatus !== '' && (
              <YTransform uniqueKey={'details'}>
                <AddCompanyDetails
                  isCompanyLogo={logo}
                  isFetchFailed={searchStatus === 'failed'}
                  isFetchSuccessful={searchStatus === 'success'}
                  slotLogo={
                    <ImageUpload
                      image={logo}
                      setImage={setLogo}
                      size={80}
                      dynamic
                      table='company-logo'
                    />
                  }
                  slotCompanyDetails={
                    loading ? (
                      <Stack
                        direction={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        flexDirection={'column'}
                      >
                        <Loader />
                        <UITypography color='var(--neutral-11)'>
                          Hold on, Fetching company info from the website.
                        </UITypography>
                      </Stack>
                    ) : (
                      <>
                        <CompanyDetails
                          setDetails={setDetails}
                          details={details}
                          logo={logo}
                          setOpenSideBar={setOpenSideBar}
                          getCompanies={getCompanies}
                          onClickBack={() => {
                            setSearchStatus('');
                          }}
                        />
                      </>
                    )
                  }
                />
              </YTransform>
            )}
          </>
        }
        onclickClose={{ onClick: () => setOpenSideBar(false) }}
      />
    </Stack>
  );
}

export default AddNewCompany;

function CompanyDetails({
  details,
  setDetails,
  logo,
  setOpenSideBar,
  getCompanies,
  onClickBack,
}) {
  const { setRecruiter, recruiterUser, userDetails, userCountry } =
    useAuthDetails();
  const [phone, setPhone] = useState(null);
  const [phonePattern, setPhonePattern] = useState<string>('');
  const defaultCountry = details.phone_number ? null : userCountry;
  const [error, setError] = useState<Error1>({
    phone: {
      error: false,
      msg: '',
    },
    logo: {
      error: false,
      msg: '',
    },
    name: {
      error: false,
      msg: '',
    },
  });

  useEffect(() => {
    setPhone(details.phone_number);
  }, [details]);

  const phoneValidation = (format) => {
    if (!phone?.trim() || countRept(phone, /\d/g) != countRept(format, /\./g)) {
      setError({
        ...error,
        phone: { error: true, msg: '' },
      });
    } else {
      setError({
        ...error,
        phone: { ...error.phone, error: false },
      });
    }
  };

  function countRept(string, regex) {
    var numbers = string?.match(regex);
    return numbers ? numbers.length : 0;
  }

  const formValidation = (value) => {
    let isValid = true;
    if (!value) {
      isValid = false;
      setError({
        ...error,
        name: {
          error: true,
          msg: 'Company name is required',
        },
      });
    } else {
      setError({
        ...error,
        name: {
          error: false,
          msg: '',
        },
      });
    }
    return isValid;
  };

  const submitHandler = async () => {
    if (formValidation(details?.name)) {
      const rec_id = uuidv4();
      const { data: rec, error } = await supabase
        .from('recruiter')
        .insert({
          ...details,
          logo: logo,
          phone_number: phone,
          employee_size: details.employee_size,
          name: details.name,
          industry: details.industry,
          recruiter_user_id: recruiterUser.user_id,
          id: rec_id,
        })
        .select('*, office_locations(*)')
        .single();
      if (!error) {
        // update_companies_status();
        await supabase.rpc('createrecuriterrelation', {
          in_recruiter_id: rec_id,
          in_user_id: userDetails.user.id,
          in_is_active: true,
        });
        setRecruiter(rec);
        setOpenSideBar(false);
        getCompanies();
        toast.success('Company added successfully.');
      }
    }
  };
  // update_companies_status();
  // async function update_companies_status() {
  //   const all_Recruiter_relation = allRecruiterRelation as unknown as Array<[]>;
  //   all_Recruiter_relation.map(async (ele: any) => {
  //     await supabase
  //       .from('recruiter_relation')
  //       .update({
  //         is_active: false,
  //       })
  //       .eq('recruiter_id', ele.recruiter_id);
  //   });
  // }
  return (
    <Stack spacing={2}>
      <UITextField
        label='Company Name'
        labelSize='small'
        fullWidth
        value={details?.name}
        placeholder={'Ex. Acme Inc.'}
        error={error.name.error}
        helperText={error.name.error ? error.name.msg : ''}
        onChange={(e) => {
          formValidation(e.target.value);
          setDetails((pre) => ({ ...pre, name: e.target.value }));
        }}
      />
      <UITextField
        labelSize='medium'
        fullWidth
        label='Industry Type'
        placeholder='Ex. Healthcare'
        value={details?.industry}
        onChange={(e) => {
          setDetails((pre) => ({ ...pre, industry: e.target.value }));
        }}
      />
      <Autocomplete
        disableClearable
        freeSolo
        fullWidth
        options={[...sizes]}
        onChange={(event, value) => {
          if (value) {
            setDetails((pre) => ({
              ...pre,
              employee_size: value,
            }));
          }
        }}
        value={details.employee_size}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <UITextField
            rest={{ ...params }}
            fullWidth
            InputProps={{
              ...params.InputProps,
            }}
            placeholder='Employee Size'
            label='Employee Size'
            labelSize='medium'
            onChange={(event) => {
              setDetails((pre: any) => ({
                ...pre,
                employee_size: event.target.value,
              }));
            }}
          />
        )}
      />
      <UIPhoneInput
        defaultCountry={defaultCountry}
        label='Phone'
        onBlur={(value, country: phone) => {
          phoneValidation(country.format);
        }}
        placeholder='Enter phone number with country code'
        value={phone}
        error={error.phone.error}
        onChange={(value, data: phone, event, formattedValue) => {
          setPhonePattern(data.format);
          setPhone(formattedValue);
        }}
        helperText={
          !phone
            ? 'Please enter your phone number.'
            : error.phone.error
              ? `Invalid phone number. Please use the ${
                  phonePattern?.replaceAll('.', 'x') || 'correct'
                } format.`
              : ''
        }
      />
      <Stack
        mt={'50px !important'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <ButtonGhost
          textButton='Back'
          color={'neutral'}
          size={2}
          onClickButton={{
            onClick: () => {
              onClickBack();
            },
          }}
        />
        <ButtonSolid
          onClickButton={{
            onClick: submitHandler,
          }}
          textButton='Add Company'
          size={2}
          isDisabled={false}
        />
      </Stack>
    </Stack>
  );
}
