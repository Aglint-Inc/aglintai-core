export const socialPlaceholder = {
  linkedin: 'company',
  youtube: '@company',
  twitter: '@company',
  facebook: '@company',
  instagram: '@company',
};

export const customOrder = {
  linkedin: 1,
  instagram: 2,
  twitter: 3,
  facebook: 4,
  // Add other social media platforms in the desired order here
};

export const socialValidators = {
  facebook: (url: string) => /^(https?:\/\/)?(www\.)?facebook\.com\/(profile\.php\?id=\d+|[A-Za-z0-9_.-]+)\/?$/.test(url),
  linkedin: (url: string) => /^(https?:\/\/)?(www\.)?linkedin\.com\/(in\/[A-Za-z0-9_-]+|company\/[A-Za-z0-9_-]+)\/?$/.test(url),
  youtube: (url: string) => /^(https?:\/\/)?(www\.)?youtube\.com\/.*$/.test(url),
  twitter: (url: string) => /^(https?:\/\/)?(www\.)?twitter\.com\/[A-Za-z0-9_]+\/?$/.test(url),
  instagram: (url: string) => /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9_.-]+\/?$/.test(url),
  custom: (url: string) => validateUrl(url),
};

export const validateUrl = (url: string) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i'
  );
  return url !== null && pattern.test(url);
};

export const validateString = (str: string) => {
  return str !== null && str.trim().length !== 0;
};

export const validation = (value: string, method: string) => {
  switch (method) {
    case 'string':
      return validateString(value);
    case 'url':
      return validateUrl(value);
    default:
      return false;
  }
};

