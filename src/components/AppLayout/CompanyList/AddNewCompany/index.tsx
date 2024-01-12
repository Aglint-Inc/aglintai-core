import { Autocomplete, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { AddCompany } from '@/devlink2';
import AUIButton from '@/src/components/Common/AUIButton';
import ImageUpload from '@/src/components/Common/ImageUpload';
import UIPhoneInput from '@/src/components/Common/UIPhoneInput';
import UITextField from '@/src/components/Common/UITextField';
import UITypography from '@/src/components/Common/UITypography';
import { sizes } from '@/src/components/CompanyDetailComp/CompanyInfoComp';
import Loader from '@/src/components/SignUpComp/Loader/Index';
import { Error1 } from '@/src/components/SignUpComp/SlideDetailsOne';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabaseClient';

import { getInitialEmailTemplate } from '../../utils';

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
    setLoading(true);
    if ((await formValidation()) && recruiter?.id) {
      const url = details.company_website.replace(/^https?:\/\//i, '');
      const { data: companyDetails } = await axios.post(
        `/api/fetchCompanyDetails`,
        {
          domain_name: url,
        },
      );
      setLogo(companyDetails.logo);
      setDetails((pre: any) => ({
        ...pre,
        company_website: details.company_website || '',
        name: companyDetails.name || '',
        phone_number: companyDetails.phoneNumber || '',
        industry: companyDetails.industryMain || '',
        employee_size: companyDetails.totalEmployees || '',
        logo: companyDetails.logo || '/',
        office_locations:
          [
            {
              city: companyDetails.city?.name || '',
              line1: companyDetails.city?.address || '',
              line2: '',
              region: companyDetails.state?.name || '',
              country: companyDetails.country?.name || '',
              zipcode: '',
              full_address:
                companyDetails.city?.address +
                  ', ' +
                  companyDetails.state?.name +
                  ',' +
                  companyDetails.city?.name || '',
              is_headquarter: true,
            },
          ] || [],
        company_overview: companyDetails.description || '',
        technology_score: companyDetails.technologies || [],
        socials: {
          custom: {},
          twitter: companyDetails.socialNetworks?.twitter || '',
          youtube: companyDetails.socialNetworks?.youtube || '',
          facebook: companyDetails.socialNetworks?.facebook || '',
          linkedin: companyDetails.socialNetworks?.linkedin || '',
          instagram: companyDetails.socialNetworks?.instagram || '',
        },
      }));
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
    <Stack width={600}>
      <AddCompany
        // onclickClose={{
        //   onClick: closeDrawer,
        // }}
        slotWebsiteInput={
          <>
            <Stack
              width={'100%'}
              // direction={'row'}
              justifyContent={'center'}
              alignItems={'start'}
              spacing={'20px'}
            >
              <TextField
                margin='none'
                required
                fullWidth
                id='name'
                label='Company Website'
                placeholder='https://companydomain.com'
                value={details?.company_website}
                onChange={(e) => {
                  setDetails({ ...details, company_website: e.target.value });
                }}
                error={error.website.error}
                helperText={error.website.error ? error.website.msg : ''}
                inputProps={{
                  autoCapitalize: 'true',
                  style: {
                    fontSize: '14px',
                  },
                }}
              />
              <AUIButton
                disabled={loading}
                onClick={submitHandler}
                variant='outlined'
              >
                Continue
              </AUIButton>
            </Stack>
          </>
        }
        isCompanyLogo={!loading}
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
              <UITypography color='grey.600'>
                Hold on, Fetching company info from the website.
              </UITypography>
            </Stack>
          ) : (
            <CompanyDetails
              setDetails={setDetails}
              details={details}
              logo={logo}
              setOpenSideBar={setOpenSideBar}
              getCompanies={getCompanies}
            />
          )
        }
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
}) {
  const { recruiter, recruiterUser } = useAuthDetails();
  const [phone, setPhone] = useState(null);
  const [phonePattern, setPhonePattern] = useState<string>('');
  const [defaultCountry, setDefaultCountry] = useState('us'); // State to store the default country
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
    if (!details.phone_number) {
      fetchUserLocation(); // Call the function to fetch user's location when the component mounts
    }
    // setLogo(recruiter.logo);
    // setPhone(recruiter.phone_number);
  }, [recruiter]);

  // Function to fetch the user's location information based on IP address
  const fetchUserLocation = async () => {
    try {
      const response = await fetch('https://ipinfo.io/json', {
        headers: {
          Authorization: `Bearer e82b96e5cb0802`,
        },
      });
      const data = await response.json();

      const country = data.country; // Extract the country code from the response
      setDefaultCountry(country?.toLowerCase() || 'us'); // Set the default country based on the user's location
    } catch (error) {
      // Handle any errors that occur during the API call
    }
  };

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
      const { error: e1 } = await supabase.from('recruiter').insert({
        ...details,
        logo: logo,
        phone_number: phone,
        employee_size: details.employee_size,
        name: details.name,
        industry: details.industry,
        email_template: getInitialEmailTemplate(details.name),
        recruiter_user_id: recruiterUser.user_id,
      });

      if (!e1) {
        setOpenSideBar(false);
        getCompanies();
      }
    }
  };
  return (
    <Stack spacing={2}>
      <UITextField
        label='Company Name'
        labelSize='medium'
        fullWidth
        value={details?.name}
        placeholder={'Ex. Google'}
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
        placeholder='Enter your phone number'
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
        justifyContent={'center'}
      >
        <AUIButton disabled={false} onClick={submitHandler}>
          Continue
        </AUIButton>
      </Stack>
    </Stack>
  );
}
