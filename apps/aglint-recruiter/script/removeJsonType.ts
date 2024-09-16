/* eslint-disable security/detect-non-literal-regexp */
import { readFile, writeFile } from 'fs';
import * as path from 'path';

const filePath = path.join(
  __dirname,
  '../../../packages/shared-types/src/db/schema.types.ts',
);
readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const result = data.toString().replace(/export type/g, 'export');
  const fixed = result
    .replace(/export\s+/g, 'export type ')
    .replace(
      /export\s+type\s+Json\s*=\s*([\s\S]*?\n\n)/g,
      'export type Json = any;\n\n',
    );
  writeFile(filePath, fixed, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});
