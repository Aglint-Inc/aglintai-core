import { z } from 'zod';

export const refactorEmail = (email: string): string => {
  return email.replace(/\+.*@/, '@');
};

const emailSchema = z.string().email();
export const validateMail = (value: string): boolean => {
  return emailSchema.safeParse(value).success;
};

export const validateString = (value: string): boolean => {
  return value !== undefined && value.trim() !== '';
};

const passwordSchema = z
  .string()
  .min(8)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/);
export const validatePassword = (value: string): boolean => {
  return passwordSchema.safeParse(value).success;
};

const gmailSchema = z.string().email().endsWith('@gmail.com');
export const validateGMail = (value: string): boolean => {
  return gmailSchema.safeParse(value).success;
};

const phoneSchema = z.string().regex(/^\+\d{1,3}\s\d{3,}[-\s]\d{4}$/);
export const validatePhone = (value: string): boolean => {
  return phoneSchema.safeParse(value).success;
};

const linkedInSchema = z.string().url().includes('linkedin.com/in/');
export const validateLinkedIn = (value: string): boolean => {
  return linkedInSchema.safeParse(value).success;
};

export interface FormValues {
  value: string;
  label: string;
  type: 'text' | 'password';
  placeholder: string;
  error: boolean;
  validation:
    | 'string'
    | 'phone'
    | 'mail'
    | 'password'
    | 'linkedIn'
    | 'timeZone';
  helperText: string;
  blocked: boolean;
  required: boolean;
  disabled: boolean;
  specialForm: boolean;
  options: string[];
  modal: boolean;
}

export interface PreferenceFormFields {
  language: FormValues;
  timezone: FormValues;
}

export interface PasswordFormFields {
  password: FormValues;
  confirmPassword: FormValues;
}

export interface EmailFormFields {
  email: FormValues;
}

export interface FormFields {
  first_name: FormValues;
  last_name: FormValues;
  phone: FormValues;
  linked_in: FormValues;
}
