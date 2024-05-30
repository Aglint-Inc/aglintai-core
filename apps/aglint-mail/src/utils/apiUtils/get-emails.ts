import { promises as fs } from 'node:fs';
import path from 'node:path';
import { emailsDirectoryAbsolutePath } from '../emails-directory-absolute-path';

export const CONTENT_DIR = 'emails';

export const getEmails = async () => {
  const emailsDirectory = emailsDirectoryAbsolutePath;
  const filenames = await fs.readdir(emailsDirectory);
  const emails = filenames
    .map((file) => file.replace(/\.(jsx|tsx)$/g, ''))
    .filter((file) => file !== 'components')
    .filter((file) => file !== 'types')
    .filter((file) => file !== 'index')
    .filter((file) => file !== 'styles');
  return { emails };
};
