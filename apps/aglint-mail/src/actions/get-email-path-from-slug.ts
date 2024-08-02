'use server';
import path from 'node:path';
import fs from 'node:fs';
import { emailsDirectoryAbsolutePath } from '../utils/emails-directory-absolute-path';

// eslint-disable-next-line @typescript-eslint/require-await
export const getEmailPathFromSlug = async (slug: string) => {
  const normalizedSlug = path.normalize(slug); 
  if (['.tsx', '.jsx', '.ts', '.js'].includes(path.extname(normalizedSlug)))
    return path.join(emailsDirectoryAbsolutePath, normalizedSlug);

  const pathWithoutExtension = path.join(emailsDirectoryAbsolutePath, normalizedSlug);

  const extensions = ['.tsx', '.jsx', '.ts', '.js'];
  for (const extension of extensions) {
    if (fs.existsSync(`${pathWithoutExtension}${extension}`)) {
      return `${pathWithoutExtension}${extension}`;
    }
  }

  throw new Error(
    `Could not find your email file based on the slug (${normalizedSlug}) by guessing the file extension. Tried .tsx, .jsx, .ts and .js.

    This is most likely not an issue with the preview server. It most likely is that the email doesn't exist.`,
  );
};
