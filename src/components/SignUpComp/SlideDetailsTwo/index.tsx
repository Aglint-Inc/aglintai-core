import { Autocomplete, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { WelcomeSlider5 } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSignupDetails } from '@/src/context/SingupContext/SignupContext';
import { supabase } from '@/src/utils/supabaseClient';

import { stepObj } from '../SlideSignup/utils';
import ImageUpload from '../../Common/ImageUpload';
import UIPhoneInput from '../../Common/UIPhoneInput';
import UITextField from '../../Common/UITextField';
import { sizes } from '../../CompanyDetailComp/CompanyInfoComp';

interface Error {
  phone: ErrorField;
  logo: ErrorField;
  name: ErrorField;
}

interface ErrorField {
  error: boolean;
  msg: string;
}

const SlideDetailsTwo = () => {
  const router = useRouter();
  const { recruiter, setRecruiter } = useAuthDetails();
  const { setStep } = useSignupDetails();
  const [logo, setLogo] = useState(null);
  const [phone, setPhone] = useState(null);
  const [phonePattern, setPhonePattern] = useState<string>('');
  const [defaultCountry, setDefaultCountry] = useState('us'); // State to store the default country
  const [error, setError] = useState<Error>({
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
    if (!recruiter.phone_number) {
      fetchUserLocation(); // Call the function to fetch user's location when the component mounts
    }
    setLogo(recruiter.logo);
    setPhone(recruiter.phone_number);
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
    if (recruiter?.id && formValidation(recruiter?.name)) {
      const { error: e1 } = await supabase
        .from('recruiter')
        .update({
          logo: logo,
          phone_number: phone,
          employee_size: recruiter.employee_size,
          name: recruiter.name,
          industry: recruiter.industry,
          email_template: getInitialEmailTemplate(recruiter.name),
        })
        .eq('id', recruiter.id);
      const { error: e2 } = await supabase
        .from('recruiter_user')
        .update({ profile_image: logo, phone: phone })
        .eq('recruiter_id', recruiter.id);
      if (!(e1 && e2)) {
        setStep(stepObj.allSet);
      }
    }
  };

  return (
    <>
      <WelcomeSlider5
        slotCompanyLogo={
          <ImageUpload
            image={logo}
            setImage={setLogo}
            size={120}
            dynamic
            table='company-logo'
          />
        }
        onClickBack={{
          onClick: () => {
            router.push(`?step=${stepObj.detailsOne}`, undefined, {
              shallow: true,
            });
            setStep(stepObj.detailsOne);
          },
        }}
        onClickSave={{
          onClick: () => {
            submitHandler();
          },
        }}
        isSaveDisableAddCompanyLogo={false}
        slotPhoneInput={
          <Stack spacing={2}>
            <UITextField
              label='Company Name'
              labelSize='medium'
              fullWidth
              value={recruiter?.name}
              placeholder={'Ex. Google'}
              error={error.name.error}
              helperText={error.name.error ? error.name.msg : ''}
              onChange={(e) => {
                formValidation(e.target.value);
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
            <Autocomplete
              disableClearable
              freeSolo
              fullWidth
              options={sizes}
              onChange={(event, value) => {
                if (value) {
                  setRecruiter({
                    ...recruiter,
                    employee_size: value,
                  });
                }
              }}
              value={recruiter.employee_size}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <UITextField
                  rest={{ ...params }}
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                  }}
                  label='Employee Size'
                  labelSize='medium'
                  onChange={(event) => {
                    setRecruiter({
                      ...recruiter,
                      employee_size: event.target.value,
                    });
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
          </Stack>
        }
      />
    </>
  );
};

export default SlideDetailsTwo;

type phone = {
  countryCode: string;
  dialCode: string;
  format: string;
  name: string;
};

export const allowedCountries = ['us', 'ca', 'gb', 'in', 'au', 'uk'];

export const getInitialEmailTemplate = (company_name: string) => {
  return {
    interview: {
      fromName: company_name || '',
      body: "<p>Dear [firstName],</p><p>Thank you for submitting your application for the [jobTitle] at [companyName]. We're pleased to announce that you've been selected for an interview.</p><p>You're welcome to choose an interview time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We wish you the best of luck and are eager to hear your insights!</p><p>Warm regards</p>",
      default: true,
      subject:
        "Congratulations! You've Been Selected for an Interview with [companyName]",
    },
    rejection: {
      fromName: company_name || '',
      body: '<p>Hi [firstName],</p><p>Thank you for your interest in the position [jobTitle].</p><p>We have reviewed your application and carefully considered your qualifications. Based on your profile and the number of other qualified applications, for the moment, we are not able to move forward in the recruiting process with you.</p><p>Good luck in your search!</p><p>Sincerely,</p><p>[companyName]</p>',
      default: true,
      subject: 'Your application at [companyName]',
    },
    application_recieved: {
      fromName: company_name || '',
      body: '<p>Hi [firstName],</p><p>You have successfully submitted your application for this position:</p><p>[jobTitle]</p><p>We will review your application shortly. If your profile match our requirements, we will be in touch to schedule the next steps in the process.</p><p>Thank you for your interest in [companyName].</p><p>If you have any queries about this job</p> <p>[supportLink]</p> <p>Sincerely,</p><p>[companyName]</p>',
      default: true,
      subject: 'We received your application for a position at [companyName]',
    },
    interview_resend: {
      fromName: company_name || '',
      body: "<p>Dear [firstName],</p><p>We noticed that you haven't given your interview for the [jobTitle] position at [companyName]. Don't miss this opportunity!</p><p>You're welcome to choose an interview time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We're looking forward to hearing from you soon!</p><p>Warm regards</p>",
      default: true,
      subject:
        'Reminder: Schedule Your Interview for [jobTitle] at [companyName]',
    },
  };
};
