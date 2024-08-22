import { DatabaseTable } from '@aglint/shared-types';

export function extractLinkedInURL(arr) {
  for (const item of arr) {
    // Check if the item starts with "http://linkedin.com" or "https://linkedin.com"
    if (
      item.startsWith('http://linkedin.com') ||
      item.startsWith('https://linkedin.com')
    ) {
      return item; // Return the LinkedIn URL
    }
  }

  // Return an empty string if no LinkedIn URL is found
  return '';
}

export const splitFullName = (name: string) => {
  const nameParts = name.trim().split(' ');

  if (nameParts.length === 1) {
    // If there is only one word, consider it as the first name and no last name
    return {
      firstName: nameParts[0],
      lastName: '',
    };
  } else {
    // If there are multiple words, the last word is the last name, and the rest are the first name
    const lastName = nameParts.pop();
    const firstName = nameParts.join(' ');
    return {
      firstName,
      lastName,
    };
  }
};

export const POSTED_BY = {
  LEVER: 'Lever',
  AGLINT: 'Aglint',
  GREENHOUSE: 'Greenhouse',
  ASHBY: 'Ashby',
} satisfies {
  // eslint-disable-next-line no-unused-vars
  [id in string]: DatabaseTable['public_jobs']['posted_by'];
};
