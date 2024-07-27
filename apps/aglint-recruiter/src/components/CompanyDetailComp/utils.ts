import { RecruiterDB } from '@aglint/shared-types';
import debounce from 'lodash/debounce';

import { getAIResponse } from '@/src/utils/prompts/addNewJob';
import { MessageType } from '@/src/utils/prompts/types';
import { requestJson } from '@/src/utils/prompts/utils';
import { supabase } from '@/src/utils/supabase/client';

export const saveToDatabase = async (
  recruit: RecruiterDB,
  id: string,
): Promise<boolean> => {
  await supabase
    .from('recruiter')
    .update({ ...recruit, departments: undefined, office_locations: undefined })
    .eq('id', id)
    .select();
  return true;
};

export const debouncedSave = debounce(saveToDatabase, 1000);

const departments = {
  departments: [
    'Sample department1',
    'Sample department2',
    'Sample department3',
  ],
};

export const tabs = {
  basicinfo: 'basic-info',
  additionalinfo: 'additional-info',
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
