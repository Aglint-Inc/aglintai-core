import { type RecruiterDB } from '@aglint/shared-types';

// import debounce from 'lodash/debounce';
import { getAIResponse } from '@/src/utils/prompts/addNewJob';
import { type MessageType } from '@/src/utils/prompts/types';
import { requestJson } from '@/src/utils/prompts/utils';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/ToastPro';

export const saveToDatabase = async (recruit: RecruiterDB, id: string) => {
  return supabase
    .from('recruiter')
    .update({ ...recruit, departments: undefined, office_locations: undefined })
    .eq('id', id)
    .select()
    .throwOnError();
};

const debounce = toast.debouncedPromise('saveProfile');
export const debouncedSave = debounce(saveToDatabase, 1000, {
  onSuccess: 'Saved',
  onError: 'Failed to save',
  onPending: 'Saving...',
});

const departments = {
  departments: [
    'Sample department1',
    'Sample department2',
    'Sample department3',
  ],
};

export const tabs = {
  companyInfo: 'company-info',
  about: 'about',
  assessment: 'assessment',
  jobassistant: 'job-assistant',
  email: 'email',
  team: 'team',
};

export const generateDepartments = async (industry: string) => {
  const prompt = [
    {
      role: 'system',
      content: requestJson(
        'Your a Helpfull Assistant. Generate 10 departments required for the given Industry.',
        departments,
      ),
    },
    {
      role: 'system',
      content: `Here is the Industry ${industry}`,
    },
  ] as MessageType[];

  const resp = await getAIResponse(prompt);
  const jsonData = JSON.parse(resp) as { departments: string[] };
  if (Array.isArray(jsonData.departments))
    localStorage.setItem('departments', JSON.stringify(jsonData.departments));
};

const technologies = {
  technologies: [
    'Sample technology1',
    'Sample technology2',
    'Sample technology3',
  ],
};

export const generateSpecialities = async (industry: string) => {
  const prompt = [
    {
      role: 'system',
      content: requestJson(
        'Your a Helpfull Assistant. Generate 10 specialities used for the given Industry.',
        technologies,
      ),
    },
    {
      role: 'system',
      content: `Here is the Industry ${industry}`,
    },
  ] as MessageType[];

  const resp = await getAIResponse(prompt);
  const jsonData = JSON.parse(resp) as { specialities: string[] };
  if (Array.isArray(jsonData.specialities))
    localStorage.setItem('specialities', JSON.stringify(jsonData.specialities));
};

const roles = {
  roles: ['Sample role1', 'Sample role2', 'Sample role3'],
};

export const generateRoles = async (industry: string) => {
  const prompt = [
    {
      role: 'system',
      content: requestJson(
        'Your a Helpfull Assistant. Generate 10 roles for the given Industry.',
        roles,
      ),
    },
    {
      role: 'system',
      content: `Here is the Industry ${industry}`,
    },
  ] as MessageType[];

  const resp = await getAIResponse(prompt);
  const jsonData = JSON.parse(resp) as { roles: string[] };
  if (Array.isArray(jsonData.roles))
    localStorage.setItem('roles', JSON.stringify(jsonData.roles));
};

export const slugify = (text: string) => {
  const newText = text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/,/g, '')
    .replace(/\//g, '-')
    .replace(/[()]/g, '');

  return newText;
};
