import { Stack } from '@mui/material';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import { useToast } from "@/components/hooks/use-toast";
import { AssisstantSettings } from '@/devlink/AssisstantSettings';
import { ButtonGhost } from '@/devlink/ButtonGhost';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';

import UITextField from '../../Common/UITextField';

function Assistant({ setIsSaving }) {
  const { toast } = useToast();
  const { recruiter, setRecruiter } = useAuthDetails();
  const [assistant, setAssistant] = useState([]);
  const [btnhide, setbtnhide] = useState(true);

  const instructionRef = useRef(null);
  const nameRef = useRef(null);
  async function handleClick() {
    handleChange();
    if (recruiter?.assistant_id) {
      updateAssistant();
    } else {
      const { data } = await axios.post('/api/assistant/createAssistant', {
        instructions: instructionRef.current.value,
        name: nameRef.current.value,
        module: 'gpt-4-1106-preview',
      });
      createAssistant(data);
    }
    toast({
      variant: 'default',
      title: 'Changes saved.',
    });
    setbtnhide(true);
  }

  async function createAssistant(assistant) {
    const { data } = await supabase
      .from('recruiter')
      .update({ assistant_id: assistant.id })
      .eq('id', recruiter.id)
      .select();
    setRecruiter(data[0]);
  }

  async function updateAssistant() {
    await axios.post('/api/assistant/updateAssistant', {
      instructions: instructionRef.current.value,
      name: nameRef.current.value,
      assistant_id: recruiter.assistant_id,
    });
  }
  const handleChange = async () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };
  useEffect(() => {
    if (recruiter?.assistant_id) {
      getAssistant();
    }
    nameRef.current.value = `${recruiter?.name}'s assistant`;
  }, [recruiter]);
  async function getAssistant() {
    const { data } = await axios.post('/api/assistant/getAssistant', {
      assistant_id: recruiter?.assistant_id,
    });
    setAssistant(data);
    if (nameRef.current) nameRef.current.value = data.name;
  }
  return (
    <div>
      <AssisstantSettings
        slotNameInput={
          <Stack width={'100%'}>
            <UITextField
              defaultValue={assistant.name}
              ref={nameRef}
              placeholder='Enter assistant name'
              onChange={() => setbtnhide(false)}
            />
          </Stack>
        }
        slotInstructionsInput={
          <Stack width={'100%'}>
            <UITextField
              defaultValue={assistant.instructions}
              ref={instructionRef}
              multiline
              minRows={15}
              maxRows={15}
              placeholder='Enter assistant instructions'
              onChange={() => setbtnhide(false)}
            />
          </Stack>
        }
        slotButtons={
          <Stack
            width={'100%'}
            direction={'row'}
            justifyContent={'space-between'}
          >
            <ButtonSolid
              textButton='Save Changes'
              size={2}
              isDisabled={btnhide}
              onClickButton={{ onClick: handleClick }}
            />
            <ButtonGhost
              textButton={''}
              color={'neutral'}
              size={2}
              onClickButton={{
                onClick: () => {
                  window.open(`/job-assistant/${recruiter.id}`, 'blank');
                },
              }}
            />
          </Stack>
        }
      />
    </div>
  );
}

export default Assistant;

export const instructions = `Role: You are an HR assistant of a company, helping companies source candidates from a career website.

Objective: 
Your goal is to assist candidates in exploring job opportunities, gathering their details, guiding them through the job application process, and utilizing specific functions for profile analysis and job recommendations.

Guidelines:

Greet the Candidate:
    Start with a warm and inviting greeting.
    Example: "🌟 Hello and welcome to [Company Name]'s career site! Excited to see you here..."

Gather Candidate Information:
    Ask for the candidate's  email,name, and phone number.

  use getEmail() to extract details.

Inquire About Skills and Experience:
    Request the candidate to enter their key skills and experience level.
    Example: "Can you enter your key skills? And your experience level?"

Job Recommendations:
    Recommend jobs based on skills and experience.
    Example: "Based on your skills and experience, we recommend these jobs..."

Job Application Inquiry:
    Ask if they would like to apply for a job.
    Example: "Would you like to apply for this job?"

Process LinkedIn URL or Resume:
    If the candidate provides a LinkedIn URL, call fetchLinkedInProfile() to get profile details.
    If a resume is uploaded, call parseResume() to extract text from the resume.
    Example: "Can you upload your resume or provide your LinkedIn URL?"

Analyze Candidate Profile:
    Use rateProfileStrength() to provide an overall rating of the candidate's resume in relation to the position they are interested in.
    Use suggestJob() to recommend other jobs if there are better matches.
    Example: "Analyzing your profile for the position... We also have these job recommendations for you..."

Confirm Receipt of Job Application:
    Confirm the receipt of the job application and call sendConfirmationEmail() function.
    Example: "Your application has been received. We are sending you a confirmation email now."

Conclude Conversation
    Politely end the conversation and ask if the candidate would like to start over or explore other opportunities.
    Example: "Thank you for applying. Would you like to start over or explore other job opportunities?"

Remember:
    Be polite and professional in your responses.
    Ensure the conversation flows logically based on the candidate's responses.
    Maintain confidentiality and privacy of the candidate's information.`;
