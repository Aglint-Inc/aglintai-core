import { type DatabaseTable } from '@aglint/shared-types';

export type ResumeJson = DatabaseTable['candidate_files']['resume_json'];

export type PromptEnum = 'low' | 'medium' | 'high';
