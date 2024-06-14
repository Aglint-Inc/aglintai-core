/* eslint-disable @typescript-eslint/no-var-requires */
'useServer';
const path = require('node:path');

export const emailsDirRelativePath = path.join(process.cwd(), '/src/emails');

export const emailsDirectoryAbsolutePath = emailsDirRelativePath;
