import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { RcCheckbox, RcGoalsBlock, RecCompanyDetails } from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSignupDetails } from '@/src/context/SingupContext/SignupContext';
import { SocialsType } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabaseClient';

import { stepObj } from '../SlideSignup/utils';
import AUIButton from '../../Common/AUIButton';
function SelectGoal() {
  const { recruiter, setRecruiter } = useAuthDetails();
  const { setStep } = useSignupDetails();
  const [selectedObject, setSelectedObject] = useState(
    recruiter?.use_of_purpose,
  );

  const router = useRouter();
  async function handleContinue() {
    const { data, error } = await supabase
      .from('recruiter')
      .update({
        use_of_purpose: selectedObject,
      })
      .eq('id', recruiter.id)
      .select();
    if (!error) {
      setRecruiter({ ...data[0], socials: data[0].socials as SocialsType });
      router.push(`?step=${stepObj.allSet}`, undefined, {
        shallow: true,
      });
      setStep(stepObj.allSet);
    }
  }
  return (
    <>
      <RecCompanyDetails
        slotMain={
          <RcGoalsBlock
            slotCheckboxes={objectData.map((ele, i) => {
              return (
                <RcCheckbox
                  onclickCheck={{
                    onClick: () => {
                      setSelectedObject(ele);
                    },
                  }}
                  isChecked={selectedObject === ele}
                  text={ele}
                  key={i}
                />
              );
            })}
            slotButtons={
              <>
                <AUIButton
                  disabled={selectedObject === null}
                  onClick={handleContinue}
                >
                  Continue
                </AUIButton>
                <AUIButton variant='text'> Skip</AUIButton>
              </>
            }
          />
        }
      />
    </>
  );
}

export default SelectGoal;

const objectData = [
  'Sourcing new candidates',
  'Filtering candidates',
  'AI-based candidate screening',
  'All of the above',
];
