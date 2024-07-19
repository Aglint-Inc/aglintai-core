export const refactorEmail = (email: string) => {
  const regex = /\+.*@/;
  if (regex.test(email)) return email.replace(regex, '@');
  return email;
};

export const validateMail = (value: string) => {
  return (
    value &&
    value.trim() !== '' &&
    // eslint-disable-next-line no-useless-escape
    /([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)/g.test(
      value.trim(),
    )
  );
};

export const validateString = (value: string) => {
  return value && value.trim() !== '';
};
export const validatePassword = (value: string) => {
  if (
    validateString(value) &&
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      value.trim(),
    )
  )
    return true;
};

export const validateGMail = (value: string) => {
  return (
    value &&
    value.trim() !== '' &&
    // eslint-disable-next-line no-useless-escape
    /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@g(oogle)?mail([\.])com/g.test(
      value.trim(),
    )
  );
};
export const validatePhone = (value: string) => {
  function countRept(string, regex) {
    var numbers = string?.match(regex);
    return numbers ? numbers.length : 0;
  }
  return !(
    value.trim() === '' ||
    !(
      countRept(value.trim(), /\d/g) === countRept('+.. .....-.....', /\./g) ||
      countRept(value.trim(), /\d/g) === countRept('+. ......-....', /\./g)
    )
  );
};

export const validateLinkedIn = (value: string) => {
  const linkedInURLPattern =
    // eslint-disable-next-line security/detect-unsafe-regex
    /^(https?:\/\/)?((www|in)\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
  return linkedInURLPattern.test(value);
};

export type PreferenceFormFields = {
  language: FormValues;
  timezone: FormValues;
};

export type PasswordFormFields = {
  password: FormValues;
  confirmPassword: FormValues;
};
export type FormValues = {
  value: string;
  label: string;
  type: 'text' | 'password';
  placeholder: string;
  error: boolean;
  validation: 'string' | 'phone' | 'mail' | 'password' | 'linkedIn';
  helperText: string;
  blocked: boolean;
  required: boolean;
  disabled: boolean;
  specialForm: boolean;
  options: string[];
  modal: boolean;
};

export type EmailFormFields = {
  email: FormValues;
};

export type FormFields = {
  first_name: FormValues;
  last_name: FormValues;
  // email: FormValues;
  phone: FormValues;
  linked_in: FormValues;
  // location: FormValues;
  // designation: FormValues;
  // department: FormValues;
  // role: FormValues;
};
