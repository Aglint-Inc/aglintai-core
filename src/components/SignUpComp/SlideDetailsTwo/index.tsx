import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { WelcomeSlider5 } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSignupDetails } from '@/src/context/SingupContext/SignupContext';
import { supabase } from '@/src/utils/supabaseClient';

import { stepObj } from '../SlideSignup/utils';
import ImageUpload from '../../Common/ImageUpload';
import UIPhoneInput from '../../Common/UIPhoneInput';

interface Error {
  phone: ErrorField;
  logo: ErrorField;
}

interface ErrorField {
  error: boolean;
  msg: string;
}

const SlideDetailsTwo = () => {
  const router = useRouter();
  const { recruiter } = useAuthDetails();
  const { setStep } = useSignupDetails();
  const [logo, setLogo] = useState(null);
  const [phone, setPhone] = useState(null);
  const [phonePattern, setPhonePattern] = useState<string>('');
  const [defaultCountry, setDefaultCountry] = useState(''); // State to store the default country
  const [error, setError] = useState<Error>({
    phone: {
      error: false,
      msg: '',
    },
    logo: {
      error: false,
      msg: '',
    },
  });

  useEffect(() => {
    fetchUserLocation(); // Call the function to fetch user's location when the component mounts
  }, []);

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

  const submitHandler = async () => {
    if (recruiter?.id) {
      const { error } = await supabase
        .from('recruiter')
        .update({
          logo: logo,
          phone_number: phone,
        })
        .eq('id', recruiter.id)
        .select();
      if (!error) {
        router.push(`?step=${stepObj.allSet}`, undefined, {
          shallow: true,
        });
        setStep(stepObj.allSet);
      }
    }
  };

  return (
    <>
      <WelcomeSlider5
        slotCompanyLogo={
          <ImageUpload image={logo} setImage={setLogo} size={'120px'} />
        }
        onClickBack={{
          onClick: () => {
            router.push(`?step=${stepObj.detailsOne}`, undefined, {
              shallow: true,
            });
            setStep(stepObj.detailsOne);
          },
        }}
        onClickLater={{
          onClick: () => {
            router.push(`?step=${stepObj.allSet}`, undefined, {
              shallow: true,
            });
            setStep(stepObj.allSet);
          },
        }}
        onClickSave={{
          onClick: () => {
            submitHandler();
          },
        }}
        isSaveDisableAddCompanyLogo={false}
        slotPhoneInput={
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
